'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var YuiGenerator = module.exports = function YuiGenerator(args, options) {
    yeoman.generators.Base.apply(this, arguments);

    this.on('end', function () {
        this.installDependencies({ skipInstall: options['skip-install'] });
    });

    this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(YuiGenerator, yeoman.generators.Base);

YuiGenerator.prototype.askFor = function askFor() {
    var cb = this.async();

    // have Yeoman greet the user.
    console.log(this.yeoman);

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
            name: 'projectDescription',
            message: 'Project description',
            default: 'The best YUI-based project ever.'
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
        this.projectDescription = props.projectDescription;

        this.cleanBuild = props.cleanBuild;
        this.yuiRelease = props.yuiRelease;
        this.copyrightOwner = props.copyrightOwner;
        this.yuiVersion = props.yuiVersion;

        cb();
    }.bind(this));
};

YuiGenerator.prototype.app = function app() {
    this.mkdir('src');

    this.copy('_package.json', 'package.json');
    this.copy('_bower.json', 'bower.json');

    this.template('_BUILD.md', 'BUILD.md');
    this.template('_README.md', 'README.md');
    this.template('_Gruntfile.js', 'Gruntfile.js');
};

YuiGenerator.prototype.projectfiles = function projectfiles() {
    this.copy('editorconfig', '.editorconfig');
    this.copy('gitignore', '.gitignore');
    this.copy('jshintrc', '.jshintrc');
    this.copy('yeti.json', '.yeti.json');
};
