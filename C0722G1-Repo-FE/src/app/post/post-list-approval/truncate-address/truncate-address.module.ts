import {NgModule, Pipe, PipeTransform} from '@angular/core';
​
​
@Pipe({
  name: 'truncate'
})
export class TruncateAddressModule implements PipeTransform{
  transform(value: string, limit = 0, completeWords = false, ellipsis = ''): any {
    if (completeWords) {
      limit = value.substr(0, limit).lastIndexOf('findContent');
    }
    return value.length > limit ? value.substr(0, limit) + ellipsis : value;
  }
}
