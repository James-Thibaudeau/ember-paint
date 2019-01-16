import DS from 'ember-data';
import { computed } from '@ember/object';

const TEMPLATES = [
    [ "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "orange", "black", "black", "black", "black", "black", "black", "black", "black", "orange", "yellow", "orange", "black", "black", "black", "black", "black", "black", "black", "orange", "yellow", "orange", "black", "black", "black", "black", "black", "black", "black", "black", "orange", "black", "black", "black", "black", "black", "black", "black", "black", "white", "white", "white", "black", "black", "black", "black", "orange-darker", "orange-darker", "black", "white", "white", "white", "black", "black", "black", "black", "orange-darker", "orange-darker", "black", "white", "white", "white", "black", "black", "black", "black", "black", "orange-darker", "black", "white", "white", "white", "black", "black", "black", "black", "black", "orange-darker", "orange-darker", "orange-darker", "orange-darker", "orange-darker", "orange-darker", "orange-darker", "orange-darker", "black" ],
    ["blue", "blue", "blue", "blue", "blue", "blue", "blue", "yellow", "yellow", "yellow", "blue", "green", "green", "green", "blue", "blue", "blue", "blue", "yellow", "yellow", "green", "green", "green", "green", "green", "blue", "blue", "blue", "blue", "yellow", "green", "green", "green", "green", "green", "blue", "blue", "blue", "blue", "blue", "blue", "green", "green", "green", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "orange-darker", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "orange-darker", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "green", "green", "orange-darker", "green", "green", "green", "green", "green", "green", "green", "green", "orange-darker", "orange-darker", "orange-darker", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green" ],
    [ "teal", "teal", "white", "teal", "teal", "teal", "teal", "teal", "teal", "teal", "teal", "teal", "teal", "teal", "white", "teal", "teal", "teal", "teal", "teal", "teal", "teal", "teal", "teal", "teal", "teal", "orange", "orange", "teal", "teal", "teal", "orange", "teal", "teal", "teal", "orange", "orange", "orange", "orange", "teal", "teal", "orange", "orange", "teal", "orange", "orange", "orange", "black", "orange", "orange", "teal", "orange", "orange", "orange", "orange", "orange", "orange", "orange", "orange", "orange", "teal", "orange", "orange", "teal", "orange", "orange", "orange", "orange", "orange", "teal", "teal", "orange", "teal", "teal", "teal", "teal", "orange", "orange", "teal", "teal", "teal", "teal", "teal", "teal", "teal", "teal", "teal", "teal", "teal", "teal", "teal", "teal", "teal", "teal", "teal", "teal", "teal", "teal", "teal", "teal" ],
    [ "orange", "orange", "blue", "blue", "blue", "blue", "blue", "orange", "orange", "orange", "orange", "blue", "blue", "black", "black", "black", "black", "orange", "orange", "orange", "orange", "blue", "blue", "black", "red", "red", "red", "orange", "orange", "orange", "orange", "orange", "blue", "black", "black", "black", "black", "orange", "orange", "orange", "black", "black", "black", "orange", "black", "black", "orange", "orange", "orange", "orange", "orange", "orange", "black", "black", "black", "black", "black", "black", "orange", "orange", "orange", "orange", "orange", "orange", "black", "black", "orange", "black", "orange", "orange", "orange", "orange", "orange", "orange", "black", "black", "orange", "black", "black", "orange", "orange", "orange", "orange", "orange", "black", "black", "orange", "orange", "orange", "orange", "orange", "orange", "orange", "orange", "black", "black", "orange", "orange", "orange", "orange" ]
]

export default DS.Model.extend({
    templatePicture: DS.belongsTo('picture', { async: false}),
    playerPicture: DS.belongsTo('picture', { async: false}),

    correctCellCount: computed('templatePicture.cells@each.{color}', 'playerPicture.cells.@each.{color}', function () {
        let count = 0;

        for(let i=0; i<this.templatePicture.cells.length; i++) {
            if (this.templatePicture.cells.objectAt(i).color === this.playerPicture.cells.objectAt(i).color) {
                count++;
            }
        }

        return count;
    }),
    
    isComplete: computed.equal('correctCellCount', 100),

    init() {
        this._super(...arguments);

        this.set('templatePicture', this.store.createRecord('picture'));
        this.set('playerPicture', this.store.createRecord('picture'));

        this.pickRandomTemplate();
    },

    pickRandomTemplate() {
        let randomTemplate = TEMPLATES[Math.floor(Math.random() * TEMPLATES.length)];
        this.templatePicture.load(randomTemplate);
        this.playerPicture.clear();
    }
});
