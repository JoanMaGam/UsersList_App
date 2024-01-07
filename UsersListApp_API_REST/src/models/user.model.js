const { model, Schema } = require('mongoose');

const addressSchema = new Schema({
    street: String,
    suite: String,
    city: String,
    zipcode: String,
    geo: {
        lat: String,
        lng: String,
    },
});
const userSchema = new Schema({
    name: String,
    username: String,
    email: String,
    external_id: String,
    address: addressSchema
});

module.exports = model('user', userSchema);