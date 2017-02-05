import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import setupUnitTest from '../../helpers/setup-unit-test';

let component;

moduleForComponent('disqus-comments', 'Unit | Component | disqus comments', {
  unit: true,

  beforeEach(assert) {
    setupUnitTest(this, {
      stub: 'embed',

      stubAs() {
        assert.ok(true,
          'The cached function should be called to indicate the component called loadDisqusApi on render');
      },
    });

    component = this.subject({
      identifier: 'index' // Pass in identifier
    });
  }
});

test('it should correctly resolve properties', function(assert) {
  const properties = {
    categoryId: 123,
    identifier: 'emberdisqustest-fake',
    title: 'Some fake thread',
  };

  let resetHasBeenCalled = false;

  ['categoryId', 'title'].forEach(function(property) {

    assert.strictEqual(component.get(property), null,
      `The component should not have a value for ${property}`);

  });

  assert.ok(Ember.typeOf(component.reset) === 'function',
    'The component should have a public reset method');

  component.reset = function() {
    resetHasBeenCalled = true;
  };

  component.setProperties(properties);

  for (let property in properties) {
    const expectedValue = properties[property];
    const underscoredProperty = `disqus_${Ember.String.underscore(property)}`;

    assert.equal(window[underscoredProperty], expectedValue,
      `Updating property on the component should also update the window.${underscoredProperty} property`);

  }

  Ember.run.next(function() {

    assert.ok(resetHasBeenCalled,
    'Updating the component properties should call reset at least once');

  });
});
