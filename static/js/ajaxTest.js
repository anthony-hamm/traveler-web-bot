/**
 * Created by hamme on 19/04/2017.
 */

$(function () {
    $('#btnSignUp').click(function () {
        $.ajax({
            url: '/signUp',
            data: $('form').serialize(),
            type: 'POST',
            success: function (response) {
                console.log(response);
            },
            error:function (error) {
                console.log(error);
            }
        })
    })
})


$(function () {
    $('#btnSignUp').click(function () {
        $.ajax({
            url: '/signUp',
            data: $('form').serialize(),
            type: 'POST',
            success: function (response) {
                console.log(response);
            },
            error:function (error) {
                console.log(error);
            }
        })
    })
})

//
// var SendInfo= { SendInfo: [... your elements ...]};
//
//         $.ajax({
//             type: 'post',
//             url: 'Your-URI',
//             data: JSON.stringify(SendInfo),
//             contentType: "application/json; charset=utf-8",
//             traditional: true,
//             success: function (data) {
//                 ...
//             }
//         });

