/*global describe, before, it */
'use strict';
var path = require('path');
var yeoman = require('yeoman-generator');

describe('yui generator', function () {
    var TMP_DIR = path.join(__dirname, 'temp');
    var APP_DIR = path.join(__dirname, '../app');

    describe('yui:app', function () {
        before(function (done) {
            yeoman.test
                .run(APP_DIR)
                .inDir(TMP_DIR)
                .onEnd(done);
        });

        it('creates expected files', function () {
            yeoman.assert.file([
                'BUILD.md',
                'README.md',
                'Gruntfile.js',
                'bower.json',
                'package.json',
                '.editorconfig',
                '.gitignore',
                '.jshintrc',
                '.yeti.json'
            ]);
        });
    });
});
