application = require 'application'

debug = true

# Make Backbone use quojs.
Backbone.$ = $$

console.log "Hooking to deviceready event..."

$( document ).on 'deviceready', ->
	# window.device is only available on the actual 'deviceready' event.
	console.log "Device ready.  Checking for iOS7..."

	iOS7 =
		window.device &&
		window.device.platform &&
		window.device.platform.toLowerCase() == "ios" &&
		parseFloat(window.device.version) >= 7.0;

	if iOS7
		$( 'html' ).addClass 'ios7'

	navigator.splashscreen.hide()

	console.log "Is iOS7?: #{ iOS7 }"

console.log "hooking to domready..."

$ ->
	console.log "domready!"
	application.initialize()
	

	# log = window.console.log
	# window.console.log = ->
	# 	messageElem = $$( "<li></li>" )
	# 	text = (String( e ) for e in arguments).join( " " )
	# 	messageElem.text text
	# 	footerList.append messageElem
	# 	log.apply this, arguments
