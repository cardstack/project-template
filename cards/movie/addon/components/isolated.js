import Component from '@ember/component';
import layout from '../templates/isolated';
import { computed } from '@ember/object';

export default Component.extend({ 
    layout,
    genre: computed('content.genre', function() {
        if (!this.content.genre) {
            return 'other';
        } else {
            return this.content.genre.toLowerCase()
        }
    }),
    nowPlaying: computed('content.playing', function() {
        return this.content.playing ? this.content.playing : false;
    })
 });