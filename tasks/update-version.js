/*
  run with
  ```shell
  node tasks/update-version.js v2.11.0
  ```
*/
var fs = require('fs');
var path = require('path');

var currentRevision = process.argv[2];
console.log("Updating " + currentRevision + " js version numbers");

['common-modern.js', 'common-old-ie.js', 'common-all.js'].forEach(function(javascript) {
  var searchJsFile = path.join('snapshots/', currentRevision, '/javascripts/' + javascript);
  fs.readFile(searchJsFile, 'utf8', function(err, data) {
    var newJs = data.replace(/CURRENT_REVISION_WILL_APPEAR_HERE_WHEN_DEPLOYED/g, currentRevision);
    fs.writeFile(searchJsFile, newJs, 'utf8');
  });
});
