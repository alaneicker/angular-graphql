// Mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const contactSchema = new Schema({
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

const contacts = mongoose.model('contact_list', contactSchema);

mongoose.connect('mongodb://localhost/contacts');

const queries = () => {

    'use strict';

    // Simulating response data
    const responseData = require('./mock-data.json');

    // Gets all contacts
    const allContacts = () => {
        return contacts.find({});
    }

    // Gets a single contact
    const contact = args => {
        return contacts.findOne({ id: args.id });
    }
    
    // Gets a single contact by `first_name` and `last_name`
    const getContactByName = args => {
        return responseData.filter(contact => {
            return contact.first_name === args.first_name
                && contact.last_name === args.last_name; 
        })[0];
    }

    // Creates a contact
    const createContact = (contact) => {
        return contact;
    }

    return {
        allContacts: allContacts,
        contact: contact,
        contactByName: getContactByName,
        createContact: createContact,
    };
};

module.exports = { queries };