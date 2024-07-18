import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'gachi-remix-new-releases',
  templateUrl: './remix-new-releases.component.html',
  styleUrl: './remix-new-releases.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RemixNewReleasesComponent {
  numSequence(n: number): Array<number> {
    return Array(n)
  }
}
