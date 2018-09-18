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
    }
    type Address {
        addr1: String
        addr2: Addr2
        city: String
        state: String
        zip: String
    }
    type Addr2 {
        type: String
        identifier: String
    }
    input Addr2Input {
        type: String
        identifier: String
    }
    input AddressInput {
        addr1: String
        addr2: Addr2Input
        city: String
        state: String
        zip: String
    } 
`;