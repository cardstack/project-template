import Component from '@ember/component';
import layout from '../templates/embedded';
import { computed } from '@ember/object';

export default Component.extend({ 
    layout,
    genre: computed('this.content', function() {
        if(this.content.genre === 'Sci-Fi'){
            return "sci-fi";
        }
        return this.content.genre.charAt(0).toLowerCase() + this.content.genre.slice(1);
    }),
    nowPlaying: computed('this.content', function() {
        return this.content.playing;
    })
 });