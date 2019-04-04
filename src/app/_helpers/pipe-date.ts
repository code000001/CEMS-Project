import { Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment'
import "moment-timezone";

@Pipe({name: 'THPipe'})
export class PipeFormat implements PipeTransform {
  
    transform(value: any): any {
       var datechange =  moment(value).locale('th').format('LL');
        return datechange;
      }
}