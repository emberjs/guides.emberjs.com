#!/bin/bash

echo Version: $VERSION

cd ../guides
git checkout master
git pull
git checkout -b $VERSION
bundle exec middleman build
cd ../guides.emberjs.com
mv ../guides/build snapshots/$VERSION
node tasks/update-versions

# NEEDS TO UPDATE _redirects