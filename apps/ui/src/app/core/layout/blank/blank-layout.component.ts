import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core'

import { AudioState } from '@core/state'
import { PlayerModule } from '@features/player'
import { SharedModule } from '@shared/shared.module'

@Component({
  standalone: true,
  selector: 'gachi-blank-layout',
  templateUrl: 'blank-layout.component.html',
  styleUrls: ['blank-layout.component.scss'],
  imports: [SharedModule, PlayerModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlankLayoutComponent implements OnInit {
  private readonly audioState = inject(AudioState)

  ngOnInit(): void {
    if (this.audioState.playing()) {
      this.audioState.pause()
    }
  }
}
