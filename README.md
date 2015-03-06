# js-initializers

Rails engine that provides a micro-framework for organizing in a modular way your client-side scripts, as well as it enables you to only run the *necessary* modules for each page.

(Better readme coming soon!)

## Usage

Add `js-initializers` to your Gemfile

```ruby
# Gemfile
gem 'js-initializers'
```

Add `js-initializers` to your Sprockets manifest:

```javascript
//= require js-initializers
```

Et voilà! You're ready to add your initializers:

```javascript
// app/assets/javascripts/initializers/rickroll.js
(function($) {
  function isRickrollable() {
    return window.user !== 'admin';
  }

  function rickroll() {
    $('a').on('click', function() { window.location = 'www.youtube.com/watch?v=dQw4w9WgXcQ'; return false; });
  }

  Initializers.register('rickroll', rickroll, isRickrollable);
}(jQuery));
```

For further instructions on how to use this library and defining your own initializers, you may refer to the source code of [js-initializers.js](https://github.com/ncuesta/js-initializers/blob/master/app/assets/javascripts/js-initializers/initializers.js).

# Contributing

Contributions are welcome! Just fork, commit and send a pull request :)

# Author

This skinny gem is brought to you by Nahuel Cuesta Luengo. You may reach him at [@ncuestal](https://twitter.com/ncuestal) on Twitter or by email at nahuelcuestaluengo@gmail.com.
