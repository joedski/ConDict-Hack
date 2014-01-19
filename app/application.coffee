###
    Application
    - Main application class

    Responsible for initialization and bridging modules and views.
###

# Backbone = require 'Backbone'

class Application

    initialize: () ->
        
        # Initialize lungo
        Lungo.init(
            # Load your templates here
            resources: [
                'templates/asides/side_drawer.html'
                'templates/sections/page_two.html'
                'templates/sections/word_page.html'
            ]
        )

        # Initialize your modules independently (easier for configuration)
        @initVent()
        @initModel()

        # @init_user()

        # Initialize your views collectively
        @initViews()

        # Emit that application is ready - vent example
        @vent.internal.trigger 'application_ready'


    ### Initializers ###

    # Attach objects to the main application for decoupled access
    # Allows you to require 'application' anywhere in the project and access your modules and views

    # For example:
    #   app = require 'application'
    #   app.my_module.module_function()
    #   app.my_view.view_function()

    # Modules

    initVent: () ->

        Vent = require './modules/vent/vent'
        @vent = new Vent()

    # init_user: () ->

    #     User = require './modules/user/user'
    #     @user = new User()

    initModel: () ->

        Dictionary = require './modules/dictionary/dictionary'
        @model =
            dictionary: new Dictionary "Rrnake.json"


    # Views

    initViews: () ->

        MainView = require './views/MainView'
        @mainview = new MainView( model: @model )


module.exports = new Application()
