# weeee're just going to replace this with dropbox sync.
# It'll be easier to access the files we want to read/write, too.

try
	fs = require 'fs'
	environment = 'node'
catch error
	console.log "Error trying to require fs module.  Assuming non-nodeJS environment."
	if window?.device
		environment = 'phonegap'
	else
		environment = 'web'

switch environment
	when 'node'
		# callback signature: onLoad( error, data )
		readFile = ( path, onLoad ) ->
			options = encoding: 'utf8'
			fs.readFile path, options, onLoad

		# callback signature: onComplete( error )
		# writeFile = ( path, data, onComplete ) ->
		# 	options = encoding: 'utf8'
		# 	fs.writeFile path, data, options, onComplete

		# We can't guarantee write support in phonegap anyway,
		# at least, where the thing currently is.
		# So, write support will have to wait for DropBox support.
		# By then, I'll probably want to rewrite the file access anyway.
	when 'phonegap', 'web'
		readFile = ( path, onLoad ) ->
			r = $.get path, $.noop, 'text'
			r.done ( data, textStatus ) -> onLoad null, data
			r.fail -> onLoad "couldn't load.", null

module.exports =
	readFile: readFile
	# writeFile: writeFile