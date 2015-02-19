var RSVP = require('rsvp');
var Swiftype = require('swiftype');

function PublishSearch(engine, apiKey){
  this.engine = engine;
  this.apiKey = apiKey;
  this.connection = new Swiftype({apiKey: apiKey});
}

PublishSearch.prototype = {
  createDocumentType: function(name){
    var connection = this.connection;
    var engine = this.engine;

    var documentType = {
      name: name
    };

    return new RSVP.Promise(function(resolve, reject){
      connection.documentTypes.create({
        engine: engine,
        document_type: documentType
      }, function(err, res){
        err ? reject(err) : resolve(res);
      });
    });
  },

  createDocuments: function(documentTypeName, documents, batchSize){
    var batchSize = batchSize || 10;

    var connection = this.connection;
    var engine = this.engine;

    return new RSVP.Promise(function(resolve, reject){
      connection.documents.batchCreate({
        engine: engine,
        documentType: documentTypeName,
      }, documents, batchSize, function(err, res){
        err ? reject(err) : resolve(res);
      });
    });
  },

  create: function(documentTypeName, documents){
    var _this = this;
    return this
      .createDocumentType(documentTypeName)
      .then(function(){
        return _this.createDocuments(documentTypeName, documents);
      });
  }
}

module.exports = PublishSearch;