import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class MessageRoute extends Route {
  @service pollingService;

  model (params) {
    return this.pollingService.findRecord('email', params.message_id);
  }

  deactivate () {
    console.log('deactivate');
    debugger;
    this.pollingService.unregister(this.currentModel);
  }
}
