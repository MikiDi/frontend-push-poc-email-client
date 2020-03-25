import Model, { attr } from '@ember-data/model';

export default class EmailModel extends Model {
  @attr from;
  @attr to;
  @attr subject;
}
