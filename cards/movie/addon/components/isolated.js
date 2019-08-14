import Component from '@ember/component';
import layout from '../templates/isolated';
import { computed } from '@ember/object';

export default Component.extend({ 
    layout,
    genre: computed('content.genre', function() {
        if (this.content.genre === undefined) {
            return '';
        }
        else if (this.content.genre === 'Sci-Fi') {
            return "sci-fi";
        }
        return this.content.genre.charAt(0).toLowerCase() + this.content.genre.slice(1);
    }),
    nowPlaying: computed('content.playing', function() {
        return this.content.playing ? this.content.playing : false;
    })
 });