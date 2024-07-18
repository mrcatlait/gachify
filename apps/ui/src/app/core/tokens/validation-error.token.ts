import { InjectionToken } from '@angular/core'

type errorMessageFn = (options: { fieldName: string; value: unknown; requiredLength?: number; min?: number }) => string

const validationErrors: Record<string, errorMessageFn> = {
  required: ({ fieldName }) => `${fieldName} is required`,
  email: ({ fieldName }) => `${fieldName} must be in the format name@example.com`,
  pattern: ({ fieldName }) => `${fieldName} has invalid format`,
  minlength: ({ fieldName, requiredLength }) => `${fieldName} must be at least ${requiredLength} characters long`,
  min: ({ fieldName, min }) => `${fieldName} must be greater than or equal to ${min}`,
}

export const VALIDATION_ERRORS = new InjectionToken('VALIDATION_ERRORS', {
  providedIn: 'root',
  factory: () => validationErrors,
})
