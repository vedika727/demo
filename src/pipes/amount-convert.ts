import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'currencyConvert'
})
export class currencyConvertPipe {

    transform(value: number): number {
        console.log('value', value);
        let amount;
        amount = new Intl.NumberFormat('THB', { maximumFractionDigits: 2 }).format(value);

        return amount;
    }

}