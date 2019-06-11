import { Injectable } from "@angular/core";

/**
 * @author Ayush Vyas
 * @description This service is used to perform operations on date
 */

@Injectable()
export class DateServiceProvider {
  constructor() {}

  /**
   * @description this method is used to convert date into thai date
   */

  getThaiDate(date) {
    let thaiDate = new Intl.DateTimeFormat("th").format(date);
    return thaiDate;
  }

}
