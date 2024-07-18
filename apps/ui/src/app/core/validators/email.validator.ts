import { ValidatorFn, Validators } from '@angular/forms'

import { CustomValidationError } from '@core/models'

const EMAIL_REGEX = new RegExp(/^[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+$/)

export const emailValidator: ValidatorFn = (control) => {
  const invalid = Boolean(Validators.pattern(EMAIL_REGEX)(control))

  return invalid ? { [CustomValidationError.EMAIL]: true } : null
}
