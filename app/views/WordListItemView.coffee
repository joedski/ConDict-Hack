
app = require '../application'
ListItemView = require './ListItemView'

module.exports = class WordListItemView extends ListItemView

	className: 'arrow'

	initialize: ( options ) ->
		super
		@$el.on 'singleTap', =>
			@showWord.apply( this, arguments )
			false

	mapModel: ->
		return if ! @model

		glosses = []

		for sense in @model.definitionSenses
			senseGlosses = []
			glosses.push senseGlosses
			if sense.glosses then for gloss in sense.glosses
				senseGlosses.push gloss
				# glosses.push gloss

		if glosses.length < 1
			glosses.push @model.definitionSenses[ 0 ].definitions[ 0 ].definition

		word: @model.word
		glosses: (sense.join( ", " ) for sense in glosses).join( "; " )

	showWord: ( event ) ->
		console.log "showWord: #{ @model.word } from #{ event?.type } event"
		app.mainview.wordPageView.showEntry @model