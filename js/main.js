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
            data.forEach(function (record, index) {
                var optionId = document.createElement('option');
                optionId.setAttribute('key', index);
                optionId.value = record.id;
                optionId.text = record.id;
                idSelect.append($(optionId));

                var title = document.createElement('option');
                title.setAttribute('key', index);
                title.value = record.id;
                title.text = record.title;
                titleSelect.append($(title));
            });
        }, function handleFailure(res) {
            console.log(res);
        })
    }

    idSelect.on('change', function (evt) {
        var selectedOption = evt.target.options[evt.target.selectedIndex];
        var key = +selectedOption.getAttribute('key');
        if (+selectedOption.value % 2 === 0) {
            titleSelect.find("option[key=" + key + "]").attr('selected', true);
            bodyText.val(serviceData[key].body);
            title.show();
            body.show();
        } else {
            titleSelect.find("option[key=" + key + "]").attr('selected', true);
            title.show();
            body.hide();
        }
    });

    populateData();

})();
