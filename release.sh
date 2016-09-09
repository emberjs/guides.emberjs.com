#!/bin/bash

echo Version: $VERSION

cd ../guides
#git checkout -b $VERSION
bundle exec middleman build
cd ../guides.emberjs.com
mv ../guides/build snapshots/$VERSION
node tasks/update-versions
#node tasks/publish-search --engine ember-guides --environment production --revision $VERSION --api-key $API_KEY
git add --all
git commit -m "Add snapshot for Ember.js revision $VERSION"

# Staging has shifted to the newer Firebase platform
firebase deploy --project staging

#firebase deploy -f ember-guides-staging
