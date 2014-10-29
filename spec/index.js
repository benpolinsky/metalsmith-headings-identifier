var path = require('path');
var expect = require('chai').expect;
var Metalsmith = require('metalsmith');
var equal = require('assert-dir-equal');

var headingsIdentifier = require('..');

describe('metalsmith-data-markdown', function() {
  it('preexisting ids should remain untouched', function(done) {
    Metalsmith('spec/fixture')
      .use(headingsIdentifier())
      .build(function(err) {
        if (err) return done(err);
        equal('spec/fixture/expected/headingWithID.html', 'spec/fixture/build/headingWithID.html');
        done();
      });
  });
  it('ids get auto appended', function(done) {
    Metalsmith('spec/fixture')
      .use(headingsIdentifier())
      .build(function(err) {
        if (err) return done(err);
        equal('spec/fixture/expected/headingWithoutID.html', 'spec/fixture/build/headingWithoutID.html');
        done();
      });
  });
  it('anchor template can be changed', function(done) {
    Metalsmith('spec/fixture')
      .use(headingsIdentifier({
        linkTemplate: '<a class="myCustomHeadingsAnchorClass" href="#%s"><span></span></a>'
      }))
      .build(function(err) {
        if (err) return done(err);
        equal('spec/fixture/expected/customTemplate.html', 'spec/fixture/build/customTemplate.html');
        done();
      });
  });
  it('allow metafield can be used specify key that disables auto headings', function(done) {
    Metalsmith('spec/fixture')
      .use(headingsIdentifier({
        allow: 'appendHeadingAuto'
      }))
      .build(function(err) {
        if (err) return done(err);
        equal('spec/fixture/expected/remainsUntouched.html', 'spec/fixture/build/remainsUntouched.html');
        done();
      });
  });
});