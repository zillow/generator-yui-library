'use strict';
var yeoman = require('yeoman-generator');
var yosay = require('yosay');


var YuiGenerator = yeoman.generators.Base.extend({
    init: function () {
        this.pkg = require('../package.json');

        this.on('end', function () {
            if (!this.options['skip-install']) {
                this.installDependencies();
            }
        });
    },

    _defaultAuthor: function () {
        var name  = this.user.git.name,
            email = this.user.git.email,
            author = 'Rockstar Developer <rockstar@mycompany.com>';

        if (name) {
            author = name;
            if (email) {
                author += (' <' + email + '>');
            }
        }

        return author;
    },

    // mostly a copy of the getters in
    // https://github.com/yeoman/generator/blob/master/lib/actions/user.js
    _defaultGitConfig: function (query) {
        var key = process.cwd() + ':' + query,
            val = this.constructor.gitConfigCache[key];

        if (val) {
            return val;
        }

        if (this.shell.which('git')) {
            val = this.shell.exec('git config --get ' + query, { silent: true }).output.trim();
            this.constructor.gitConfigCache[key] = val;
        }

        return val;
    },

    askFor: function () {
        var done = this.async();
        var humanTitle = this._.compose(this._.titleize, this._.humanize);

        // Have Yeoman greet the user.
        this.log(yosay('Welcome to the marvelous YUI generator!'));

        var prompts = [
            {
                name: 'projectName',
                message: 'Project name',
                default: this._.slugify(this.appname),
                filter: this._.slugify
            },
            {
                name: 'projectTitle',
                message: 'Project title',
                default: function (answers) {
                    return humanTitle(answers.projectName);
                },
                filter: humanTitle
            },
            {
                name: 'projectAuthor',
                message: 'Project author',
                default: this._defaultAuthor.bind(this)
            },
            {
                name: 'projectDescription',
                message: 'Project description',
                default: 'The best YUI-based project ever.'
            },
            {
                name: 'projectRepository',
                message: 'Project repository URL',
                default: this._defaultGitConfig.bind(this, 'remote.origin.url')
            },
            {
                name: 'projectVersion',
                message: 'Project version',
                default: '0.0.0'
            },
            {
                name: 'buildDirectory',
                message: 'Build directory',
                default: 'build'
            },
            {
                type: 'confirm',
                name: 'cleanBuild',
                message: 'Version build directory?',
                default: true,
                filter: function (input) {
                    // inverts answer
                    return !input;
                }
            },
            {
                type: 'confirm',
                name: 'yuiRelease',
                message: 'Support YUI release tasks?',
                default: true
            },
            {
                name: 'copyrightOwner',
                message: 'Copyright owner',
                default: 'Yahoo! Inc.'
            },
            {
                name: 'yuiVersion',
                message: 'YUI version',
                default: '3.13.0'
            }
        ];

        this.prompt(prompts, function (props) {
            this.projectName = props.projectName;
            this.projectTitle = props.projectTitle;
            this.projectAuthor = props.projectAuthor;
            this.projectDescription = props.projectDescription;
            this.projectRepository = props.projectRepository;
            this.projectVersion = props.projectVersion;

            this.buildDirectory = props.buildDirectory;
            this.cleanBuild = props.cleanBuild;
            this.yuiRelease = props.yuiRelease;
            this.copyrightOwner = props.copyrightOwner;
            this.yuiVersion = props.yuiVersion;

            done();
        }.bind(this));
    },

    files: function () {
        this.mkdir('src');

        this.directory('.');
    }
}, {
    /**
    A cache of `git config` return values, shared by all instances.

    @attribute gitConfigCache
    @type {Object}
    @default {}
    @static
    **/
    gitConfigCache: {}
});

module.exports = YuiGenerator;
