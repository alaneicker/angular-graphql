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
            name: NameInput,
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
        name: Name
        jobTitle: String
        email: String
        phone: String
        address: Address
        bio: String
        imgUrl: String
    }
    type Name {
      first: String
      last: String
    }
    type Address {
        addr1: String
        addr2: String
        addr2_type: String
        city: String
        state: String
        zip: String
    }
    input NameInput {
      first: String
      last: String
    }
    input AddressInput {
        addr1: String
        addr2: String
        addr2_type: String
        city: String
        state: String
        zip: String
    }
`;
