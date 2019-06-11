import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * @author Sandesh Uttarwar
 * @description to add inner HTML styling
 */
@Pipe({
  name: 'safeHtml',
})
export class SafeHtmlPipe implements PipeTransform {
  
  constructor(private sanitizer: DomSanitizer){}
  
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }
}
