
BaseView = require './BaseView'
ListItemView = require './ListItemView'

###
Expects a model in the form of:
	entries: [ (dictionary entries here)... ]
###

module.exports = class ListView extends BaseView

	# el is usually handed to this by whatever view created it,
	# because it's taking control of an existing element.

	@template """
		<ul class="list-view"></ul>
		"""

	# events:
	# 	"click .list-view > li": "onListItemViewClick"

	itemViewClass: ListItemView

	initialize: ( options ) ->
		# just in case...
		@$el.addClass "list scroll"
		@render()

	render: ->
		listEl = Backbone.$( @template() )
		@populateListElement listEl, @getModelsForListEls()
		@$el.empty().append listEl

	populateListElement: ( listEl, models ) ->
		if models
			@itemViews = (new @itemViewClass( model: itemModel ) for itemModel in models)
			listEl.append itemView.el for itemView in @itemViews
		listEl

	getModelsForListEls: -> @model?.entries

	# onListItemViewClick: ->
