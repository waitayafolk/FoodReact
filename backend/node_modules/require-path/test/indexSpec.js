var path = require('path');
var join = path.join;
var fixturePath = join(__dirname, 'fixtures');
var expect = require('chai').expect;
var requirePath = require('../lib/index.js');

describe('index', function() {

  var options = {
    path: fixturePath,
    include: ['**/*.js', '**/*.json'],
    exclude: ['**/*Spec.js']
  };

  it('returns a promise that resolves to an object', function(done) {
    requirePath(options)
      .then(function(modules) {
        expect(modules).to.be.an('object');
      })
      .then(done)
      .catch(done);
  });

  it('maps files to their require()\'d module', function(done) {
    requirePath(options)
      .then(function(modules) {
        expect(modules['a.js']).to.equal(require('./fixtures/a.js'));
      })
      .then(done)
      .catch(done);
  });

  it('accepts an array of paths', function(done) {
    requirePath({
        path: [path.join(fixturePath, 'dir1'), path.join(fixturePath, 'dir2')],
        include: ['**/*.js', '**/*.json'],
        exclude: ['**/*Spec.js']
      })
      .then(function(modules) {
        expect(modules['innerA.js']).to.equal(require('./fixtures/dir1/innerA.js'));
        expect(modules['innerB.js']).to.equal(require('./fixtures/dir2/innerB.js'));
      })
      .then(done)
      .catch(done);
  });

  it('full integration test', function(done) {
    requirePath(options)
      .then(function(modules) {
        expect(modules['a.js']).to.equal(require('./fixtures/a.js'));
        expect(modules['aSpec.js']).to.be.undefined;
        expect(modules['b.json']).to.equal(require('./fixtures/b.json'));
        expect(modules['c.junk']).to.be.undefined;
        expect(modules['dir1/innerA.js']).to.equal(require('./fixtures/dir1/innerA.js'));
        expect(modules['dir2/innerB.js']).to.equal(require('./fixtures/dir2/innerB.js'));
      })
      .then(done)
      .catch(done);
  });

});
