import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keyvalue'
})

export class KeyvaluePipe implements PipeTransform {

  transform(value: {[symbol: string]: number[]}): any[] {
    let keyvaluePairs = [];
    for (let key in value) {
      if (value.hasOwnProperty(key)) {
        keyvaluePairs.push({key: key, value: value[key]});
      }
    }
    return keyvaluePairs;
  }

}
