#!/bin/bash

echo Version: $VERSION

cd ../guides
git checkout master
git pull
git checkout -b $VERSION || git checkout $VERSION
bundle exec middleman build
cd ../guides.emberjs.com
mkdir v2.17.0
mv -v `pwd`/../guides/build/* `pwd`/snapshots/$VERSION
node tasks/update-versions

# NEEDS TO UPDATE _redirects