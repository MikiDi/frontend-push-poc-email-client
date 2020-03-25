import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class InboxRoute extends Route {
  @service pollingService;

  model() {
    return this.pollingService.findAll('email');
  }
}
