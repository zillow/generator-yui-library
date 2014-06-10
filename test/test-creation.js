/*global describe, beforeEach, it */
'use strict';
var path = require('path');
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

    it('creates expected files', function (done) {
        var expected = [
            'BUILD.md',
            'README.md',
            'Gruntfile.js',
            '.editorconfig',
            '.gitignore',
            '.jshintrc',
            '.yeti.json'
        ];

        helpers.mockPrompt(this.app, {
            'projectTitle': 'Foo',
            'projectDescription': 'Foo stuff',
            'cleanBuild': false,
            'yuiRelease': true,
            'copyrightOwner': 'Bar'
        });
        this.app.options['skip-install'] = true;
        this.app.run({}, function () {
            helpers.assertFile(expected);
            done();
        });
    });
});
