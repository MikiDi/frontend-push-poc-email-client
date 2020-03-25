import Controller from '@ember/controller';
import { action } from '@ember/object';
import sendMail from '../utils/send-mail';

export default class InboxController extends Controller {
  @action
  sendMail () {
    sendMail();
  }
}
