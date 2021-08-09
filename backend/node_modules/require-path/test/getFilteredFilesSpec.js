var fs = require('fs');
var path = require('path');
var join = path.join;
var fixturePath = join(__dirname, 'fixtures');
var _ = require('highland');
var expect = require('chai').expect;
var getFilteredFiles = require('../lib/getFilteredFiles.js');

describe('getFilteredFiles', function() {

  var JS_FILE_COUNT = 4;

  it('returns a Highland stream', function(done) {
    var actual = getFilteredFiles(testOptions({}));
    expect(_.isStream(actual)).to.be.true;
    actual.done(done);
  });

  describe('the `include` option', function() {


    it('includes files that match', function(done) {
      var actual = getFilteredFiles(testOptions({
        include: ['**/*.js']
      }));
      actual.filter(function(file) {
        return endsWith(file, '.js');
      }).toArray(function(files) {
        expect(files.length).to.equal(JS_FILE_COUNT);
        done();
      });
    });

    it('excludes files that do not match', function(done) {
      var actual = getFilteredFiles(testOptions({
        include: ['**/*.js']
      }));
      actual.filter(function(file) {
        return endsWith(file, '.junk');
      }).toArray(function(files) {
        expect(files.length).to.equal(0);
        done();
      });
    });

    it('accepts a single string', function(done) {
      var actual = getFilteredFiles(testOptions({
        include: '**/*.js'
      }));
      actual.filter(function(file) {
        return endsWith(file, '.js');
      }).toArray(function(files) {
        expect(files.length).to.equal(JS_FILE_COUNT);
        done();
      });
    });

  });

  describe('the `exclude` option', function() {

    it('excludes files listed', function(done) {
      var actual = getFilteredFiles(testOptions({
        include: ['**/*.js'],
        exclude: ['**/*Spec.js']
      }));
      actual.filter(function(file) {
        return endsWith(file, 'Spec.js');
      }).toArray(function(files) {
        expect(files.length).to.equal(0);
        done();
      });
    });

    it('accepts a single string', function(done) {
      var actual = getFilteredFiles(testOptions({
        include: ['**/*.js'],
        exclude: '**/*Spec.js'
      }));
      actual.filter(function(file) {
        return endsWith(file, 'Spec.js');
      }).toArray(function(files) {
        expect(files.length).to.equal(0);
        done();
      });
    });
  });

  it('uses the options.path as the root for inclusions and rejections', function(done) {
    var actual = getFilteredFiles(testOptions({
      include: ['dir1/innerA.js']
    }));
    actual.filter(function(file) {
      return endsWith(file, 'dir1/innerA.js');
    }).toArray(function(files) {
      expect(files.length).to.equal(1);
      done();
    });
  });

  it('all files are absolute', function(done) {
    var actual = getFilteredFiles(testOptions({
      include: ['**/*.js']
    }));
    actual.each(function(file) {
      expect(path.isAbsolute(file)).to.be.true;
    }).done(done);
  });

  it('all files are really files', function(done) {
    var actual = getFilteredFiles(testOptions({
      include: ['**/*.js']
    }));
    actual.each(function(file) {
      expect(fs.lstatSync(file).isFile()).to.be.true;
    }).done(done);
  });

  function testOptions(options) {
    // provide sensible default options that make sense for these tests
    options.path = options.path || fixturePath;
    return options;
  }

  function endsWith(str, text) {
    if (text.length > str.length) {
      return false;
    }
    return str.indexOf(text) === (str.length - text.length);
  }
});
