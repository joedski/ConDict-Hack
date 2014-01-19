
app = require 'application'
BaseView = require './BaseView'

module.exports = class SearchView extends BaseView
	initialize: ( options ) ->
		@searchFieldDom = @$el.find( "input[type=search]" )
		app.vent.internal.on 'app.search', ( val ) =>
			console.log "app.search:", val
		@searchFieldDom.on 'keyup', =>
			app.vent.internal.trigger 'app.search.keypress', @searchFieldDom.val()
	
	blur: ->
		@searchFieldDom[ 0 ].blur()