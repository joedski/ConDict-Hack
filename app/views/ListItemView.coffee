
BaseView = require './BaseView'

# TODO: Move some of this code off to a WordListItemView class.
module.exports = class ListItemView extends BaseView

	tagName: 'li'

	@template """
		<strong>{{ word }}</strong>
		<small>{{ glosses }}</small>
		"""

	initialize: ( options ) ->
		@render()

	render: ->
		@$el.html @template( @mapModel() )
		return this

	mapModel: -> @model
