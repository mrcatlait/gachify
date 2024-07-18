import { Directive, ElementRef, HostListener, Input, OnChanges, inject } from '@angular/core'

import { NgChanges } from '@core/models'

@Directive({
  selector: 'input[slider]',
  host: {
    class: 'slider',
    type: 'range',
  },
})
export class SliderDirective implements OnChanges {
  private readonly elRef = inject(ElementRef)

  @Input() value?: number | null

  ngOnChanges({ value }: NgChanges<SliderDirective>): void {
    if (value) {
      this.element.value = String(this.value)
      this.onInput(this.element)
    }
  }

  @HostListener('input', ['$event.target']) onInput(element: HTMLInputElement) {
    const progress = (Number(element.value) / Number(element.max)) * 100
    this.element.style.background = `linear-gradient(to right, var(--color-primary) ${progress}%, var(--color-text-disabled) ${progress}%)`
  }

  @HostListener('mouseup') onMouseUp() {
    this.element.blur()
  }

  private get element(): HTMLInputElement {
    return this.elRef.nativeElement
  }
}
