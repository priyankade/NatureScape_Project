$(document).ready(function () {
    $("#locationFilter").on("keyup", function () {
        let value = $(this).val().toLowerCase();
        $("#eventTable tbody tr").filter(function () {
            let show = $($(this).children()[0]).text().toLowerCase().indexOf(value) > -1;
            $(this).toggle(show);
        });
    });

    $("#cityFilter").on("keyup", function () {
        let value = $(this).val().toLowerCase();
        $("#eventTable tbody tr").filter(function () {
            let show = $($(this).children()[1]).text().toLowerCase().indexOf(value) > -1;
            $(this).toggle(show);
        });
    });

    $("#stateFilter").on("keyup", function () {
        let value = $(this).val().toLowerCase();
        $("#eventTable tbody tr").filter(function () {
            let show = $($(this).children()[2]).text().toLowerCase().indexOf(value) > -1;
            $(this).toggle(show);
        });
    });

    $("#dateFilter").on("keyup", function () {
        let value = $(this).val().toLowerCase();
        $("#eventTable tbody tr").filter(function () {
            let show = $($(this).children()[3]).text().toLowerCase().indexOf(value) > -1;
            $(this).toggle(show);
        });
    });

    $("#organizerFilter").on("keyup", function () {
        let value = $(this).val().toLowerCase();
        $("#eventTable tbody tr").filter(function () {
            let show = $($(this).children()[4]).text().toLowerCase().indexOf(value) > -1;
            $(this).toggle(show);
        });
    });

    $("#expertiseFilter").on("keyup", function () {
        let value = $(this).val().toLowerCase();
        $("#eventTable tbody tr").filter(function () {
            let show = $($(this).children()[5]).text().toLowerCase().indexOf(value) > -1;
            $(this).toggle(show);
        });
    });

    $("#priceFilter").on("keyup", function () {
        let value = $(this).val().toLowerCase();
        $("#eventTable tbody tr").filter(function () {
            let show = $($(this).children()[6]).text().toLowerCase().indexOf(value) > -1;
            $(this).toggle(show);
        });
    });
});