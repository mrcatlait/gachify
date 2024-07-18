import { DOCUMENT } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  EmbeddedViewRef,
  OnDestroy,
  Renderer2,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  inject,
} from '@angular/core'

import { ScrollService } from '@core/services/scroll.service'

interface Position {
  x: number
  y: number
}

@Component({
  selector: 'gachi-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent implements OnDestroy {
  private readonly document = inject(DOCUMENT)
  private readonly renderer = inject(Renderer2)
  private readonly scrollService = inject(ScrollService)

  @ViewChild(TemplateRef, { static: true }) templateRef: TemplateRef<HTMLElement>
  @ViewChild('container', { static: true, read: ViewContainerRef }) viewContainerRef: ViewContainerRef

  private embeddedViewRef?: EmbeddedViewRef<HTMLElement>
  private active = false
  private firstClick = true

  ngOnDestroy(): void {
    this.close()
  }

  open(event: Event): void {
    if (this.active) {
      return
    }

    this.firstClick = true
    this.active = true

    this.scrollService.disable()

    this.addEventListener()

    this.embeddedViewRef = this.viewContainerRef.createEmbeddedView(this.templateRef)

    const position = this.getPosition(event)

    this.renderer.setStyle(this.container, 'left', `${position.x}px`)
    this.renderer.setStyle(this.container, 'top', `${position.y}px`)
  }

  close(): void {
    this.active = false
    this.scrollService.enable()
    this.embeddedViewRef?.destroy()

    this.removeEventListener()
  }

  private getPosition(event: Event): Position {
    const anchorElement = event.target as HTMLElement

    const anchorRect = anchorElement.getBoundingClientRect()

    const menuRect = this.container.getBoundingClientRect()

    const marginThreshold = 16

    let y = anchorRect.bottom
    const heightThreshold = window.innerHeight - marginThreshold - menuRect.height

    if (y > heightThreshold) {
      y = anchorRect.top - menuRect.height
    }

    let x = anchorRect.left
    const widthThreshold = window.innerWidth - marginThreshold - menuRect.width

    if (x > widthThreshold) {
      x = anchorRect.right - menuRect.width
    }

    return {
      y,
      x,
    }
  }

  private addEventListener(): void {
    this.document.addEventListener('keydown', this.escapePressedListener)
    this.document.addEventListener('click', this.clickOutsideListener)
  }

  private removeEventListener(): void {
    this.document.removeEventListener('keydown', this.escapePressedListener)
    this.document.removeEventListener('click', this.clickOutsideListener)
  }

  private readonly escapePressedListener = (event: KeyboardEvent): void => {
    if (event.code === 'Escape' && this.active) {
      this.close()
    }
  }

  private readonly clickOutsideListener = (event: Event): void => {
    if (this.firstClick) {
      this.firstClick = false
      return
    }

    const withinBoundaries = event.composedPath().includes(this.container)

    if (!withinBoundaries) {
      this.close()
    }
  }

  private get container(): HTMLElement {
    return this.embeddedViewRef?.rootNodes[0] as HTMLElement
  }
}
