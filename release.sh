#!/bin/bash

echo Version: $VERSION

cd ../guides
git checkout master
git pull
git checkout $VERSION 2>/dev/null || git checkout -b $VERSION
bundle exec middleman build
cd ../guides.emberjs.com
mkdir $VERSION
mv -v `pwd`/../guides/build/* `pwd`/snapshots/$VERSION
node tasks/update-versions

# NEEDS TO UPDATE _redirects