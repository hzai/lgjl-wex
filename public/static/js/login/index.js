/**
 * Created by Anchel on 2016/9/17.
 */
$(function(){

    $("#login0").click(function(){
        var username = $("#username").val();
        var password = $("#password").val();
        var data = {"username":username,"password":password};
        $.ajax({
            url:'/auth/login',
            type:'post',
            data: data,
            success: function(data,status){
                // alert(status)
                // alert(JSON.stringify(data))
                if(status == 'success'){
                    if (data.errcode === 0 && data.data.username) {
                        location.href = '/';
                    } else {
                        location.href = 'login';
                    }
                }
            },
            error: function(data,status){
                alert('error')
                if(status == 'error'){
                    location.href = 'login';
                }
            }
        });
    });

});