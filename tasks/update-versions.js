/*
  run with
  ```shell
  node tasks/lib/update-versions.js
  ```
*/
var fs = require('fs');
var path = require('path');
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

var currentRevision = versions[versions.length - 1];

var divshot = require('../divshot.json');
divshot['redirects']['/']['url'] = '/' + currentRevision;
fs.writeFileSync('divshot.json', JSON.stringify(divshot, null, 2), { encoding: 'utf8' });

['common-modern.js', 'common-old-ie.js', 'common-all.js'].forEach(function(javascript) {
  var searchJsFile = path.join('snapshots/', currentRevision, '/javascripts/' + javascript);
  fs.readFile(searchJsFile, 'utf8', function(err, data) {
    var newJs = data.replace(/CURRENT_REVISION_WILL_APPEAR_HERE_WHEN_DEPLOYED/g, currentRevision);
    fs.writeFile(searchJsFile, newJs, 'utf8');
  });
});
