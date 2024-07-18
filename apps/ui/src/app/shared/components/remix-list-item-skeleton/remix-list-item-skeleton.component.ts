import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'gachi-remix-list-item-skeleton',
  templateUrl: './remix-list-item-skeleton.component.html',
  styleUrl: './remix-list-item-skeleton.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RemixListItemSkeletonComponent {}
