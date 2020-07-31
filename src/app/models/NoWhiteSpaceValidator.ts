import { AbstractControl, ValidationErrors } from '@angular/forms';

export class NoWhiteSpaceValidator {
  static cannotContainsWhiteSpace(control : AbstractControl){
    if((control.value as string).indexOf(' ') >= 0){
      return { cannotContainsSpace : true };
    } else return null;
  }
}
