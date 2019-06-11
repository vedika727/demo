import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'mask'
})
export class MaskPipe {
    transform(value: string): string {
        console.log('value', value);
        let lastdigits;
        let masked;

        if (value == null) {
            console.log('if');
            return "";
        } else {
            let len = value.length;
            if (len >= 9) {
                lastdigits = value.substring(len - 4, len);
                masked = "XXX-XXX-" + lastdigits;
            } else {
                masked = value;
            }
        }

        return masked;
    }
}