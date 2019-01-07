module.exports = function (grunt) {

    var babel = require('rollup-plugin-babel');

    // Project configuration.
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        /*rollup: {
         options: {
         plugins: [
         babel({
         exclude: './node_modules/!**'
         })
         ]
         },
         files: {
         'dest/mykplus/KplusWebPlayer/js/kplus-player.js': ['src/mykplus/KplusWebPlayer/js/app.js']
         }
         },

         babel: {
         options: {
         sourceMap: true,
         presets: ['es2015']
         },
         dist: {
         files: {
         'dest/mykplus/KplusWebPlayer/js/kplus-player.js': 'src/mykplus/KplusWebPlayer/js/app.js'
         }
         }
         },*/

        browserify: {
            options: {
                browserifyOptions: {
                    debug: true
                },
                transform: [
                    ["babelify", {
                        presets: ["es2015"],
                    }]
                ]
            },
            main: {
                src: 'src/mykplus/KplusWebPlayer/js/app.js',
                dest: 'dest/ottservices/KplusWebPlayer/js/kplus-player.js'
            }
        },

        config: {
            dev: {
                options: {
                    variables: {
                        'apiSrvrBasePath': 'https://kplus-sch.stage.ott.irdeto.com/kplus/1.4/',
                        //'apiSrvrBasePath': 'https://kplus-sch.live.ott.irdeto.com/kplus/1.4/',
                        'shouldDisplayBuildNo': 'true',
                        'kplusOTThomePageUrl': 'https://webdev.kplus.vn/my-kplus/mykplus-introduction',
                        'myKplusURL': 'https://webdev.kplus.vn/mykplus/manage',
                        'FingerPrintApiPath': 'https://fpapista.kplus.vn/api/fp/isalive',
                        'fingerPrintSwitch': 'true',
                        'AuthToken': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI2NzdhMGZmMi1hOGZkLTRlZTUtODk0OC01OWE4ZDE1NzI2YjMiLCJpc3MiOiIyMDM3MzYyMTgxOCIsImlhdCI6MTU0MzQxMDM1NiwibmJyIjoxNTQzNDM5MTcyLCJleHAiOjE1NTM3NzgzNzIsImVtYWlsIjoiV2ViUGxheWVyQHZvZHdvcmtzLnZuIiwic3ViIjoiMWQ2ZjcyZmMwNTIzNDc0YmJlNTJlNDU4OGIzNDk2Y2UiLCJzdHAiOiI0OTI1ZDZjNjQwZjk0MGExOTdlY2IxYzU2MGNiY2U4ZSJ9.MFUTyO88nkW6Gs4HTDPFJ40SbpaB0uVRNoDDcFWqLJw',
                        'SubscriberId': '20373621805',
                        'displayDebugMsgs': 'true',
                        'programGuideUrl': 'https://epgstg-vt.kplus.vn/kplus/1.4/Content/programguidecdn',
                        //'programGuideUrl': 'https://epg-vt.kplus.vn/kplus/1.4/Content/ProgramGuideCDN',
                        'gAnalyticsid': 'UA-74192496-3'
                    }
                }
            },
            stage: {
                options: {
                    variables: {
                        'apiSrvrBasePath': 'https://kplus-sch.stage.ott.irdeto.com/kplus/1.4/',
                        'shouldDisplayBuildNo': 'true',
                        'kplusOTThomePageUrl': 'https://webstag.kplus.vn/my-kplus/mykplus-introduction',
                        'myKplusURL': 'https://webstag.kplus.vn/mykplus/manage',
                        'FingerPrintApiPath': 'https://fpapista.kplus.vn/api/fp/isalive',
                        'fingerPrintSwitch': 'true',
                        'AuthToken': '',
                        'SubscriberId': '',
                        'displayDebugMsgs': 'false',
                        'programGuideUrl': 'https://epgstg-vt.kplus.vn/kplus/1.4/Content/programguidecdn',
                        'gAnalyticsid': 'UA-74192496-3'
                    }
                }
            },
            prod: {
                options: {
                    variables: {
                        'apiSrvrBasePath': 'https://kplus-sch.live.ott.irdeto.com/kplus/1.4/',
                        'shouldDisplayBuildNo': 'false',
                        'kplusOTThomePageUrl': 'https://kplus.vn/my-kplus/mykplus-introduction',
                        'myKplusURL': 'https://kplus.vn/mykplus/manage',
                        'FingerPrintApiPath': 'https://fpapi.kplus.vn/api/fp/isalive',
                        'fingerPrintSwitch': 'true',
                        'AuthToken': '',
                        'SubscriberId': '',
                        'displayDebugMsgs': 'false',
                        'programGuideUrl': 'https://epg-vt.kplus.vn/kplus/1.4/Content/ProgramGuideCDN',
                        'gAnalyticsid': 'UA-67008028-2'
                    }
                }
            }
        },

        clean: {
            dest: ['dest/*'],
            custom: ['dest/ottservices/KplusWebPlayer/css/', 'dest/ottservices/KplusWebPlayer/js/'],
            kplusPlayerOfile: ['dest/ottservices/KplusWebPlayer/js/kplus-player-o.js']
        },

        copy: {
            srcToDest: {
                src: ['**'],
                dest: 'dest/ottservices',
                cwd: 'src/mykplus',
                expand: true
            },
            index:{
                src:['*.html'],
                dest :'dest/',
                cwd:'src/',
                expand:true
            },
            PlayerFolder: {
                src: ['**'],
                dest: 'dest/ottservices/KplusWebPlayer/Player/',
                cwd: 'src/mykplus/KplusWebPlayer/Player/',
                expand: true
            },
            
        },
        concat: {
            jsFiles: {
                src: ['src/mykplus/KplusWebPlayer/js/asmCrypto.js',
                    'src/mykplus/KplusWebPlayer/js/browserInfo.js',
                    'src/mykplus/KplusWebPlayer/js/ga.js',
                    'src/mykplus/KplusWebPlayer/js/uiblock.js',
                    'dest/ottservices/KplusWebPlayer/js/kplus-player.js'],
                dest: 'dest/ottservices/KplusWebPlayer/js/kplus-player.js'
            }
        },

        uglify: {
            my_target: {
                files: {
                    'dest/ottservices/KplusWebPlayer/js/kplus-player.js': ['dest/ottservices/KplusWebPlayer/js/kplus-player.js']
                }
            }
        },
        cssmin: {
            target: {
                files: [{
                    src: ['src/mykplus/KplusWebPlayer/css/main-kplus-player.css',
                        'src/mykplus/KplusWebPlayer/css/overlay-container-template.css',
                        'src/mykplus/KplusWebPlayer/css/top-menu.css',
                        'src/mykplus/KplusWebPlayer/css/top-bar-channel-logo.css',
                        'src/mykplus/KplusWebPlayer/css/info-template.css',
                        'src/mykplus/KplusWebPlayer/css/language-template.css',
                        'src/mykplus/KplusWebPlayer/css/quality-template.css',
                        'src/mykplus/KplusWebPlayer/css/next-button-slide-left-EPG.css',
                        'src/mykplus/KplusWebPlayer/css/video-controls.css',
                        'src/mykplus/KplusWebPlayer/css/channels-list-template.css',
                        'src/mykplus/KplusWebPlayer/css/startover-tpl.css'],
                    dest: 'dest/ottservices/KplusWebPlayer/css/kplus-player.css'

                }]
            }
        },
        usebanner: {
            attachKpBanner: {
                options: {
                    position: 'top' || 'bottom',
                    banner: '/* \n Author: <%= pkg.name %> \n Build Date:  <%= grunt.template.today("yyyy-mm-dd") %> \n Build Version: <%= pkg.version %> \n*/\n',
                    linebreak: true || false
                },
                files: {
                    src: ['dest/ottservices/KplusWebPlayer/css/kplus-player.css','dest/ottservices/KplusWebPlayer/js/kplus-player.js']
                }
            }
        },

        replace: {
            dev: {
                options: {
                    patterns: [
                        {
                            match: 'project-version-placeholder',
                            replacement: '<%= pkg.version %>'
                        },
                        {
                            match: 'should-display-buildNo',
                            replacement: '<%= grunt.config.get("shouldDisplayBuildNo")%>'
                        },
                        {
                            match: 'apiBasePath',
                            replacement: '<%= grunt.config.get("apiSrvrBasePath")%>'
                        },
                        {
                            match: 'gid',
                            replacement: '<%= grunt.config.get("gAnalyticsid")%>'
                        },
                        {
                            match: 'kplusOTThomePageUrl',
                            replacement: '<%= grunt.config.get("kplusOTThomePageUrl")%>'
                        },
                        {
                            match: 'myKplusURL',
                            replacement: '<%= grunt.config.get("myKplusURL")%>'
                        },
                        {
                            match: 'FingerPrintApiPath',
                            replacement: '<%= grunt.config.get("FingerPrintApiPath")%>'
                        },
                        {
                            match: 'AuthToken',
                            replacement: '<%= grunt.config.get("AuthToken")%>'
                        },
                        {
                            match: 'SubscriberId',
                            replacement: '<%= grunt.config.get("SubscriberId")%>'
                        },
                        {
                            match: 'fingerPrintSwitch',
                            replacement: '<%= grunt.config.get("fingerPrintSwitch")%>'
                        },
                        {
                            match: 'display-Debug-Msgs',
                            replacement: '<%= grunt.config.get("displayDebugMsgs")%>'
                        },
                        {
                            match: 'programGuideUrl',
                            replacement: '<%= grunt.config.get("programGuideUrl")%>'
                        }
                    ]
                },
                files: [
                    {src: ['dest/index.html'], dest: 'dest/index.html'},
                    {
                        src: ['dest/ottservices/KplusWebPlayer/js/kplus-player.js'],
                        dest: 'dest/ottservices/KplusWebPlayer/js/kplus-player.js'
                    },
                    {
                        src: ['dest/ottservices/KplusWebPlayer/template/overlay-container-tpl.html'],
                        dest: 'dest/ottservices/KplusWebPlayer/template/overlay-container-tpl.html'
                    }]
            },
            prod: {
                options: {
                    patterns: [
                        {
                            match: 'project-version-placeholder',
                            replacement: '<%= pkg.version %>'
                        },
                        {
                            match: 'should-display-buildNo',
                            replacement: '<%= grunt.config.get("shouldDisplayBuildNo")%>'
                        },
                        {
                            match: 'apiBasePath',
                            replacement: '<%= grunt.config.get("apiSrvrBasePath")%>'
                        },
                        {
                            match: 'gid',
                            replacement: '<%= grunt.config.get("gAnalyticsid")%>'
                        },
                        {
                            match: 'kplusOTThomePageUrl',
                            replacement: '<%= grunt.config.get("kplusOTThomePageUrl")%>'
                        },
                        {
                            match: 'myKplusURL',
                            replacement: '<%= grunt.config.get("myKplusURL")%>'
                        },
                        {
                            match: 'FingerPrintApiPath',
                            replacement: '<%= grunt.config.get("FingerPrintApiPath")%>'
                        },
                        {
                            match: 'AuthToken',
                            replacement: '<%= grunt.config.get("AuthToken")%>'
                        },
                        {
                            match: 'SubscriberId',
                            replacement: '<%= grunt.config.get("SubscriberId")%>'
                        },
                        {
                            match: 'fingerPrintSwitch',
                            replacement: '<%= grunt.config.get("fingerPrintSwitch")%>'
                        },
                        {
                            match: 'programGuideUrl',
                            replacement: '<%= grunt.config.get("programGuideUrl")%>'
                        }
                    ]
                },
                files: [
                    {src: ['dest/index.html'], dest: 'dest/index.html'},
                    {
                        src: ['dest/ottservices/KplusWebPlayer/js/kplus-player.js'],
                        dest: 'dest/ottservices/KplusWebPlayer/js/kplus-player.js'
                    },
                    {
                        src: ['dest/ottservices/KplusWebPlayer/template/overlay-container-tpl.html'],
                        dest: 'dest/ottservices/KplusWebPlayer/template/overlay-container-tpl.html'
                    }]
            }
        },

        jsObfuscate: {
            test: {
                options: {
                    concurrency: 2,
                    keepLinefeeds: false,
                    keepIndentations: false,
                    encodeStrings: true,
                    encodeNumbers: true,
                    moveStrings: true,
                    replaceNames: true,
                    variableExclusions: ['^_get_', '^_set_', '^_mtd_']
                },
                files: {
                    'dest/ottservices/KplusWebPlayer/js/kplus-player-o.js': [
                        'dest/ottservices/KplusWebPlayer/js/kplus-player.js'
                    ]
                }
            }
        }

    });


    // Load grunt copy plugin
    grunt.loadNpmTasks('grunt-contrib-clean');

    // Load grunt copy plugin
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Loading grunt concat plugin
    grunt.loadNpmTasks('grunt-contrib-concat');

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Load the plugin that provides the "minify CSS" task.
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    // Load grunt banner plugin
    grunt.loadNpmTasks('grunt-banner');

    // Load grunt replace plugin
    grunt.loadNpmTasks('grunt-replace');

    grunt.loadNpmTasks('grunt-config');

    grunt.loadNpmTasks('grunt-browserify');

    /*grunt.loadNpmTasks('grunt-babel');

     grunt.loadNpmTasks('grunt-rollup');*/

    grunt.loadNpmTasks('js-obfuscator');

    // grunt.registerTask('custom', ['clean:custom', 'copy:PlayerFolder', 'cssmin', 'uglify','usebanner:attachKpBanner']);

    grunt.registerTask('dev', 'dev build', function () {
        grunt.task.run('config:dev', 'clean:dest', 'copy:srcToDest','copy:index', 'clean:custom', 'browserify', 'replace:dev'/*, 'uglify'*/, /*'jsObfuscate:test',*/  /*'concat:jsFiles',*/ 'cssmin', 'usebanner:attachKpBanner', 'clean:kplusPlayerOfile');
    });

    /*grunt.registerTask('stage', 'stage build', function () {
     grunt.task.run('config:stage', 'clean:dest', 'copy:srcToDest', 'clean:custom', 'babel', 'cssmin', 'uglify','usebanner:attachKpBanner', 'replace:dev');
     });*/

    grunt.registerTask('stage', 'stage build', function () {
        grunt.task.run('config:stage', 'clean:dest', 'copy:srcToDest', 'copy:index','clean:custom', 'browserify', 'replace:dev', 'uglify', /*'jsObfuscate:test',*/ /*'concat:jsFiles',*/ 'cssmin', 'usebanner:attachKpBanner', 'clean:kplusPlayerOfile');
    });

    /*grunt.registerTask('prod', 'production build', function () {
     grunt.task.run('config:prod', 'clean:dest', 'copy:srcToDest', 'clean:custom', 'babel', 'cssmin', 'uglify', 'usebanner:attachKpBanner', 'replace:prod');
     });*/

    grunt.registerTask('prod', 'production build', function () {
        grunt.task.run('config:prod', 'clean:dest', 'copy:srcToDest','copy:index', 'clean:custom', 'browserify', 'replace:dev', 'uglify', /*'jsObfuscate:test',*/ /*'concat:jsFiles',*/ 'cssmin', 'usebanner:attachKpBanner', 'clean:kplusPlayerOfile');
    });

};