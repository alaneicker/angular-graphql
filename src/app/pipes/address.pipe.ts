import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'address',
  pure: false,
})
export class AddressPipe implements PipeTransform {
  transform(address: any): string {
    return address ? `
        ${address.addr1}
        ${address.addr2 ? `${address.addr2_type} ${address.addr2},` : ''}
        ${address.city},
        ${address.state}
        ${address.zip}
    ` : null;
  }
}
