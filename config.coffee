exports.config =
  # See docs at http://brunch.readthedocs.org/en/latest/config.html.
  server:
    port: 3000
  paths:
    public: 'www'
  files:
    javascripts:
      defaultExtension: 'coffee'
      joinTo:
        'javascripts/app.js': /^app/
        'javascripts/vendor.js': /^vendor/
        'test/javascripts/test.js': /^test[\\/](?!vendor)/
        'test/javascripts/test-vendor.js': /^test[\\/](?=vendor)/
      order:
        before: [
          'vendor/scripts/console-helper.js'
          'vendor/scripts/jquery.js'
          'vendor/scripts/quo.debug.js'
          'vendor/scripts/lungo.js'
          'vendor/scripts/lodash.js'
          'vendor/scripts/lodash.collectDeep.js'
          'vendor/scripts/backbone.js'
        ]
        after: [
        ] 

    stylesheets:
      defaultExtension: 'sass'
      joinTo: 'stylesheets/app.css'
      order:
        before: [
          'vendor/styles/lungo.css'
          'vendor/styles/lungo.theme.css'
          'vendor/styles/lungo.icon.css'

        ]
        after: [] 
  plugins:
    afterBrunch: [
      # insert commands to run here.
      "bash after_brunch/copy-to-places.bash"
    ]
    handlebars:
      include:
        runtime: false