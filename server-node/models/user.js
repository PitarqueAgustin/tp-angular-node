const mongoose = require('mongoose');
const { Schema } = mongoose;

//Definimos el esquema de los datos
const userSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        required: true,
        auto: true,
    },
    email: {type: String, required: true}
});

module.exports = mongoose.model('User', userSchema);