import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'gachi-remix-card-skeleton',
  templateUrl: './remix-card-skeleton.component.html',
  styleUrl: './remix-card-skeleton.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RemixCardSkeletonComponent {}
