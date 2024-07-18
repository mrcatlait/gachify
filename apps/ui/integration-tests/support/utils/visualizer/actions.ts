import { visualizerSelectors } from '../../selectors'
import { remixCard } from '../common';

export const actions = {
  playRemix(remix: string) {
    cy.getBySelector(visualizerSelectors.queueContainer).within(() => {
      remixCard.play(remix)
    });
  },
}
