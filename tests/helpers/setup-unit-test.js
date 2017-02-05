import DisqusCache from 'ember-disqus/utils/disqus-cache';
import config from 'ember-get-config';

export default function setupUnitTest(context, options) {
  const shortname = 'emberdisqustest'; // default
  config.disqus = options || { shortname };

  /* Mock the consuming app's config/environment module */

  if (!options.shortname) {
    options.shortname = shortname;
  }

  /* Enable stubbing of calls to the Disqus API by faking the cache */

  if (options.stub) {
    const value = options.stubAs || true;

    DisqusCache[`//${shortname}.disqus.com/${options.stub}.js`] = value;
  }

  /* Fake loading of API */

  window.DISQUS = {
    reset() {

    },

    trigger() {

    },
  };

}
