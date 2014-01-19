
module.exports = class BaseView extends Backbone.View
	
	@template = ( templateString ) ->
		@::template = Handlebars.compile( templateString )

	constructor: ( options ) ->
		# QuoJS breaks when handed a Quo query instance.
		if options?
			switch (Backbone.$.type || Backbone.$.toType)( options.el )
				when 'array', 'object'
					options.el = options.el[ 0 ]

		super

	setElement: ( element, delegate ) ->
		@undelegateEvents() if @$el

		@$el = switch
			#                                                 hax?
			when element instanceof Backbone.$, ($$ and element.__proto__ == $$.fn)
				element
			else
				Backbone.$( element )

		@el = @$el[ 0 ]

		@delegateEvents() if delegate != false
		
		return this

	# Ensure compatibility with old quojs,
	# whos .attr method does not support setting with objects.
	_ensureElement: ->
		if ! @el
			attrs = _.extend( {}, _.result( this, 'attributes' ) )
			if @id
				attrs.id = _.result( this, 'id' )
			if @className
				attrs['class'] = _.result( this, 'className' )
			
			$el = Backbone.$( "<#{ _.result( this, 'tagName' ) }>" )
			for own attrName, attrValue of attrs
				$el.attr attrName, attrValue

			@setElement $el, false
		else
			@setElement _.result( this, 'el' ), false
