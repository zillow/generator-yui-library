'use strict';
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

var recastYUI = require('recast-yui');

var ModuleGenerator = yeoman.generators.Base.extend({
    constructor: function () {
        yeoman.generators.Base.apply(this, arguments);

        this.argument('name', {
            desc: 'Module name',
            required: false // unlike NamedBase
        });

        this.option('file', {
            desc: 'Path to existing file to import into shifter pattern.',
            type: path,
            required: false
        });

        this._prompts = [];
    },

    init: function () {
        var done = this.async();
        var options = this.options;

        if (options.file) {
            return recastYUI(options.file, this, done);
        } else {
            this.moduleBody = '/* CODE */';
        }

        if (this.name) {
            this.moduleName = this._.slugify(this._.humanize(this.name));
        }

        done();
    },

    configure: function () {
        var prompts = this._prompts;
        var humanTitle = this._.compose(this._.titleize, this._.humanize);
        var initModuleNamed = this.moduleName;

        prompts.push({
            name: 'moduleName',
            message: 'Module name',
            filter: this._.slugify,
            validate: function (input) {
                return !!input;
            },
            when: function () {
                return !initModuleNamed;
            }
        });
        prompts.push({
            name: 'moduleTitle',
            message: 'Module title',
            default: function (answers) {
                return humanTitle(answers.moduleName || initModuleNamed);
            },
            filter: humanTitle
        });
        prompts.push({
            name: 'moduleType',
            message: 'Module type',
            type: 'list',
            choices: ['JS', 'CSS', 'Widget'],
            default: 0,
            filter: function (val) {
                return String(val).toLowerCase();
            }
        });
        prompts.push({
            name: 'moduleAuthor',
            message: 'Module author',
            default: this.user.git.name
        });
        prompts.push({
            name: 'moduleDescription',
            message: 'Module description',
            default: 'The best YUI module ever.'
        });
    },

    ask: function () {
        var done = this.async();

        this.log(yosay('Creating a YUI module...'));

        this.prompt(this._prompts, function (answers) {
            for (var name in answers) {
                this[name] = answers[name];
            }

            done();
        }.bind(this));
    },

    files: function () {
        var moduleName = this.moduleName,

            build = {
                name: moduleName,
                builds: {}
            },
            modBuilds = build.builds[moduleName] = {},

            meta = {},
            modMeta = meta[moduleName] = this.moduleMeta && JSON.parse(this.moduleMeta) || {};

        this.destinationRoot(path.join('src', moduleName));

        this.copy('HISTORY.md');
        this.copy('README.md');
        this.copy('docs/component.json');
        this.copy('docs/index.mustache');

        if (this.moduleType === 'css') {
            modMeta.type = 'css';
            modBuilds.cssfiles = [
                'css/' + moduleName + '.css'
            ];

            this.template('css/mod.css', 'css/<%= moduleName %>.css');
        } else {
            modBuilds.jsfiles = [
                 'js/' + moduleName + '.js'
            ];

            this.template('js/mod.js', 'js/<%= moduleName %>.js');

            this.template('tests/unit/mod.html',            'tests/unit/<%= moduleName %>.html');
            this.template('tests/unit/assets/mod-test.js',  'tests/unit/assets/<%= moduleName %>-test.js');

            if (this.moduleType === 'widget') {
                modMeta.requires = ['widget'];
                modMeta.skinnable = true;

                this.template('assets/mod/mod-core.css',              'assets/<%= moduleName %>/<%= moduleName %>-core.css');
                this.template('assets/mod/skins/sam/mod-skin.css',    'assets/<%= moduleName %>/skins/sam/<%= moduleName %>-skin.css');
                this.template('assets/mod/skins/night/mod-skin.css',  'assets/<%= moduleName %>/skins/night/<%= moduleName %>-skin.css');
            } else {
                modMeta.requires = modMeta.requires && modMeta.requires.length ? modMeta.requires : ['yui-base'];
            }
        }

        this.dest.write('build.json', JSON.stringify(build, null, 4) + '\n');
        this.dest.write('meta/' + moduleName + '.json', JSON.stringify(meta, null, 4) + '\n');
    }
});

module.exports = ModuleGenerator;
