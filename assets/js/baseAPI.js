$.ajaxPrefilter(function(options) {
    options.url="http://ajax.frontend.itheima.net" + options.url;
    
    //统一为有权限 的接口设置headers 请求头
    if(options.url.indexOf('/my/') !== -1) {
        options.headers={
            Authorization:localStorage.getItem('token') || ''
        }
    }

    options.complete = function(res) {
           // console.log(res)
           if(res.reponse.JSON.status == 1 && res.reponse.JSON.message == '省份认证失败！') {
            localStorage.removeItem('token')
            location.href = '/login.html'
        } 
    }
})                                                                       