import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class InboxRoute extends Route {
  @service liveUpdate;

  model () {
    return this.liveUpdate.query('email', {
      sort: '-sent-date'
    });
  }

  deactivate () {
    this.liveUpdate.unregister(this.currentModel);
  }
}
