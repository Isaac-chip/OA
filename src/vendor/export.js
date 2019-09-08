import Vue from 'vue'
import axios from 'axios'
export default{
    exportExcel :function(url,params,fn){
        axios({
            url:url,
            method:'GET',
            params:params,
            responseType:'blob'
        })
        .then(function (response) {
           var blob = new Blob([response.data], {type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document;charset=utf-8'}); //application/vnd.openxmlformats-officedocument.wordprocessingml.document这里表示doc类型
            var contentDisposition = response.headers['content-disposition'];  //从response的headers中获取filename, 后端response.setHeader("Content-disposition", "attachment; filename=xxxx.docx") 设置的文件名;
            var patt = new RegExp("filename=([^;]+\\.[^\\.;]+);*");
            var result = patt.exec(contentDisposition);
            var filename = result[1];
            var downloadElement = document.createElement('a');
            var href = window.URL.createObjectURL(blob); //创建下载的链接
            downloadElement.style.display = 'none';
            downloadElement.href = href;
            downloadElement.download =decodeURI(filename) ; //下载后文件名
            document.body.appendChild(downloadElement);
            downloadElement.click(); //点击下载
            document.body.removeChild(downloadElement); //下载完成移除元素
            window.URL.revokeObjectURL(href); //释放掉blob对象
        }) .catch(function (error) {
            if(fn){
                fn(error);
            }
        });
    }
}