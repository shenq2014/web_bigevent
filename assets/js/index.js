$(function() {
    //调用getUserInfo获取用户基本信息
    getUserInfo();

    $('#btnLogout').on('click', function() {
        layer.confirm('确定退出登录?', {icon: 3, title:'提示'}, function(index){
            localStorage.removeItem('token')
            location.href = '/login.html'
            
            layer.close(index);
          });
    })
})

//获取用户基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url:'/my/userinfo',
        // headers:{
        //     Authorization:localStorage.getItem('token') || ''
        // },
       
        success:function(res) {
            if(res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg(res.message)
            renderAvatar(res.data);
        },
        
        // complete: function(res) {
        //     // console.log('执行了 complete 函数')
        //     // console.log(res)
        //     if(res.reponse.JSON.status == 1 && res.reponse.JSON.message == '省份认证失败！') {
        //         localStorage.removeItem('token')
        //         location.href = '/login.html'
        //     }
        // }
    })
}

function renderAvatar(user) {
    var name = user.nickname || user.username;
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    if(user.user_pic !== null) {
        $('.layui-nav-img').attr('src',user.user_pic).show();
        $('.text-avatar').hide();
    }else{
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase();
        $('.text-avatar').html(first).show();
    }
}