export interface IContact {
    id: number;
    name: Name;
    email: string;
    phone: string;
    jobTitle: string;
    bio: string;
    imgUrl: string;
    address: Address;
}

export interface Name {
  first: string;
  last: string;
}

export interface Address {
  addr1: string;
  addr2: string;
  addr2_type: string;
  city: string;
  state: string;
  zip: string;
}
