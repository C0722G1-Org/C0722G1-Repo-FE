import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'NotificationPipe'
})
export class NotificationPipePipe implements PipeTransform {
  transform(value: string, limit = 70, completeWords = false, ellipsis = '...'): any {
    if (completeWords) {
      limit = value.substr(0, limit).lastIndexOf('findContent');
    }
    return value.length > limit ? value.substr(0, limit) + ellipsis : value;
  }
}
