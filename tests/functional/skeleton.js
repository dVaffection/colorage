module.exports = function(api) {

    var clc = require('cli-color');
    var async = require('async');

    function Skeleton() {
        var tasksData;

        this.run = function(tasks) {
            // reset tasks data before run
            tasksData = {};

            if (tasks.constructor !== Array) {
                throw new Error('First argument must be an array');
            }

            tasks.forEach(function(task, index, array) {
                array[index] = function(callback) {
                    task = task(tasksData);
                    var cmd = task.cmd;
                    var params = task.params;

                    api.cmd(cmd, params, function(response, request) {
                        // save  intermediate result
                        tasksData[cmd] = {
                            request: request,
                            response: response,
                        };

                        if (!response.RES_STATUS) {
                            callback(response.RES_ERROR_DESC);
                        } else {
                            callback(null);
                        }
                    });
                };
            });

            var callback = function(err) {
                if (err) {
                    console.log(clc.bgRed(err));
                } else {
                    console.log(clc.bgGreen('Success!!!'));
                }

                // tests are done, exit
                process.exit();
            };

            async.series(tasks, callback);

            // make sure we exit by timeout if server didn't respond
            setTimeout(function() {
                console.log(clc.bgRed('Client manually disconnected by timeout after 1 sec'));
                process.exit(1);
            }, 1000);
        };
    }

    return new Skeleton();

}