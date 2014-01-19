###
Currently this just uses Lungo's single section thing.

That won't work for going deeper, if we should even allow that.

Also, the mechanism to show it is also hax.
###

app = require 'application'
# BaseView = require './BaseView'
ListView = require './ListView'
ListItemView = require './ListItemView'

# TODO: update to Backbone or whatever.
module.exports = class WordPageView
	constructor: ( dom ) ->
		@setDom dom

	setDom: ( dom ) ->
		return if ! dom

		# if @dom
			# clean up...

		@dom = dom
		@dom.addClass "list scroll"

		@initListView()
		@registerEvents()

	$: ( selector ) -> @dom.find( selector )

	initListView: ->
		@listView =
			new WordPageListView( el: @$( "#layout-word-stuff" ) )

	registerEvents: ->
		@dom.on 'load', => @refresh @model

	refresh: ( model )->
		@dom.find( "header h1" ).text model.word
		@listView.model = model
		@listView.render()

	showEntry: ( entry ) ->
		# @refresh entry
		@model = entry
		Lungo.Router.section "word_page"



class WordPageListItemView extends ListItemView

	@template """
		<h1>{{word}}<sub>{{senseIndex}}</sub></h1>
		{{#each definitions}}
		<p>
			<em>{{#each parts}}{{this}}. {{/each}}</em>
			{{definition}}
		</p>
		{{/each}}
		"""

	mapModel: -> @model



class WordPageListView extends ListView
	
	# el is handed down from on high

	itemViewClass: WordPageListItemView

	getModelsForListEls: -> @model?.definitionSenses
