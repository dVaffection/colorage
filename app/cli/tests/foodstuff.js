require('datejs');
var api = require('./api')('http://colorage.dev/colorage', {}, true);
var skeleton = require('./skeleton')(api);
var Faker = require('Faker');


var tasks = [
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
    function(tasksData) {
        var id = tasksData['FOODSTUFF:POST'].response.RES_DATA.item._id;

        return {
            cmd: 'FOODSTUFF:PUT',
            params: {
                id: id,
                name: Faker.Lorem.words(1)[0],
                fat: Faker.random.number(100),
                carbohydrate: Faker.random.number(100),
                protein: Faker.random.number(100),
                per_gramm: Faker.random.number(100),
            },
        };
    },
    function(tasksData) {
        var id = tasksData['FOODSTUFF:POST'].response.RES_DATA.item._id;

        return {
            cmd: 'FOODSTUFF:GET',
            params: {
                id: id,
            },
        };
    },
    function(tasksData) {
        return {
            cmd: 'FOODSTUFF:GET_ALL',
        };
    },
    function(tasksData) {
        var name = tasksData['FOODSTUFF:POST'].response.RES_DATA.item.name;
        var q = name.substring(0, 3);

        return {
            cmd: 'FOODSTUFF:SEARCH',
            params: {
                q: q,
            },
        };
    },
    function(tasksData) {
        var id = tasksData['FOODSTUFF:POST'].response.RES_DATA.item._id;

        return {
            cmd: 'FOODSTUFF:DELETE',
            params: {
                id: id,
            },
        };
    },
];

skeleton.run(tasks);
