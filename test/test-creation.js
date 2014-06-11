/*global describe, it */
'use strict';
var path = require('path');
var yeoman = require('yeoman-generator');

describe('yui generator', function () {
    var TMP_DIR = path.join(__dirname, 'temp');
    var APP_DIR = path.join(__dirname, '../app');

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

        yeoman.test.run(APP_DIR)
            .inDir(TMP_DIR)
            .onEnd(function () {
                yeoman.assert.file(expected);
                done();
            });
    });
});
