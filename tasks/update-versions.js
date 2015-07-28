/*
  run with
  ```shell
  node tasks/lib/update-versions.js
  ```
*/
var fs = require('fs');
var entries = fs.readdirSync('snapshots');
var versions = [];

for (var index = 0, length = entries.length; index < length; index++) {
  var entry = entries[index];
  var stat = fs.statSync('snapshots/' + entry);

  if (stat.isDirectory()) {
    versions.push(entry);
  }
}

fs.writeFileSync('snapshots/versions.json', JSON.stringify(versions), { encoding: 'utf8' });

var divshot = require('../divshot.json');
divshot['redirects']['/']['url'] = '/' + versions[versions.length - 1];
fs.writeFileSync('divshot.json', JSON.stringify(divshot, null, 2), { encoding: 'utf8' });
