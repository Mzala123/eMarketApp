var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
    clientName: {type: Array, required: true},
    name: {type: String, required: true},
    quantity: {type: Number},
    description: {type: String},
    price: {type: Number},
    createdOn: {type: Date, "default":Date.now}
})

mongoose.model('Product', productSchema);