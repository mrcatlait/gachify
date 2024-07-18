import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

@Component({
  selector: 'gachi-logo',
  templateUrl: './logo.component.svg',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoComponent {
  @Input() textColor = '#ffffff'

  @Input() logoColor = '#58f3a8'
}
