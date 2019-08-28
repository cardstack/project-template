const JSONAPIFactory = require('@cardstack/test-support/jsonapi-factory');
const {
  createDefaultEnvironment,
  destroyDefaultEnvironment
} = require('@cardstack/test-support/env');
const Session = require('@cardstack/plugin-utils/session');
const { join } = require('path');
const { readdirSync, existsSync } = require('fs');
const cardDir = join(__dirname, '../../');

let factory, env, writers, searchers, sessions;

async function createPhoto(attributes={}) {
  let { data: photo } = await writers.create('master', env.session, 'photos', {
    data: {
      type: 'photos',
      attributes
    }
  });
  return photo;
}

async function createWriterSession() {
  return sessions.create('github-users', 'github-writer');
}

describe('photos - grants', function () {
  beforeEach(async function () {
    factory = new JSONAPIFactory();

    factory.importModels(require('../cardstack/static-model')());

    factory.addResource('data-sources', 'github').withAttributes({
      sourceType: '@cardstack/github-auth',
      params: {
        permissions: [
          { repo: 'cardstack/project-template-data', permission: 'read' },
          { repo: 'cardstack/project-template-data', permission: 'write' },
        ]
      }
    });

    factory.addResource('data-sources', 'default').withAttributes({
      sourceType: '@cardstack/ephemeral'
    });

    factory.addResource('data-sources', 'mock-auth')
      .withAttributes({
        sourceType: '@cardstack/mock-auth',
        'user-rewriter': './node-tests/mock-auth-rewriter.js',
        params: {
          provideUserSchema: false,
          mockedTypes: ['github-users'],
          users: {
            'github-writer': {
              type: 'github-users',
              id: 'github-writer',
              attributes: {
                name: "Writer McWriterson",
                'avatar-url': "https://avatars2.githubusercontent.com/u/61075",
                permissions: ['cardstack/project-template-data:read', 'cardstack/project-template-data:write']
              },
            }
          }
        }
      });

    factory.addResource('groups', 'github-readers')
      .withAttributes({
        'search-query': {
          filter: {
            type: { exact: 'github-users' },
            permissions: { exact: 'cardstack/project-template-data:read' }
          }
        }
      });

    factory.addResource('groups', 'github-writers')
      .withAttributes({
        'search-query': {
          filter: {
            type: { exact: 'github-users' },
            permissions: { exact: 'cardstack/project-template-data:write' }
          }
        }
      });

    env = await createDefaultEnvironment(`${__dirname}/..`, factory.getModels());
    searchers = env.lookup('hub:searchers');
    writers = env.lookup('hub:writers');
    sessions = env.lookup('hub:sessions');
    await searchers.getFromControllingBranch(Session.INTERNAL_PRIVILEGED, 'github-users', 'github-reader');
    await searchers.getFromControllingBranch(Session.INTERNAL_PRIVILEGED, 'github-users', 'github-writer');
  });

  afterEach(async function () {
    await destroyDefaultEnvironment(env);
  });

  describe('grants', function () {
    it.only('allows anonymous to view a photo, but not a comment', async function () {
      let { id, type } = await createPhoto({ 'photo-title': 'title', comment: 'only admins can see' });
      let { data } = await searchers.get(null, type, id);

      expect(data).to.have.deep.property('attributes.photo-title', 'title');
      expect(data.attributes.comment).to.be.undefined;
    });

    it('does not allow anonymous to view non-published article', async function () {
      let { id, type } = await createPhoto({ title: 'title' }, 'github-writers');
      let error;
      try {
       await searchers.getFromControllingBranch(null, type, id);
      } catch (e) {
        error = e;
      }
      expect(error.status).to.equal(404);
    });

    it('allows github-writer to view non-published article', async function () {
      let { id, type } = await createPhoto({ title: 'title' }, 'github-writers');
      let { data } = await searchers.getFromControllingBranch(await createWriterSession(), type, id);

      expect(data).to.have.deep.property('attributes.title', 'title');
    });

    it('does not allow github-reader to create article', async function () {
      let error;
      try {
        await writers.create('master', await createReaderSession(), 'photos', {
          data: {
            type: 'photos',
            attributes: { title: 'title', slug: 'test' },
            relationships: {
              readers: { data: { type: 'groups', id: 'github-readers'} }
            }
          }
        });
      } catch (e) {
        error = e;
      }
      expect(error.status).to.equal(404);
    });

    it('does not allow github-reader to update article', async function () {
      let { id, type, meta: { version } } = await createPhoto({ title: 'title' });
      let error;
      try {
        await writers.update('master', await createReaderSession(), type, id, {
          data: {
            type, id,
            attributes: { title: 'updated title', slug: 'test' },
            relationships: {
              readers: { data: { type: 'groups', id: 'github-readers'} }
            },
            meta: { version }
          }
        });
      } catch (e) {
        error = e;
      }
      expect(error.status).to.equal(404);
    });

    it('allows github-writer to create article', async function () {
      let { data: { type, id } } = await writers.create('master', await createWriterSession(), 'photos', {
        data: {
          type: 'photos',
          attributes: { title: 'title', slug: 'test' },
          relationships: {
            readers: { data: { type: 'groups', id: 'github-writers' } }
          },
        }
      });
      let { data } = await searchers.getFromControllingBranch(Session.INTERNAL_PRIVILEGED, type, id);
      expect(data).to.have.deep.property('attributes.title', 'title');
    });

    it('allows github-writer to update article', async function () {
      let { id, type, meta: { version } } = await createPhoto({ title: 'title' });
      await writers.update('master', await createWriterSession(), type, id, {
        data: {
          type, id,
          attributes: { title: 'updated title', slug: 'test' },
          relationships: {
            readers: { data: { type: 'groups', id: 'github-writers' } }
          },
          meta: { version }
        }
      });

      let { data } = await searchers.getFromControllingBranch(Session.INTERNAL_PRIVILEGED, type, id);
      expect(data).to.have.deep.property('attributes.title', 'updated title');
    });

    it('does not allow github-reader to delete article', async function () {
      let { id, type, meta: { version } } = await createPhoto({ title: 'title' });
      let error;
      try {
        await writers.delete('master', await createReaderSession(), version, type, id);
      } catch (e) {
        error = e;
      }
      expect(error.status).to.equal(401);
    });

    it('allows github-writer to delete article', async function () {
      let { id, type, meta: { version } } = await createPhoto({ title: 'title' });
      await writers.delete('master', await createWriterSession(), version, type, id);

      let error;
      try {
        await searchers.getFromControllingBranch(Session.INTERNAL_PRIVILEGED, type, id);
      } catch (e) {
        error = e;
      }
      expect(error.status).to.equal(404);
    });

  });
});
