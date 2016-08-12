# livereload-require-js-includes

Defines a [LiveReload](https://github.com/livereload/livereload-js) plugin
that only reloads the page when JS changes if that JS is included on the page.

Depending on your build process, editing a script that is included on the page
you have open may cause changes to other files that _aren't_ included on the 
page&mdash;maybe you're editing a dependency of multiple build targets, or are
generating sourcemaps alongside your scripts. Your build process won't know which
of those files are relevant to the page, so it has to notify the LiveReload server 
that all of them have changed. But the LiveReload client doesn't always attempt to 
determine if those files require reloading the page&mdash;it does for
[CSS](https://github.com/livereload/livereload-js/blob/e1d943628005ad8d18a50ee1e8c29858ca748d10/dist/livereload.js#L766)
and [images](https://github.com/livereload/livereload-js/blob/e1d943628005ad8d18a50ee1e8c29858ca748d10/dist/livereload.js#L773),
but not JS.

This plugin fixes that by intercepting all changed JS and sourcemaps and only
reloading if the page includes a script tag with a matching filename. (So it
will never reload for a sourcemap change, the assumption there being that the
sourcemap would only have changed if the JS changed too.)

(If this seems like the way that LiveReload should just work out of the box,
please upvote https://github.com/livereload/livereload-js/issues/59 !)

## Installation

```js
bower install livereload-require-js-includes --save-dev
```

(`--save-dev` assumes that you're only running LiveReload for local development.)

## Usage

```html
<script src="bower_components/livereload-require-js-includes/index.js"></script>
```

The plugin will automatically register itself with the LiveReload client, no matter
whether it loads before or after the client.

## Contributing

We welcome pull requests! In particular:

* I'm not sure that this supports Windows due to the way it matches paths.
* the file-matching algorithm could be improved&mdash;it currently matches files
by the last path component, but should probably try to match other components
like [how LiveReload determines if paths match](https://github.com/livereload/livereload-js/blob/e1d943628005ad8d18a50ee1e8c29858ca748d10/dist/livereload.js#L719).

Please lint your code.

### Running tests

`npm test` will open the tests in the browser.

## Release History

* 1.0.1 Fix identifier.
* 1.0.0 Initial release.
