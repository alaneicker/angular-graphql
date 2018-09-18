module.exports = `
    type Query {
        contact(id: Int!): Contact
        allContacts: [Contact]
        contactByName(
            first_name: String!, 
            last_name: String!
        ): Contact
    },
    type Mutation {
        createContact(
            id: Int!,
            first_name: String!,
            last_name: String!,
            jobTitle: String!,
            email: String!,
            phone: String!,
            bio: String!,
            imgUrl: String!,
            address: AddressInput
        ): Contact
    }
    type Contact {
        id: Int
        first_name: String
        last_name: String
        jobTitle: String
        email: String
        phone: String
        address: Address
        bio: String
        imgUrl: String
    },
    type Address {
        street: String
        unit: String
        city: String
        state: String
        zip: String
    },
    input AddressInput {
        street: String
        unit: String
        city: String
        state: String
        zip: String
    }
`;