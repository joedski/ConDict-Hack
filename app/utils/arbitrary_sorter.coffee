###
ArbitrarySorter

Port of Wm's code posted on Acta Lingueeni:
http://acta-lingweenie.blogspot.com/2013/10/arbitrary-sort-orders-in-python.html

With some consideration for Javascript's lack of default sorting mechanisms
beyond simple strings.
###

###
Use:
	sorter = ArbitrarySorter( "a b c ch d dh e f" )
	wordList.sort sorter

Note, there is no 'new' keyword.

Sorters also have a sort function attached which returns a new sorted array
without touching the original.
	sortedWordList = sorter.sort wordList

Sorters compares 2 strings.

You can sort complex records by defining the .toString() method
on the records' prototype as the sorter calls .toString() on
the items it's comparing.

	Record.prototype.toString = -> @[ "\\lx" ]
	arrayOfRecords.sort sorter

You can as always also wrap it in a destructuring function
which gets the keys to compare out of the records for it.

	compareRecords = ( a, b ) -> sorter( a[ "\\lx" ], b[ "\\lx" ] )
	arrayOfRecords.sort compareRecords
###

module.exports = ArbitrarySorter = ( order ) ->
	elts = order.split( /\s+/ )
	splitOrder = elts.concat()

	# Create our inefficient but functional splitter.
	# Remember that longer things need to split on first.
	splitOrder.sort ( a, b ) -> -(a.length - b.length)
	splitter = new RegExp( "(#{ splitOrder.join( '|' ) })", "gi" )

	# next, collect weights for ordering.
	ords = {}
	vals = elts.concat()
	### Coffeescript produces an odd but I guess necessary loop
		just in case you're trying to iterate backwards... ###
	for i in [0...elts.length]
		ords[ elts[ i ] ] = i

	comparator = ( stringA, stringB ) ->
		avs = wordAsValues( stringA.toString() )
		bvs = wordAsValues( stringB.toString() )
		ArbitrarySorter.compareArraysByValues( avs, bvs )

	comparator.wordAsValues = wordAsValues = ( word ) ->
		splitParts = []
		splitter.lastIndex = 0
		splitParts.push a[ 1 ] while a = splitter.exec( word )
		ords[ ri ] for ri in splitParts

	comparator.valuesAsWord = valuesAsWord = ( values ) ->
		splitParts = vals[ v ] for v in values
		splitParts.join( '' )

	comparator.sort = ( wordList ) -> wordList.concat().sort( comparator )

	# Return the comparator itself.
	comparator

ArbitrarySorter.compareArraysByValues = ( avs, bvs ) ->
	i = 0
	# null check because otherwise 0 would coerce to false.
	while avs[ i ]? or bvs[ i ]?
		if avs[ i ] == bvs[ i ]
			++i
			continue
		else if avs[ i ]? and not bvs[ i ]?
			return 1
		else if not avs[ i ]? and bvs[ i ]?
			return -1
		else
			return avs[ i ] - bvs[ i ]
	return 0
