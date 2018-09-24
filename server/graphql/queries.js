const mongoose = require('mongoose');
const Contacts = require('../mongoose/models').Contacts;

mongoose.connect('mongodb://localhost/contacts');

const queries = () => {

    'use strict';

    // Gets the most recent contact
    const getFirstContact = () => {
        return Contacts.find().limit(1);
    };

    // Gets all contacts
    const allContacts = () => {
        return Contacts.find();
    };

    // Gets a single contact
    const contact = args => {
        return Contacts.findOne({ id: args.id });
    };
    
    // Gets a single contact by `first_name` and `last_name`
    const getContactByName = args => {
        
    };

    // Creates a contact
    const createContact = contact => {
        return Contacts.create(contact);
    };

    // Deletes a contact
    const deleteContact = args => {
        return Contacts.remove({ id: args.id });
    };

    // Updates a contact
    const updateContact = args => {
        return args;
    };

    return {
        getFirstContact: getFirstContact,
        allContacts: allContacts,
        contact: contact,
        contactByName: getContactByName,
        createContact: createContact,
        deleteContact: deleteContact,
        updateContact: updateContact,
    };
};

module.exports = { queries };
