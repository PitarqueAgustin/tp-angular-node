const mongoose = require('mongoose');

const URI = 'mongodb+srv://pitarque:4PNkuAid3pncm6P@cluster0.bnf1r.mongodb.net/TW2?retryWrites=true&w=majority';

mongoose.connect(URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));


module.exports = mongoose;