(function ($) {
    let reviewSubmitButton = $('#reviewSubmitButton');
    reviewSubmitButton.on('click', onclick_cb);

    function onclick_cb(event) {
        event.preventDefault();
        console.log('Clicked');

        let reviewRating = $('#reviewRating').val();
        let reviewTitle = $('#reviewTitle').val();
        let reviewText = $('#reviewText').val();
        let eventId = $('#eventId').val();
        let requestData = {
            "reviewRating": reviewRating,
            "reviewTitle": reviewTitle,
            "reviewText": reviewText,
            "eventId": eventId
        };

        var requestConfig = {
            method: 'POST',
            url: '/addReview',
            data: requestData
        };

        $.ajax(requestConfig).then(function (responseMessage) {
            console.log("Response", responseMessage);
        });
    }
})(window.jQuery);
