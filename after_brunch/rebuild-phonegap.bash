#!/bin/bash

# rebuild the phonegap IOS thingy.

echo "Rebuilding PhoneGap iOS app..."
cd ../ConDict-app
phonegap build ios
echo "PhoneGap iOS app rebuilt."