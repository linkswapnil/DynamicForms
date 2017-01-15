(function () {
    'use strict';

    var idSelect = $("#id");
    var title = $("#titleSection");
    var body = $("#bodySection");
    var titleSelect = $("#title");
    var bodyText = $("#body");
    var serviceData = [];

    title.hide();
    body.hide();

    function getData() {
        var deferred = $.Deferred();
        $.ajax({
            "url": 'https://jsonplaceholder.typicode.com/posts'
        }).done(function (data) {
            deferred.resolve(data);
        }).fail(function () {
            deferred.reject('failed to get data');
        });
        return deferred.promise();
    };

    function populateData() {
        $.when(getData()).then(function (data) {
            serviceData = data;
        }, function handleFailure(res) {
            console.log(res);
        })
    }

    populateData();

})();
