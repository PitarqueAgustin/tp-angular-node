const mongoose = require('mongoose');
const { Schema } = mongoose;

//Definimos el esquema de los datos
const ticketsSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        required: true,
        auto: true,
    },
    products: {type: Array, required: true},
    total: {type: String, required: true}
});

module.exports = mongoose.model('Tickets', ticketsSchema);