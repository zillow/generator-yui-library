/*global describe, before, it */
'use strict';
var fs = require('fs');
var path = require('path');
var yeoman = require('yeoman-generator');

describe('yui generator', function () {
    var OUT_DIR = path.join(__dirname, 'output');
    var APP_DIR = path.join(__dirname, '../app');
    var MOD_DIR = path.join(__dirname, '../module');

    describe('project', function () {
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

    describe('css module', function () {
        before(function (done) {
            yeoman.test
                .run(MOD_DIR)
                .inDir(OUT_DIR)
                .withPrompt({
                    moduleName: 'foo',
                    moduleTitle: 'Foo',
                    moduleType: 'css'
                })
                .onEnd(done);
        });

        it('creates expected files', function () {
            yeoman.assert.file([
                'build.json',
                'docs/component.json',
                'docs/index.mustache',
                'HISTORY.md',
                'css/foo.css',
                'meta/foo.json',
                'README.md'
            ]);
        });
    });

    describe('js module', function () {
        before(function (done) {
            yeoman.test
                .run(MOD_DIR)
                .inDir(OUT_DIR)
                .withPrompt({
                    moduleName: 'bar',
                    moduleTitle: 'Bar',
                    moduleType: 'js'
                })
                .onEnd(done);
        });

        it('creates expected files', function () {
            yeoman.assert.file([
                'build.json',
                'docs/component.json',
                'docs/index.mustache',
                'HISTORY.md',
                'js/bar.js',
                'meta/bar.json',
                'README.md',
                'tests/unit/assets/bar-test.js',
                'tests/unit/bar.html'
            ]);
        });
    });

    describe('widget module', function () {
        before(function (done) {
            yeoman.test
                .run(MOD_DIR)
                .inDir(OUT_DIR)
                .withPrompt({
                    moduleName: 'qux',
                    moduleTitle: 'Qux',
                    moduleType: 'widget'
                })
                .onEnd(done);
        });

        it('creates expected files', function () {
            yeoman.assert.file([
                'assets/qux/qux-core.css',
                'assets/qux/skins/night/qux-skin.css',
                'assets/qux/skins/sam/qux-skin.css',
                'build.json',
                'docs/component.json',
                'docs/index.mustache',
                'HISTORY.md',
                'js/qux.js',
                'meta/qux.json',
                'README.md',
                'tests/unit/assets/qux-test.js',
                'tests/unit/qux.html'
            ]);
        });
    });

    describe('imported module', function () {
        before(function (done) {
            yeoman.test
                .run(MOD_DIR)
                .inDir(OUT_DIR)
                .withOptions({
                    'import': path.join(__dirname, 'fixtures/module/existing.js')
                })
                .withPrompt({
                    moduleName: 'existing',
                    moduleTitle: 'Existing',
                    moduleType: 'js'
                })
                .onEnd(done);
        });

        it('creates expected files', function () {
            yeoman.assert.file([
                'build.json',
                'docs/component.json',
                'docs/index.mustache',
                'HISTORY.md',
                'js/existing.js',
                'meta/existing.json',
                'README.md',
                'tests/unit/assets/existing-test.js',
                'tests/unit/existing.html'
            ]);
        });

        it('matches expected JS output', function () {
            var existingCode = fs.readFileSync(path.join(__dirname, 'fixtures/module/existing-code.js'));
            yeoman.assert.fileContent('js/existing.js', new RegExp(escapeRegExp(existingCode), 'm'));
        });

        it('matches expected JSON output', function () {
            var existingMeta = fs.readFileSync(path.join(__dirname, 'fixtures/module/existing-meta.json'));
            yeoman.assert.fileContent('meta/existing.json', new RegExp(escapeRegExp(existingMeta), 'm'));
        });
    });
});

// escape a string for use in RegExp constructor
// http://stackoverflow.com/a/3561711/5707
function escapeRegExp(s) {
    return String(s).replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}
