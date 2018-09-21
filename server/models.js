const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    id: { type: Number, required: true, default: '' },
    name: {
        first: { type: String, required: true, default: '' },
        last: { type: String, required: true, default: '' },
        mi: { type: String, required: true, default: '' }
    },
    address: {
        addr1: { type: String, required: true, default: '' },
        addr2: { type: String, required: true, default: '' },
        addr2_type: { type: String, required: true, default: '' },
        city: { type: String, required: true, default: '' },
        state: { type: String, required: true, default: '' },
        zip: { type: String, required: true, default: '' }
    },
    job_title: { type: String, required: true, default: '' },
    phone: { type: String, required: true, default: '' },
    email: { type: String, required: true, default: '' },
    bio: { type: String, required: true, default: '' },
    img_url: { type: String, required: true, default: '' }
});

module.exports = {
    contacts: mongoose.model('contact_list', schema)
};
