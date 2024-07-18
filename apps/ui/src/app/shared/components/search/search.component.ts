import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,
  inject,
  Renderer2,
  HostListener,
} from '@angular/core'

@Component({
  selector: 'gachi-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
  private readonly renderer = inject(Renderer2)
  private readonly element = inject(ElementRef)

  @ViewChild('input') input: ElementRef<HTMLInputElement>

  private isFocused = false

  @HostListener('focusout')
  handleFocusOut(): void {
    if (!this.isFocused) {
      return
    }

    this.isFocused = false
    this.renderer.removeClass(this.element.nativeElement, 'gachi-search-active')
  }

  handleClick(): void {
    this.renderer.addClass(this.element.nativeElement, 'gachi-search-active')
    this.input.nativeElement.focus()
    this.isFocused = true
  }
}
