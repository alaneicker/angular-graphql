const mongoose = require('mongoose');
const Contacts = require('../mongoose/models').Contacts;

mongoose.connect('mongodb://localhost/contacts');

const queries = () => {

    'use strict';

    const getFirstIds = () => {
        return Contacts.find({});
    }

    // Gets all contacts
    const allContacts = () => {
        return Contacts.find({});
    }

    // Gets a single contact
    const contact = args => {
        return Contacts.findOne({ id: args.id });
    }
    
    // Gets a single contact by `first_name` and `last_name`
    const getContactByName = args => {
        
    }

    // Creates a contact
    const createContact = (contact) => {
        return Contacts.create(contact);
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
