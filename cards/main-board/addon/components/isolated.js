import Component from '@ember/component';
import layout from '../templates/isolated';
import { computed } from '@ember/object';

export default Component.extend({
    layout,
    init() {
        this._super(...arguments);
        this.set('statues', {
            'watchedMovies' : this.content.watchedMovies,
            'currentlyWatchingMovies' : this.content.currentlyWatchingMovies,
            'toWatchMovies' : this.content.toWatchMovies,
        })
    },
    showBoard: false,
    selectedStatue: "",
    subTitle: "",

    movieAmount: computed('selectedStatue', function() {
        return this.get('statues')[this.get('selectedStatue')].length;
    }),

    showSelectedMovies: function(statue) {
        this.set('showBoard', true);
        this.set('selectedStatue', statue);
        if(statue === 'watchedMovies'){
            this.set('subTitle', 'Watched Movies'); 
        }
        else if(statue === 'currentlyWatchingMovies'){
            this.set('subTitle', 'Currently Watching Movies'); 
        }
        else if(statue === 'toWatchMovies'){
            this.set('subTitle', 'To Watch Movies'); 
        }
    }

 });