// Less verbose tests.
var pluginClass = window.LiveReloadPlugin_RequireJSIncludes;

describe('RequireJSIncludes', function() {
  it('has correct metadata', function() {
    expect(pluginClass.hasOwnProperty('identifier')).toBe(true);
    expect(pluginClass.hasOwnProperty('version')).toBe(true);
  });

  describe('reload', function() {
    var plugin, reloadSpy;

    beforeEach(function() {
      reloadSpy = jasmine.createSpy('reload');

      plugin = new pluginClass(/* window */ {
        document: {
          location: {
            reload: reloadSpy
          }
        }
      });
    });

    it('ignores non-JS', function() {
      expect(plugin.reload('foo.css')).toBe(false);
      expect(plugin.reload('foo.img')).toBe(false);
      expect(reloadSpy).not.toHaveBeenCalled();
    });

    it('reloads if JS is relevant', function() {
      expect(plugin.reload('indexSpec.js')).toBe(true);
      expect(reloadSpy).toHaveBeenCalled();

      // Test a longer path.
      reloadSpy.calls.reset();
      expect(plugin.reload('../index.js')).toBe(true);
      expect(reloadSpy).toHaveBeenCalled();
    });

    it('returns true, but does not reload, if JS is not relevant', function() {
      // The plugin returns true to prevent LiveReload from handling the JS.
      expect(plugin.reload('foo.js')).toBe(true);

      // But does not call reload.
      expect(reloadSpy).not.toHaveBeenCalled();
    });

    it('returns true, but does not reload, for sourcemaps', function() {
      // The plugin returns true to prevent LiveReload from handling the map.
      expect(plugin.reload('foo.js.map')).toBe(true);

      // But does not call reload.
      expect(reloadSpy).not.toHaveBeenCalled();
    });
  });
});