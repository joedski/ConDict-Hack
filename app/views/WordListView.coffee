
ListView = require './ListView'
WordListItemView = require './WordListItemView'

###
Expects a model in the form of:
	entries: [ (dictionary entries here)... ]
###

module.exports = class WordListView extends ListView

	# el is handed to us by MainView.

	# events:
	# 	"click .list-view > li": "onListItemViewClick"

	itemViewClass: WordListItemView

	# onListItemViewClick: ->
