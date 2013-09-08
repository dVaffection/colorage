define([
    // Using the Require.js text! plugin, we are loaded raw text
    // which will be used as our views primary template
    'text!/templates/top-menu.tpl',
    'backbone',
], function(template) {

    var navigation = [
        {
            label: 'Ration',
            hash: '',
            active: false
        },
        {
            label: 'Foodstuff DB',
            hash: 'foodstuff/',
            active: false
        }
    ];

    return Backbone.View.extend({
        el: $('#top-menu'),
        render: function(activeHash) {
            _.each(navigation, function(item) {
                item.active = item.hash == activeHash;
            });

            var compiledTemplate = _.template(template,
                {navigation: navigation});
            this.$el.html(compiledTemplate);
        }
    });
});
