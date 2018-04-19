#!/bin/bash

echo Version: $VERSION

cd ../guides
git checkout master
git pull
git checkout $VERSION 2>/dev/null || git checkout -b $VERSION
bundle exec middleman build
cd ../guides.emberjs.com
mkdir $VERSION
mv ../guides/build snapshots/$VERSION
node tasks/update-versions
sed -Ei .bak "s/v[0-9]+[.][0-9]+[.][0-9]+/$VERSION/g" snapshots/_redirects
git add --all
git commit -m "Add snapshot for Ember.js revision $VERSION"