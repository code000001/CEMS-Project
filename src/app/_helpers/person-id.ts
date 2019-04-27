import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'THpersonID' })
export class THpersonIDPipe implements PipeTransform {

    transform(value: any): any {
        return value.substring(0, 1) + '-' + value.substring(1, 5) + '-' + value.substring(5, 10) + '-' + value.substring(10, 12) + '-' + value.substring(12, 13);
    }
}