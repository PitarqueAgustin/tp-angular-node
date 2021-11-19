const mongoose = require('mongoose');
const { Schema } = mongoose;

//Definimos el esquema de los datos
const productsSchema = new Schema({
    _id: {type: String, required: true},
    name: {type: String, required: true},
    price: {type: String, required: true},
    category: {type: String, required:true},
    image: {type: String, required: true},
    description: {type: String, required:false}
});

module.exports = mongoose.model('Products', productsSchema);