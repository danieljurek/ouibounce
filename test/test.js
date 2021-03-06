var should = require('should'),
    Zombie = require('zombie'),
    path   = require('path');

var browser        = new Zombie();

describe('Performs basic OuiBounce functionality', function() {
  
  before(function(done) {
    loadPage.call(this, 'basic.html', done);
  });

  it('should be present', function() {
    should(this.window.ouiBounce).be.type('function');
  });

  it('should fire and drop cookie', function(done) {
    // save window context
    _this = this;

    // ensure cookies are blank
    should(_this.window.document.cookie).be.empty;
    should(_this.window.ouiBounceCounter).equal(0);

    // fire OuiBounce, ensure OuiBouce cookie was dropped
    browser
      .fire('html', 'mouseout')
      .then(function() {
        should(_this.window.document.cookie).eql('viewedOuibounceModal=true');
        should(_this.window.ouiBounceCounter).equal(1);
      })
      .then(done);
  });

  it('should only fire once', function(done) {
    // save window context
    _this = this;

    // ensure ouiBouce already fired
    should(_this.window.ouiBounceCounter).equal(1);

    // fire OuiBounce, ensure OuiBouce does NOT go off again
    browser
      .fire('html', 'mouseout')
      .then(function() {
        should(_this.window.ouiBounceCounter).equal(1);
      })
      .then(done);
  });
});


describe('Performs basic OuiBounce functionality', function() {
  
  before(function(done) {
    loadPage.call(this, 'aggressive.html', done);
  });

  it('should fire more than once', function(done) {
    // save window context
    _this = this;

    // ensure ouiBouce already fired
    should(_this.window.ouiBounceCounter).equal(1);

    // fire OuiBounce, ensure OuiBouce does NOT go off again
    browser
      .fire('html', 'mouseout')
      .then(function() {
        should(_this.window.ouiBounceCounter).equal(2);
      })
      .then(done);
  });
});


function loadPage(_path, done) {
  var _this = this,
      test_page_path = 'file://' + path.join(__dirname, 'fixtures', _path);

  browser
    .visit(test_page_path)
    .then(browser.wait.bind(browser)) //bind browser to wait bc it may be out of context
    .then(function() {
      _this.window = browser.document.window;
    })
    .then(done);
}
