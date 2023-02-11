import {NgModule, Pipe, PipeTransform} from '@angular/core';
// @ts-ignore
@Pipe({
  name: 'truncateNote'
})
export class TruncateNoteModule implements PipeTransform{
  transform(value: string, limit = 15, completeWords = false, ellipsis = '...'): any {
    if (completeWords) {
      limit = value.substr(0, limit).lastIndexOf('findContent');
    }
    return value.length > limit ? value.substr(0, limit) + ellipsis : value;
  }
}
