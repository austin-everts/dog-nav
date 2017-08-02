function getAllBreeds() {
    $.ajax({
        url: "https://dog.ceo/api/breeds/list/all",
        accepts: "*/*",
        dataType: "json",
        type: "POST",
        // contentType: "application/json",
        success: function (data, error) {
            gotAllBreeds(data);
        },
        error: function (data, error) {
            gotAllBreeds(data);
        }
    });
}

function gotAllBreeds(data) {
    log(data);

    for (key in data.message) {

        $('.all-breeds').append('<li><a class="get-dog-image ' + key + '" href="#all-breeds-' + key + '">' + key.toProperCase() + '</a></li>');

        $('.random').on('click', function () {
            $.ajax({
                url: "https://dog.ceo/api/breeds/image/random",
                accepts: "*/*",
                dataType: "json",
                type: "POST",
                // contentType: "application/json",
                success: function (data, error) {
                    log(data);
                    $('.content-wrapper').empty();
                    $('.content-wrapper').append('<img class="dog-image" src="' + data.message + '" />');
                },
                error: function (data, error) {
                    log(data);
                }
            });
        });
    }

    setGetDogClickEvent();
    setUpNav();
}

function setGetDogClickEvent() {
    $('.get-dog-image').unbind();
    $('.get-dog-image').on('click', function () {
        var breed = $(this).attr('href').replace("all-breeds-", "").replace("#", "");
        log(breed);

        $.ajax({
            url: "https://dog.ceo/api/breed/" + breed + "/images/random",
            accepts: "*/*",
            dataType: "json",
            type: "POST",
            // contentType: "application/json",
            success: function (data, error) {
                log(data);
                $('.content-wrapper').empty();
                $('.content-wrapper').append('<div class="dog-div"></div>');
                $('.dog-div').append('<img class="dog-image" src="' + data.message + '" />');
                $('.dog-div').append('<br /><div class="new-dog-btn"><a class="get-dog-image ' + breed + '" href="#' + breed + '">Get New ' + breed.toProperCase() + '</a></div>');
                setGetDogClickEvent();
            },
            error: function (data, error) {
                log(data);
            }
        });

    });
}
