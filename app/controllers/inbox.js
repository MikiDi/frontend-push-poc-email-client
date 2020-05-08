import Controller from '@ember/controller';
import { action } from '@ember/object';
import sendMail from '../utils/send-mail';
import toggleReadStatus from '../utils/toggle-mail-read-status';

export default class InboxController extends Controller {
  @action
  sendMail () {
    sendMail();
  }

  @action
  toggleReadStatus (mail) {
    toggleReadStatus(mail);
  }
}
