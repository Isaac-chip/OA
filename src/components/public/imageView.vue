<template>
    <Modal v-model="imageViewShow" title="图片选择器" :footer-hide="true" :mask-closable="false" class="imageModal" :width="800">
        <Row>
            <Col span="8">
                <Upload
                    :format="['jpg','jpeg','png']" 
                    :max-size="2048"
                    :on-success="handleSuccess"
                    :show-upload-list="false"
                    :action="fileServer">
                    <Button icon="ios-cloud-upload-outline">上传图片</Button>
                </Upload>
            </Col>
            <Col span="8">
            </Col>
        </Row>
        <div></div>
    </Modal>
</template>
<script>
export default {
    name:'imageView',
    props:{
        imageSelect:{
            type: Function,
            default : function imageSelect() {
            
            }
        }
    },
    data (){
        return {
            imageViewShow:false,
            fileServer:'',
            imageList:[]
        }
    },
    created:function(){
        this.fileServer = this.$constants.BIURL +'/img/upload';
    },
    methods:{
         showImageModel:function(value){
            this.imageViewShow = value;
        },
        loadImageByUser:function(){
            var self = this;
            self.$http({
                url:self.$constants.BIURL+'/img/allList',
                method:'GET',
                dataType:'json',
                params:{
                    userId:self.$constants.userInfo.userId,
                    userId:self.$constants.userInfo.tenantId
                }
            })
            .then(function (response) {
                if(response.status ==200){
                    var data = response.data;
                    self.imageList = data.data;
                    console.log(imageList);
                }
            })
        },
        handleSuccess:function(response, file, fileList){
            this.loadImageByUser();
        }
    },
    mounted:function(){
        
    }
}
</script>
