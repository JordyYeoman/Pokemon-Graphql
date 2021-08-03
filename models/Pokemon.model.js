const { model, Schema } = require('mongoose');

const PokemonSchema = new Schema ({
    Name: String,
    Number: Number,
    Base_Total: Number,
});

const Pokemon = model('pokemon', PokemonSchema, 'all_pokemon');
module.exports = Pokemon;
