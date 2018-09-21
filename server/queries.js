const mongoose = require('mongoose');
const contacts = require('./models').contacts;

mongoose.connect('mongodb://localhost/contacts');

const queries = () => {

    'use strict';

    const getFirstIds = () => {
        return contacts.find({});
    }

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
        getFirstIds: getFirstIds,
        allContacts: allContacts,
        contact: contact,
        contactByName: getContactByName,
        createContact: createContact,
    };
};

module.exports = { queries };
