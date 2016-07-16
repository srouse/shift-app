

module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-react');

    grunt.loadNpmTasks('cssmodeling');
    grunt.loadNpmTasks('protodata');
    grunt.loadNpmTasks('svgtocssicons');

    var configObj = {
        pkg: '<json:package.json>'
    };

    /*==========================
    CSSMODELING
    ==========================*/
    configObj.cssmodeling = configObj.cssmodeling || {};
    configObj.cssmodeling["cssmodeling_less"] = {
        files: {
            'dist/cssmodeling':
            [
                'cssmodeling/cssmodeling_shift_app.json'
            ]
        },
        options: {
            resets:[],
            type:"less",
            var_prefix:"v-"
        }
    };

    configObj.watch = configObj.watch || {};
    configObj.watch["cssmodeling"] = {
        files:[
            'cssmodeling/cssmodeling_shift_app.json'
        ],
        tasks: ["cssmodeling"]
    };

    configObj.concat = configObj.concat || {};
    configObj.concat["cssmodeling"] = {files:{}};
    configObj.concat["cssmodeling"]
        .files['dist/cssmodeling/core_all.css']
            = [
                'dist/cssmodeling/core.css',
                'node_modules/cssmodeling-col-12-quartered-viewport/dist/core.css',
                'node_modules/cssmodeling-rows-quartered/dist/core.css',
                'node_modules/cssmodeling-simple/dist/core.css',
                'node_modules/cssmodeling-flex/dist/core.css'
            ];

    configObj.concat["cssmodeling_mixins"] = {files:{}};
    configObj.concat["cssmodeling_mixins"]
        .files['dist/cssmodeling/core_mixins.less']
            = [
                'dist/cssmodeling/less/core_mixins.less',
                'node_modules/cssmodeling-col-12-quartered-viewport/dist/less/core_mixins.less',
                'node_modules/cssmodeling-rows-quartered/dist/less/core_mixins.less',
                'node_modules/cssmodeling-simple/dist/less/core_mixins.less',
                'node_modules/cssmodeling-flex/dist/less/core_mixins.less'
            ];

    configObj.concat["prototype_js"] = {files:{}};
    configObj.concat["prototype_js"]
        .files['dist/prototype/prototype.js']
            = [
                'node_modules/jquery/dist/jquery.min.js',
                'node_modules/react/dist/react.js',
                'node_modules/react-dom/dist/react-dom.js',
        		'node_modules/routestate/RouteState.js',
                'node_modules/moment/min/moment.min.js',
                'node_modules/classnames/index.js',

                'dist/prototype/prototype_jsx.js',
                'prototype/**/*.js'
            ];




    /*==========================
    Prototype ( REACT )
    ==========================*/
    configObj.react = configObj.react || {};
    configObj.react["prototype"] = {files:{}};
    configObj.react["prototype"]
        .files['dist/prototype/prototype_jsx.js']
            = 'prototype/**/*.jsx';

    configObj.watch = configObj.watch || {};
    configObj.watch["react_prototype"] = {
        files:[
            'prototype/**/*.jsx'
        ],
        tasks: ["react","concat:prototype_js"]
    };

    /*=============================
    COPY (push index into dist...make a compact portable whole)
    =============================*/
    configObj.copy = configObj.copy || {};
    configObj.copy["prototype"] = {files:[
        {
            dest: 'dist/prototype',
            cwd: "prototype/",
            src: "*.html",
            expand: true
        }
    ]};

    configObj.watch = configObj.watch || {};
    configObj.watch["copy_prototype"] = {
        files:[
            'prototype/**/*.html'
        ],
        tasks: ["copy"]
    };



    grunt.initConfig( configObj );
    grunt.registerTask( 'default' , [
        'cssmodeling','concat','react','copy'
    ] );

}
