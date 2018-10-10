import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fullname',
  pure: false,
})
export class FullNamePipe implements PipeTransform {
  transform(name: any): string {
    return name ? `${name.first} ${name.mi || ''} ${name.last}` : null;
  }
}
