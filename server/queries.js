const queries = () => {

    'use strict';

    // Simulating response data
    const responseData = require('./mock-data.json');

    // Gets all contacts
    const allContacts = () => {
        return responseData;
    }

    // Gets a single contact
    const contact = args => {
        return responseData.filter(contact => {
            return contact.id === args.id; 
        })[0];
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