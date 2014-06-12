/*global describe, before, it */
'use strict';
var path = require('path');
var yeoman = require('yeoman-generator');

describe('yui generator', function () {
    var OUT_DIR = path.join(__dirname, 'output');
    var APP_DIR = path.join(__dirname, '../app');

    describe('yui:app', function () {
        before(function (done) {
            yeoman.test
                .run(APP_DIR)
                .inDir(OUT_DIR)
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
