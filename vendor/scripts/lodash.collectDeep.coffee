###

_.collectDeep
concats all the values in a path.

object properties are referenced by name, arrays by the # symbol.

So for foo = {
	bar: [
		{ baz: [ "a", "b", "c" ] },
		{ baz: [ "d", "e", "f" ] },
	]
}

bazzes = _.collectDeep( foo, "bar.#.baz.#" )

collectDeep will walk foo like so:
 "bar .# . baz .#"
{ bar: [ { baz: [ ... ] } ] }
and bazzes will be [ "a", "b", "c", "d", "e", "f" ]

I really need a better way to explain this.

###

_.collectDeep = ( obj, path ) ->
	pathParts = path.split( '.' )
	currentThings = [ obj ]
	while pathParts.length > 0 and currentThings.length > 0
		nextThings = []
		pathPart = pathParts[ 0 ]

		if pathPart == '#'
			for thing in currentThings
				nextThings = nextThings.concat thing
		else
			for thing in currentThings
				nextThings.push thing[ pathPart ] if thing[ pathPart ]

		currentThings = nextThings
		pathParts.shift()
	currentThings