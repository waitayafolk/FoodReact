var fs = require('fs');
var path = require('path');
var join = path.join;
var getAllFiles = require('../lib/getAllFiles');
var fixturePath = join(__dirname, 'fixtures');
var _ = require('highland');
var expect = require('chai').expect;

describe('getAllFiles', function () {

  var actual;

  beforeEach(function () {
    actual = getAllFiles(fixturePath);
  });

  it('returns a Highland stream', function (done) {
    expect(_.isStream(actual)).to.be.true;
    actual.done(done);
  });

  it('includes `a.js`', function (done) {
    var absoluteTargetFile = join(fixturePath, 'a.js');
    actual.filter(function (file) {
      return file === absoluteTargetFile;
    }).toArray(function (files) {
      expect(files.length).to.equal(1);
      done();
    });
  });

  it('all files are absolute', function(done) {
    actual.each(function(file) {
      expect(path.isAbsolute(file)).to.be.true;
    }).done(done);
  });

  it('all files are really files', function(done) {
    actual.each(function(file) {
      expect(fs.lstatSync(file).isFile()).to.be.true;
    }).done(done);
  });

  it('does not include directories', function (done) {
    // TODO this is redundant with the above test
    actual.each(function (file) {
      expect(fs.statSync(file).isDirectory()).to.be.false;
    }).done(done);
  });
});
