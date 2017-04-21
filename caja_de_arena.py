function getInfoForMarkers() {
    $.ajax({
        url: 'http://localhost:8000/getTrainMarkers',
        type: 'GET',
        async: false,
        success: function (response) {
            ajax_response = response;
            dropdown_options = ajax_response.response;
            $("#inlineFormCustomSelectOrigin").empty();
            $("#inlineFormCustomSelectDestination").empty();
            $('#inlineFormCustomSelectOrigin').append('<option>Choose Origin</option>');
            $('#inlineFormCustomSelectDestination').append('<option>Choose Destination</option>');
            var options = $("#inlineFormCustomSelectOrigin");
            $.each(dropdown_options, function () {
                options.append($("<option />").val(this.id).text(this.id + " - " + this.name));
            });
            var options = $("#inlineFormCustomSelectDestination");
            $.each(dropdown_options, function () {
                options.append($("<option />").val(this.id).text(this.id + " - " + this.name));
            });
        },
        error: function (error) {
            console.log(error);
        }
    });
}


$.ajax({
    url: 'http://localhost:8000/getFlightMarkers',
    type: 'GET',
    async: false,
    success: function (response) {
        ajax_response = response;
        dropdown_options = ajax_response.response;
        $("#inlineFormCustomSelectOrigin").empty();
        $("#inlineFormCustomSelectDestination").empty();
        $('#inlineFormCustomSelectOrigin').append('<option>Choose Origin</option>');
        $('#inlineFormCustomSelectDestination').append('<option>Choose Destination</option>');
        var options = $("#inlineFormCustomSelectOrigin");
        $.each(dropdown_options, function () {
            options.append($("<option />").val(this.id).text(this.id + " - " + this.name));
        });
        var options = $("#inlineFormCustomSelectDestination");
        $.each(dropdown_options, function () {
            options.append($("<option />").val(this.id).text(this.id + " - " + this.name));
        });
    },
    error: function (error) {
        console.log(error);
    }
});