/*global describe, afterEach, beforeEach, it*/
'use strict';

var path    = require('path');
var rimraf  = require('rimraf');
var helpers = require('yeoman-generator').test;

describe('yui generator', function () {
    beforeEach(function (done) {
        helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
            if (err) {
                return done(err);
            }

            this.app = helpers.createGenerator('yui:app', [
                '../../app'
            ]);
            done();
        }.bind(this));
    });

    afterEach(function (done) {
        rimraf(path.join(__dirname, 'temp'), done);
    });

    it('creates expected files', function (done) {
        var expected = [
            // add files you expect to exist here.
            '.jshintrc',
            '.editorconfig'
        ];

        helpers.mockPrompt(this.app, {
            'someOption': true
        });
        this.app.options['skip-install'] = true;
        this.app.run({}, function () {
            helpers.assertFiles(expected);
            done();
        });
    });
});
