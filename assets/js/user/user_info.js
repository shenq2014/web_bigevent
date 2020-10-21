$(function() {
    //从layui中获取form对象
    var form = layui.form
    var layer = layui.layer
    //通过form.veryfy()来自定义校验规则

    form.verify({
        nickname:function(value){
            if(value.length > 6) {
                return '昵称长度必须在 1~4 个字符'
            }
        }
         
    });

    initUserInfo();

    function initUserInfo() {
        $.ajax({
            method: 'get',
            url:'/my/userinfo',
             success: function(res){
                if(res.status !== 0) {
                    return console.log(res.message)
                }
                // console.log(res.data)
                form.val('formUserInfo',res.data)
                // $('#form [name=username]').val(res.data.username)

                
            }
        })
    }

    $('#btnReset').on('click', function(e) {
        //阻止表单的默认重置事件
        e.preventDefault();
        initUserInfo();

    })

    $('#form').on('click', function(e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url:'/my/userinfo',
            data:{
                id: $('#form [name=id]').val(),
                nickname: $('#form [name=nickname]').val(),
                email:$('#form [name=email]').val()
            },
            success: function(res){
                if(res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message);
                window.parent.getUserInfo()
            }
        })
    })
    
    
})