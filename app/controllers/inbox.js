import Controller from '@ember/controller';
import { action } from '@ember/object';
import sendMail from '../utils/send-mail';
import toggleReadStatus from '../utils/toggle-mail-read-status';
import { inject as service } from '@ember/service';

export default class InboxController extends Controller {
  @service headIdentification;

  @action
  sendMail () {
    sendMail();
  }

  @action
  toggleReadStatus (mail) {
    toggleReadStatus(mail);
  }
}
