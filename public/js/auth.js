requirejs.config({
    //By default load any module IDs from js
    baseUrl: '/js',
    urlArgs: "bust=" + (new Date()).getTime(),
    paths: {
        jquery: [
            '//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min',
            'lib/jquery-1.9.1.min'
        ]
    }
});

// Start the main app logic.

require([
    'mappers/auth',
    'jquery'
], function (authMapper) {
    if (typeof(Storage) === 'undefined') {
        alert('Can not work further, local storage is not supported!!!');
    }

    $('form').on('submit', function (event) {
        event.preventDefault();


        var identity = $('input[name="identity"]').val();
        var credential = $('input[name="credential"]').val();


        authMapper.createSession(identity, credential, function (response) {
            if (response.RES_STATUS) {
                localStorage.session = JSON.stringify(response.RES_DATA.session);
                document.location.href = document.location.origin;
            } else {
                // user error
                alert(response.RES_ERROR_DESC);
            }
        });
    });
});
