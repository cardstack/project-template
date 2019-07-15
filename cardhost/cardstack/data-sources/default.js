let sources = [
  {
    type: 'plugin-configs',
    id: '@cardstack/hub',
    attributes: {
      'plugin-config': {
        'application-card': { type: 'app-cards', id: 'cardhost' }
      }
    },
    relationships: {
      'default-data-source': {
        data: { type: 'data-sources', id: 'default' }
      }
    }
  },
  {
    type: 'data-sources',
    id: '@cardstack/image',
    attributes: {
      'source-type': '@cardstack/image',
      params: {
        storeImageMetadataIn: { type: 'data-sources', id: 'default' }
      }
    }
  }
];

if (process.env.HUB_ENVIRONMENT === 'production') {
  sources.push({
    type: 'data-sources',
    id: 'default',
    attributes: {
      'source-type': '@cardstack/git',
      params: {
        branchPrefix: process.env.GIT_BRANCH_PREFIX,
        remote: {
          url: 'git@github.com:cardstack/project-template-data.git',
          privateKey: process.env.GIT_PRIVATE_KEY,
        }
      }
    }
  },
  {
    type: 'data-sources',
    id: '@cardstack/s3',
    attributes: {
      'source-type': '@cardstack/s3',
      params: {
        branches: {
          master: {
            access_key_id: process.env.S3_IMAGE_UPLOAD_ACCESS_KEY_ID,
            secret_access_key: process.env.S3_IMAGE_UPLOAD_SECRET_ACCESS_KEY,
            bucket: process.env.S3_IMAGE_BUCKET,
            region: 'us-east-1'
          }
        }
      }
    }
  },
  {
    type: 'data-sources',
    id: '@cardstack/files',
    attributes: {
      'source-type': '@cardstack/files',
      params: {
        storeFilesIn: { type: 'data-sources', id: '@cardstack/s3' }
      }
    }
  });
} else {
  sources.push({
    type: 'data-sources',
    id: 'default',
    attributes: {
      'source-type': '@cardstack/ephemeral'
    }
  },
  {
    type: 'data-sources',
    id: '@cardstack/files',
    attributes: {
      'source-type': '@cardstack/files',
      params: {
        storeFilesIn: { type: 'data-sources', id: 'default' }
      }
    }
  });
}

module.exports = sources;
