$(function() {
    $('#link_reg').on('click', function(){
        $('.login_box').hide();
        $('.reg_box').show();
    })

    $('#link_login').on('click', function(){
        $('.reg_box').hide();
        $('.login_box').show();
    })

    //从layui中获取form对象
    var form = layui.form

    //通过form.veryfy()来自定义校验规则
    form.verify({
        pwd:[
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ] ,
          repwd:function(value) {
            var pwd =  $('.reg_box [name=password]').val();
            if(value !== pwd) {
                return "两次密码不一致"
            } 
          }
    })

    $('#form_reg').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            type:'POST',
            url:'/api/reguser',
            data:{ username: $('.reg_box [name=username]').val(),
            password: $('.reg_box [name=password]').val() },
            success: function(res) {
                if(res.status !== 0){
                    layer.msg(res.message);  
                } 
                layer.msg(res.message);
            }
        })
    })

    $('#form_login').on('submit', function(e) {
        e.preventDefault();
        $.post('/api/login', 
        {username:$('#form_login [name=username]').val(),
        password:$('#form_login [name=password]').val()},function(res) {
            if(res.status !== 0){
                return layer.msg(res.message);  
            }
            layer.msg('登录成功');
            localStorage.setItem('token',res.token);
            location.href='/index.html'
        })
    })
})