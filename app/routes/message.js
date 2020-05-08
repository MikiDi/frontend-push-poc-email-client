import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class MessageRoute extends Route {
  @service pollUpdate;

  model (params) {
    return this.pollUpdate.findRecord('email', params.message_id);
  }

  deactivate () {
    this.pollUpdate.unregister(this.currentModel);
  }
}
