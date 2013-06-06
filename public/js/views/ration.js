define([
    'async',
    'mappers/foodstuff',
    'text!/templates/ration.tpl',
    'fullcalendar',
    'backbone',
], function(async, foodstuffMapper, rationTpl) {


    return Backbone.View.extend({
        el: $('#content'),
        initialize: function() {
            // container for others DOM elements
            this.dom = {};
        },
        events: {
        },
        render: function() {
            var view = this;

            var compiled = _.template(rationTpl, {});
            view.$el.html(compiled);

            var date = new Date();
            var d = date.getDate();
            var m = date.getMonth();
            var y = date.getFullYear();

            $('#ration-calendar').fullCalendar({
                header: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'basicDay,basicWeek,month'
                },
                editable: false,
                events: [
                    {
                        title: 'breakfast',
                        start: new Date(y, m, d)
                    },
                    {
                        title: "branch \n branch \n branch \n branch",
                        start: new Date(y, m, d)
                    },
                    {
                        title: 'lunch',
                        start: new Date(y, m, d)
                    },
                    {
                        title: 'dinner',
                        start: new Date(y, m, d)
                    },
                    {
                        title: 'late dinner',
                        start: new Date(y, m, d)
                    },
                ],
                dayClick: function() {
                    console.log('a day has been clicked!', arguments);
                }
            });
            $('#ration-calendar').fullCalendar('changeView', 'basicDay');
        }
    });
});