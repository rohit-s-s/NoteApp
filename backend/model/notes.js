const mongoose = require("mongoose")
const { boolean } = require("webidl-conversions")
const AutoIncrement = require('mongoose-sequence')(mongoose);

const noteSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"user"
    },
    title:{
        type:String,
        required:true,
    },
    text:{
        type:String,
        required:true,
    },

},{timestamps:true})

noteSchema.plugin(AutoIncrement, {
    id: 'rank_counter',
    inc_field: 'rank',
    
  });

const Notes = mongoose.model("notes",noteSchema)
module.exports = Notes