export const contactFragment = `
  id
  name {
    first
    last
    mi
  }
  job_title
  email
  phone
  bio
  img_url
  address {
    addr1
    addr2
    addr2_type
    city
    state
    zip
  }
`;

export const contactsMenuFragment = `
  id
  img_url
  name {
    first
    last
  }
`;