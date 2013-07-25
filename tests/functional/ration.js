require('datejs');
var Faker = require('Faker');


module.exports = [
    function(tasksData) {
        return {
            cmd: 'FOODSTUFF:POST',
            params: {
                name: Faker.Lorem.words(1)[0],
                fat: Faker.random.number(100),
                carbohydrate: Faker.random.number(100),
                protein: Faker.random.number(100),
                per_gramm: 100,
            },
        };
    },
    function() {
        return {
            cmd: 'FOODSTUFF:GET_ALL',
        };
    },
    function(tasksData) {
        var foodstuffs = tasksData['FOODSTUFF:GET_ALL'].response.RES_DATA.items;
        if (!foodstuffs.length) {
            console.log('Can not process further, no foodstuff items!!!');
            process.exit();
        }
        var foodstuffId = foodstuffs[0]._id;

        return {
            cmd: 'RATION:POST',
            params: {
                date: new Date().toString('yyyy-MM-dd'),
                intake: {
                    foodstuff_id: foodstuffId,
                    mass: Faker.random.number(1000),
                },
            },
        };
    },
    function(tasksData) {
        var intakeId = tasksData['RATION:POST'].response.RES_DATA.item._id;
        var date = tasksData['RATION:POST'].request.REQ_PARAMS.date;

        var foodstuffId = tasksData['FOODSTUFF:GET_ALL'].response.RES_DATA.items[0]._id;

        return {
            cmd: 'RATION:PUT',
            params: {
                intake_id: intakeId,
                date: date,
                intake: {
                    foodstuff_id: foodstuffId,
                    mass: Faker.random.number(1000),
                },
            },
        };
    },
    function(tasksData) {
        var intakeId = tasksData['RATION:POST'].response.RES_DATA.item._id;
        var date = tasksData['RATION:POST'].request.REQ_PARAMS.date;

        return {
            cmd: 'RATION:GET',
            params: {
                intake_id: intakeId,
                date: date,
            },
        };
    },
    function(tasksData) {
        var sinceDate = tasksData['RATION:POST'].request.REQ_PARAMS.date;
        var untilDate = sinceDate;

        return {
            cmd: 'RATION:GET_ALL',
            params: {
                since_date: sinceDate,
                until_date: untilDate,
            },
        };
    },
    function(tasksData) {
        var id = tasksData['RATION:POST'].response.RES_DATA.item._id;
        var date = tasksData['RATION:POST'].request.REQ_PARAMS.date;

//        var id = '51b7b0d9926d2c5d6c000004';
//        var date = '2013-06-11';

        return {
            cmd: 'RATION:MOVE_UP',
            params: {
                intake_id: id,
                date: date,
            },
        };
    },
    function(tasksData) {
        var id = tasksData['RATION:POST'].response.RES_DATA.item._id;
        var date = tasksData['RATION:POST'].request.REQ_PARAMS.date;

//        var id = '51b7b0d9926d2c5d6c000004';
//        var date = '2013-06-11';

        return {
            cmd: 'RATION:MOVE_DOWN',
            params: {
                intake_id: id,
                date: date,
            },
        };
    },
    function(tasksData) {
        var intakeId = tasksData['RATION:POST'].response.RES_DATA.item._id;
        var date = tasksData['RATION:POST'].request.REQ_PARAMS.date;

        return {
            cmd: 'RATION:DELETE',
            params: {
                intake_id: intakeId,
                date: date,
            },
        };
    },
];
