require('datejs');
var api = require('./api')('http://colorage.dev/colorage', {debug: true});
var skeleton = require('./skeleton')(api);


var tasks = [
    function(tasksData) {
        return {
            cmd: 'RATION:POST',
            params: {
                date: new Date().toString('yyyy-MM-dd'),
                intake: {
                    foodstuff_id: '51ad122ca5884d4570000002',
                    mass: 230,
                },
            },
        };
    },
//    function(tasksData) {
//        return {
//            cmd: 'RATION:GET_ALL',
//            params: {
//                date: new Date().toString('yyyy-MM-dd'),
//            }
//        };
//    },
];

skeleton.run(tasks);
