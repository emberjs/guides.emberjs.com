/*
  run with
  ```shell
  node tasks/update-versions.js
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

  versions = versions
    .sort(function(a, b) {
      var pa = a.slice(1).split('.');
      var pb = b.slice(1).split('.');
      for (var i = 0; i < 3; i++) {
          var na = Number(pa[i]);
          var nb = Number(pb[i]);
          if (na > nb) return 1;
          if (nb > na) return -1;
          if (!isNaN(na) && isNaN(nb)) return 1;
          if (isNaN(na) && !isNaN(nb)) return -1;
      }

      return 0;
    });
}

fs.writeFileSync('snapshots/versions.json', JSON.stringify(versions), { encoding: 'utf8' });

var currentRevision = versions[versions.length - 1];

var firebase = require('../firebase.json');
firebase['redirects'][0]['destination'] = '/' + currentRevision;
fs.writeFileSync('firebase.json', JSON.stringify(firebase, null, 2), { encoding: 'utf8' });

['common-modern.js', 'common-old-ie.js', 'common-all.js'].forEach(function(javascript) {
  var searchJsFile = path.join('snapshots/', currentRevision, '/javascripts/' + javascript);
  fs.readFile(searchJsFile, 'utf8', function(err, data) {
    var newJs = data.replace(/CURRENT_REVISION_WILL_APPEAR_HERE_WHEN_DEPLOYED/g, currentRevision);
    fs.writeFile(searchJsFile, newJs, 'utf8');
  });
});
