import {
  Component,
  ChangeDetectionStrategy,
  forwardRef,
  Input,
  inject,
  OnDestroy,
  OnInit,
  signal,
  computed,
} from '@angular/core'
import {
  ControlValueAccessor,
  FormGroupDirective,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from '@angular/forms'
import { Subject, merge, takeUntil } from 'rxjs'

import { VALIDATION_ERRORS } from '@core/tokens'
import { textFieldSelectors } from '@selectors'

type InputType = 'text' | 'password' | 'email' | 'number'
type OnChangeFn = (value: string) => void
type OnTouchedFn = () => void
type OnValidatorChangeFn = () => void

@Component({
  selector: 'gachi-text-field',
  templateUrl: './text-field.component.html',
  styleUrl: './text-field.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextFieldComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => TextFieldComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextFieldComponent implements ControlValueAccessor, OnDestroy, OnInit, Validator {
  @Input({ required: true }) formControlName = ''
  @Input() label = ''
  @Input() placeholder = ''
  @Input() type: InputType = 'text'

  private readonly formGroupDirective: FormGroupDirective | null = inject(FormGroupDirective)
  private readonly validationErrors = inject(VALIDATION_ERRORS)

  private readonly destroyed$ = new Subject<void>()

  value = ''
  disabled = false

  private readonly errors = signal<ValidationErrors | null>(null)
  readonly message = computed(() => this.formatErrors(this.errors()))

  readonly selectors = textFieldSelectors

  onChange: OnChangeFn = () => {}
  onTouched: OnTouchedFn = () => {}
  onValidatorChange: OnValidatorChangeFn = () => {}

  ngOnInit(): void {
    if (!this.formGroupDirective) {
      throw new Error('TextFieldComponent must be used within a FormGroupDirective')
    }

    const control = this.formGroupDirective.control.get(this.formControlName)

    if (!control) {
      throw new Error(`Control "${this.formControlName}" not found in the form group`)
    }

    merge(control.valueChanges, this.formGroupDirective.ngSubmit)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(() => {
        this.errors.set(control.errors)
      })
  }

  ngOnDestroy(): void {
    this.destroyed$.next()
    this.destroyed$.unsubscribe()
  }

  registerOnChange(onChange: OnChangeFn): void {
    this.onChange = onChange
  }

  registerOnTouched(onTouched: OnTouchedFn): void {
    this.onTouched = onTouched
  }

  registerOnValidatorChange(onValidatorChange: OnValidatorChangeFn): void {
    this.onValidatorChange = onValidatorChange
  }

  setDisabledState(disabled: boolean): void {
    this.disabled = disabled
  }

  writeValue(value: string): void {
    this.setValue(value)
  }

  validate() {
    return null
  }

  handleInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value
    this.setValue(value, true)
  }

  private setValue(value: string, emitEvent?: boolean): void {
    this.value = value

    if (emitEvent) {
      this.onChange(value)
      this.onTouched()
    }
  }

  private formatErrors(errors: ValidationErrors | null): string {
    if (!errors) {
      return ''
    }

    const firstKey = Object.keys(errors)[0]

    const messageTemplate = this.validationErrors[firstKey] as (typeof this.validationErrors)[string] | null

    if (!messageTemplate) {
      throw new Error(`No error message found for "${firstKey}" validation error`)
    }

    const messageData = {
      ...errors[firstKey],
      value: this.value,
      fieldName: this.label || 'Field ',
    }

    return messageTemplate(messageData)
  }
}
