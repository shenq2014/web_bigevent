$(function() {
    var form = layui.form;
    
    form.verify({
        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        pass: [
          /^[\S]{6,12}$/
          ,'密码必须6到12位，且不能出现空格'
        ],

        samepwd: function(value) {
            if (value === $('[name=oldPwd]').val()) {
                return ('新旧密码不能相同！')
            }
        },

        rePwd:function(value) {
            if (value !== $('[name=newPwd]').val()) {
                layui.layer.msg('两次密码不一致！')
            }
        }
    }); 
      
    $('#form').on('submit',function(e) {
        e.preventDefault();
        $.ajax({
        method: 'POST',
        url:'/my/updatepwd',
        data: $(this).serialize(),
        success: function(res) {
            if(res.status !== 0) {
                return layui.layer.msg(res.message);
            }else{
                layui.layer.msg(res.message)
            }
        }
        })
    })
})