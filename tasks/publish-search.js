/*
  run with
  ```shell
  npm deploy:search --revision <rev>
                    --environment <staging|production>
                    --api-key <API_KEY>
                    --engine <engine name>
  # e.g.
  npm deploy:search --revision v1.1.1 --environment staging --api-key SUPERSECRETBROCOMMON
  ```
*/
var fs = require('fs');
var path = require('path');
var nopt = require('nopt');
var Swiftype = require('swiftype');
var possibleOptions = {
  "revision" : String,
  "environment" : [null, 'staging', 'production'],
  "api-key" : String,
  "engine" : String,
}


var divshotConfig = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'firebase.json'), 'utf-8'));
var siteRoot = divshotConfig.public;

var options = nopt(possibleOptions, process.argv);
options.environment = options.environment || 'staging';
options.engine = options.engine || 'emberapi';

if (!options.revision || !options['api-key']) {
  throw new Error("publish-search requires both --api-key and --revision arguments");
}

var PublishSearch = require('./lib/publish-search');

// engine is eithe the passed engine
// or if one is not passed, we use 'emberapi'
// once we have two envs, we'll also switch on
// environment.
var engine = options.engine || 'emberapi';

// swiftype really doesn't like dots.
var documentType = 'guides-' + options.revision.replace(/\./g,'-');
var searchJSONfile = path.join(__dirname, '..', siteRoot, options.revision, 'search.json');

var documents = JSON.parse(fs.readFileSync(searchJSONfile, 'utf-8')).documents;

new PublishSearch(engine, options['api-key'])
  .create(documentType, documents)
  .then(function(res){
    console.log(documents.length + " documents added to the search for Ember.js guides for " + options.revision);
  })
  .catch(function(err){
    console.error(err);
    process.exit(1);
  });
