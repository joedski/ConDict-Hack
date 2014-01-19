###
	MainView
    - Handles all view logic for the main view (DOM manipulations, etc)

###

# Backbone = require 'Backbone'
app = require '../application'
BaseView = require './BaseView'
WordListView = require './WordListView'
WordPageView = require './WordPageView'
SearchView = require './SearchView'
ArbitrarySorter = require 'utils/arbitrary_sorter'

module.exports = class MainView extends BaseView

	el: 'body'

	events: {}
		# "click .thingy": "doThingyMethod"

	initialize: ->

		@$el.addClass "main-view"
		@mainSectionEl = @$( "#layout" )

		@registerEvents()
		@registerViews()



	### Events ###

	registerEvents: ->

		@mainSectionEl.on 'unload', =>
			@searchView.blur()

		app.vent.internal.on 'dictionary.initialized', =>
			console.log "MainView: dictionary.initialized fired."
			@refreshMainListViews()

		app.vent.internal.on 'app.search', @doSearch

	# Fat arrow!
	doSearch: ( searchVal ) =>
		console.log "MainView on app.search: #{ searchVal }"

		testWord = ( entry ) ->
			0 <= entry.word.indexOf( searchVal )

		testGlosses = ( entry ) ->
			for gloss in _.collectDeep entry, "definitionSenses.#.glosses.#"
				return true if 0 <= gloss.indexOf( searchVal )

		testDefinitions = ( entry ) ->
			for definition in _.collectDeep entry, "definitionSenses.#.definitions.#.definition"
				return true if 0 <= definition.indexOf( searchVal )

		if not searchVal
			console.log "MainView on app.search: No search val.  No predicate."
			@searchPredicate = null
			@refreshMainListViews()
			return

		matches = /^(\w+:)?(.*)$/.exec( searchVal )
		pendent = matches[ 1 ]
		searchVal = (matches[ 2 ] || '').toLowerCase()

		predicate = switch
			when /^w:/.test pendent then testWord
			when /^g:/.test pendent then testGlosses
			when /^d:/.test pendent then ( entry ) ->
				testGlosses( entry ) or testDefinitions( entry )
			else ( entry ) ->
				testWord( entry ) or testGlosses( entry ) or testDefinitions( entry )

		console.log "MainView on app.search: predicate:", predicate

		@searchPredicate = predicate
		@refreshMainListViews()



	### Views ###

	registerViews: ->
		@initSorter()
		@registerSearchView()
		@registerStaticViews()
		@registerMainListViews()

	initSorter: ->
		@sorter = ArbitrarySorter( "á a b d é e g í i k c l m n ó o p r s sh t ú u v f w y z '" )

	registerSearchView: ->
		@searchView = new SearchView( el: @$( "#global-search" ) )

	registerStaticViews: ->
		@wordPageView = new WordPageView( @$( "#word_page" ) )

	registerMainListViews: ->
		@wordsListView   = new WordListView( el: @$( "#layout-art-words" ) )
		@affixesListView = new WordListView( el: @$( "#layout-art-affixes" ) )
		@conjsListView   = new WordListView( el: @$( "#layout-art-conjs" ) )

		@mainListViews = [ @wordsListView, @affixesListView, @conjsListView ]



	refreshMainListViews: ->
		return if not @model.dictionary.data?

		getEntries = ( filterFn ) =>
			@sortEntries @filterEntries filterFn

		@wordsListView.model = entries: getEntries ( entry ) -> entry

		@affixesListView.model = entries: getEntries ( entry ) ->
			for lc in entry.lexicalClass || []
				switch lc
					when 'prefix', 'suffix', 'affix', 'infix', 'circumfix'
						return true
			return false

		@conjsListView.model = entries: getEntries ( entry ) ->
			for lc in entry.lexicalClass || []
				switch lc
					when 'conjunction'
						return true
			return false

		view.render() for view in @mainListViews



	### Functions ###

	filterEntries: ( filterFn ) ->
		combinedFilterFn = if @searchPredicate
			( entry ) => filterFn( entry ) and @searchPredicate( entry )
		else filterFn

		@model.dictionary.findAllEntries( combinedFilterFn )

	getActiveWordList: ->
		@mainSectionEl.children( 'article' ).filter( ".active" )

	sortEntries: ( entries ) ->
		compareByWord = ( a, b ) => @sorter( a.word, b.word )
		(entries || []).concat().sort compareByWord
