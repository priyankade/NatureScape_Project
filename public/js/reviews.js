(function ($) {
    let reviewSubmitButton = $('#reviewSubmitButton');
    reviewSubmitButton.on('click', onclick_cb);

    function onclick_cb(event) {
        event.preventDefault();
        console.log('Clicked');

        let reviewRating = $('#reviewRating').val();
        let reviewText = $('#reviewText').val();
        let eventId = $('#eventId').val();
        let requestData = {
            "reviewRating": reviewRating,
            "reviewText": reviewText,
            "eventId": eventId
        };

        var requestConfig = {
            method: 'POST',
            url: '/addReview',
            data: requestData
        };

        $.ajax(requestConfig).then(function (responseMessage) {
            $('#addReviewResponse')[0].innerHTML = responseMessage;
        }).fail(function(responseMessage) {
            console.log('Failed');
            $('#addReviewResponse')[0].innerHTML = responseMessage.responseText;
        });
    }
})(window.jQuery);
