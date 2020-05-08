import { helper } from '@ember/component/helper';

export default helper(function formatDate(params/*, hash*/) {
  return params[0].toLocaleString('nl-BE');
});
