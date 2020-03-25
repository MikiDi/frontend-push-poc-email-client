import Controller from '@ember/controller';
import { action } from '@ember/object';
import sendMail from '../utils/send-mail';

export default class EmailController extends Controller {
  @action
  sendMail () {
    sendMail();
  }
}
