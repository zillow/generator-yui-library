'use strict';
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
// var chalk = require('chalk');


var YuiGenerator = yeoman.generators.Base.extend({
    init: function () {
        this.pkg = require('../package.json');

        this.on('end', function () {
            if (!this.options['skip-install']) {
                this.installDependencies();
            }
        });
    },

    askFor: function () {
        var done = this.async();
        var git = this.user.git;

        // Have Yeoman greet the user.
        this.log(yosay('Welcome to the marvelous YUI generator!'));

        var prompts = [
            {
                name: 'projectName',
                message: 'Project name',
                default: path.basename(process.cwd())
            },
            {
                name: 'projectTitle',
                message: 'Project title (if different)',
                default: function (props) {
                    return props.projectName;
                }
            },
            {
                name: 'projectAuthor',
                message: 'Project author',
                default: function () {
                    var name  = git.name,
                        email = git.email,
                        author = 'Rockstar Developer <rockstar@mycompany.com>';
                    if (name) {
                        author = name;
                        if (email) {
                            author += (' <' + email + '>');
                        }
                    }
                    return author;
                }
            },
            {
                name: 'projectDescription',
                message: 'Project description',
                default: 'The best YUI-based project ever.'
            },
            {
                name: 'projectRepository',
                message: 'Project repository URL',
                default: ''
            },
            {
                name: 'projectVersion',
                message: 'Project version',
                default: '0.0.0'
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

            this.cleanBuild = props.cleanBuild;
            this.yuiRelease = props.yuiRelease;
            this.copyrightOwner = props.copyrightOwner;
            this.yuiVersion = props.yuiVersion;

            done();
        }.bind(this));
    },

    app: function () {
        this.mkdir('src');

        this.template('_package.json', 'package.json');
        this.template('_bower.json', 'bower.json');

        this.template('_BUILD.md', 'BUILD.md');
        this.template('_README.md', 'README.md');
        this.template('_Gruntfile.js', 'Gruntfile.js');
    },

    projectfiles: function () {
        this.copy('editorconfig', '.editorconfig');
        this.copy('gitignore', '.gitignore');
        this.copy('jshintrc', '.jshintrc');
        this.copy('yeti.json', '.yeti.json');
    }
});

module.exports = YuiGenerator;
