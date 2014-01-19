#!/bin/bash

cpToPlace() {
	SRC=$1
	DEST=$2

	if [[ -e "$( dirname "$DEST" )" ]]; then
		[[ -e "$DEST" ]] && rm -rf "$DEST"
		cp -r "$SRC" "$DEST"
		echo "Copied '$SRC' => '$DEST'"
	else
		return 1
	fi
}

cpToPlace 'www' '../ConDict-app/www'
cpToPlace '../ConDict-app/www' '../ConDict-app/platforms/ios/www'
cpToPlace 'www' '../ConDict-nw/ConDict.app/Contents/Resources/app.nw'
