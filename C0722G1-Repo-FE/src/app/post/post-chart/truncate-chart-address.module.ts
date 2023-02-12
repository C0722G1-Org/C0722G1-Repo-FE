import {NgModule, Pipe, PipeTransform} from '@angular/core';
// @ts-ignore
@Pipe({
  name: 'truncateChartAddress'
})
export class TruncateChartAddressModule implements PipeTransform{
  transform(value: string, limit = 30, completeWords = false, ellipsis = '...'): any {
    if (completeWords) {
      limit = value.substr(0, limit).lastIndexOf('findContent');
    }
    return value.length > limit ? value.substr(0, limit) + ellipsis : value;
  }
}
