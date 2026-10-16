import { module, test } from 'qunit';
import { setupTest } from 'repro/tests/helpers';

module('Unit | Service | router-scroll', function (hooks) {
  setupTest(hooks);

  test('the service can be looked up', function (assert) {
    const service = this.owner.lookup('service:router-scroll');
    assert.ok(service);
  });
});
