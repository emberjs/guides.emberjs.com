var assert = require('assert');
var vcr = require('nock-vcr-recorder');
vcr.config({
  cassetteLibraryDir: './test/cassettes'
})

var PublishSearch = require('../../tasks/lib/publish-search');

describe("swiftype publishing", function(){

  it("creating a document type and its docuemnts", function(){
    var ps = new PublishSearch('ember', 'BdbeMzU6L8eiUAFgaxub');
    var documentA = {
      external_id: '1234',
      fields: [
        {name: "name", value: 'HI', type: "string"},
        {name: "description", value: 'HELLO', type: "text"},
      ]
    };

    var documentB = {
      external_id: '2345',
      fields: [
        {name: "name", value: 'BYE', type: "string"},
        {name: "description", value: 'GOODBYE', type: "text"},
      ]
    };

    var documents = [documentA, documentB];

    return vcr.useCassette('docuemnt-and-document-type-success', function() {
      return ps.create('a-new-document-type', documents)
        .then(function(resp){
          assert.equal(2, resp[0].length);
        })
        .catch(function(err){
          assert(false, "the catch then should not be called on success");
        });
    });
  });

  describe("creating docuemnts in a batch", function(){
    it("errors on failure", function(){
      var ps = new PublishSearch('ember', 'BdbeMzU6L8eiUAFgaxub');
      var documentA = {
        external_id: '1234',
        fields: [
          {name: "name", value: 'HI', type: "string"},
          {name: "description", value: 'HELLO', type: "text"},
        ]
      };

      var documentB = {
        external_id: '2345',
        fields: [
          {name: "name", value: 'BYE', type: "string"},
          {name: "description", value: 'GOODBYE', type: "text"},
        ]
      };

      var documents = [documentA, documentB];

      return vcr.useCassette('docuemnt-batch-creation-failure', function() {
        return ps.createDocuments('a-document-type-that-does-not-exist', documents)
          .then(function(a){
            assert(false, "the success then should not be called on error");
          })
          .catch(function(err){
            assert(err);
            assert(err.error, /Could not find DocumentType with ID/);
          });
      });
    });

    it("creates on success", function(){
      var ps = new PublishSearch('ember', 'BdbeMzU6L8eiUAFgaxub');

      var documentA = {
        external_id: '1234',
        fields: [
          {name: "name", value: 'HI', type: "string"},
          {name: "description", value: 'HELLO', type: "text"},
        ]
      };

      var documentB = {
        external_id: '2345',
        fields: [
          {name: "name", value: 'BYE', type: "string"},
          {name: "description", value: 'GOODBYE', type: "text"},
        ]
      };

      var documents = [documentA, documentB];

      return vcr.useCassette('docuemnt-batch-creation-success', function() {
        return ps.createDocuments('test-type1', documents, 1)
          .then(function(a){
            assert(a)
          })
          .catch(function(err){
            assert(false, "the catch then should not be called on success");
          });
      });
    });
  });

  describe("creating a docuemnt type", function(){
    it("errors on failures", function(){
      var ps = new PublishSearch('an-engine-that-does-not-exist', 'BdbeMzU6L8eiUAFgaxub');

      return vcr.useCassette('docuemnt-type-creation-failure', function() {
        return ps.createDocumentType('test-type1').catch(function(err){
          assert(err);
          assert(err.error, 'Parent not found. Could not find resource api');
        });
      });
    });

    it("responds on success", function(){
      var ps = new PublishSearch('ember', 'BdbeMzU6L8eiUAFgaxub');

      return vcr.useCassette('docuemnt-type-creation-success', function() {
        return ps.createDocumentType('test-type1').then(function(resp){
          assert(resp);
          assert(resp.name, 'test-type1');
        }).catch(function(err){
          assert(false, "the error catch should not be called on succes");
        });
      });
    });
  });
});
