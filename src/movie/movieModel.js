const mongoose = require("mongoose");

const moiveSchema = new mongoose.Schema({
    title:{
        type: String,
        unique: true,
        required:true,
    },

    actors:{
        type:Array,
    },
});

const Movie = mongoose.model("Movie", moiveSchema);

module.exports = Movie;