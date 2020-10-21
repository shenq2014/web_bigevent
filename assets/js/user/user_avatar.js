var layer = layui.layer
 // 1.1 获取裁剪区域的 DOM 元素
 var $image = $('#image')
 // 1.2 配置选项
 const options = {
   // 纵横比
   aspectRatio: 1,
   // 指定预览区域
   preview: '.img-preview'
 }

 // 1.3 创建裁剪区域
 $image.cropper(options)
 $('#btnChooseImage').on('click', function() {
     $('#file').click();
 });

 $('#file').on('change', function(e) {
     var fileList = e.target.files
     if (fileList == 0) {
         return layer.message('请选择照片')
     }

     var file = e.target.files[0];

     var imgURL = URL.createObjectURL(file);

     $image
      .cropper('destroy')      // 销毁旧的裁剪区域
      .attr('src', imgURL)  // 重新设置图片路径
      .cropper(options)
    //  $.ajax({
    //     method: 'post',
    //     url:'/my/update/avatar',
    //     data: $('#image').attr('src'),
    //     success: function(res) {
    //         if(res.status == 0) {
    //             return layer.message('成功')
    //         }
    //         $('#image').attr('src',res.avatar)
    //     }
    //  })

    $('#btnUpload').on('click', function(e) {
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')
            $.ajax({
                    method: 'post',
                    url:'/my/update/avatar',
                    data: {avatar: dataURL},
                    success: function(res) {
                        if(res.status !== 0) {
                            return layer.message('失败')
                        }
                        window.parent.getUserInfo();
                    }
                 })
    })
 })