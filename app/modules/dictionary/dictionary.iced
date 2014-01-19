app = require '../../application'

readFile = ( path, callback ) ->
	console.log "fake fs.readFile: #{path}"
	r = $.get path, $.noop, 'text'
	r.done ( data, textStatus ) -> callback null, data
	r.fail -> callback "couldn't load.", null

module.exports = class Dictionary
	@LOADING: "loading"
	@INITIALIZED: "initialized"

	constructor: ( @source ) ->
		@status = Dictionary.LOADING
		@loadSource()

	loadSource: ->
		# console.log "loadSource: trying to load #{@source}"
		# await fs.exists @source, defer doesExist
		# console.log "loadSource: does exist: #{doesExist}"
		# if doesExist then
		await @loadFromDisk defer data
		# console.log "loadSource: initializing..."
		@initialize( data )

	loadFromDisk: ( callback ) ->
		# await fs.readFile @source, 'utf8', defer err, data
		await readFile @source, defer err, data
		# if err then throw err
		console.log "Dictionary.loadFromDisk: readFile finished."
		# Not catching error.
		data = JSON.parse( data ) if data
		callback( data )

	# saveToDisk: ( callback ) ->
	# 	serializedData = JSON.stringify( @data )
	# 	await fs.writeFile @source, serializedData, defer err
	# 	if err then throw err

	# 	app.vent.internal.trigger 'dictionary.persisted'

	initialize: ( data )->
		if data
			@data = data
		else
			# Make empty schemoid thing here.
			@data =
				dictionary:
					entries: []
					# alternateForms: []

		@cacheRelations()

		@entries = @data.dictionary.entries

		@status = Dictionary.INITIALIZED
		app.vent.internal.trigger 'dictionary.initialized'

	cacheRelations: ->
		###
		AKA THIS IS NOT A RELATIONAL DATABASE BOO HOO
		###

		console.log "Dictionary.cacheRelations: does nothing right now because quick prototyping"

	# addEntry: ( newEntry ) ->
	# 	if @findSingleEntry( ( entry ) -> entry.word.toLowerCase() == newEntry.word.toLowerCase() )
	# 		throw "word '#{word}' already exists in the database"
			
	# 	@data.dictionary.entries.push newEntry

	# 	app.vent.internal.trigger 'dictionary.entry.added', newEntry

	# deleteEntry: ( entryId ) ->
	# 	if entryId >= @data.dictionary.entries.length
	# 		throw "entryId #{entryId} is out of bounds of entries array"

	# 	@data.dictionary.entries.splice entryId, 1

	# 	app.vent.internal.trigger 'dictionary.entry.deleted'

	findSingleEntry: ( predicate ) ->
		for entry in @entries
			if predicate( entry ) then return entry

	findAllEntries: ( predicate ) ->
		entry for entry in @entries when predicate( entry )
