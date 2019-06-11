
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'decimalLimitTo'
})
export class TruncateDecimalPipe {
  transform(value: string, args?: string) : string {
    // let limit = args.length > 0 ? parseInt(args[0], 10) : 10;
    // let trail = args.length > 1 ? args[1] : '...';
     ;
    let limit = args ? parseInt(args, 2) : 2;
    let splitString = value.split('.');
    let digit=splitString[0]
    let decimalUpto2 = splitString[1].length > limit ? splitString[1].substring(0,limit) : splitString[1]
    let decimal=(decimalUpto2 ? decimalUpto2 : "")
    let number=decimalUpto2 ? (digit + "." + decimalUpto2) : digit 
    return number;
  }
}