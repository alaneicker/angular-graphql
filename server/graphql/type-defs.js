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
            job_title: String!,
            email: String!,
            phone: String!,
            bio: String!,
            img_url: String!,
            address: AddressInput
        ): Contact
    }
    type Contact {
        id: Int
        name: Name
        job_title: String
        email: String
        phone: String
        address: Address
        bio: String
        img_url: String
    }
    type Name {
      first: String
      last: String
      mi: String
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
      mi: String
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
