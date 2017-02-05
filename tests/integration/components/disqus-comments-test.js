import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import setupUnitTest from '../../helpers/setup-unit-test';
import wait from 'ember-test-helpers/wait';

moduleForComponent('disqus-comments', 'Integration | Component | disqus comments', {
  integration: true,

  beforeEach(assert) {
    setupUnitTest(this, {
      stub: 'embed',

      stubAs() {
        assert.ok(true,
          'The cached function should be called to indicate the component called loadDisqusApi on render');
      },
    });
  }
});


test('it renders', function(assert) {
  this.render(hbs`{{disqus-comments}}`);

  const $component = this.$().children().eq(0);

  assert.ok($component.hasClass('disqus-comments'),
    'The component should have a .disqus-comments class');

  assert.equal($component.attr('id'), 'disqus_thread',
    'The component should have a #disqus_thread class per the Disqus documentation');
});
