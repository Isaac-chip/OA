<template>
    <Modal v-model="imageViewShow" title="图片选择器" :footer-hide="true" :mask-closable="false" :width="800">
        <div  class="imageModal">
            <Row>
                <Col span="8">
                    <Upload
                        :format="['jpg','jpeg','png']" 
                        :max-size="2048"
                        :on-success="handleSuccess"
                        :headers="uploadHeaders" 
                        :show-upload-list="false"
                        :action="fileServer">
                        <Button icon="ios-cloud-upload-outline">上传图片</Button>
                    </Upload>
                </Col>
                <Col span="16" style="text-align:right">
                    <Page :total="dataCount" :page-size="pageSize" show-total show-sizer @on-change="changepage" @on-page-size-change="onChangePageSize"></Page>
                </Col>
            </Row>
            <div class="grid">
                <div class="grid__item" v-for="item in imageList" :key="item.id"> 
                    <div  class="img-wrap" @click="imageSelect(item.imageUrl)">
                        <img :src="prePath +item.imageUrl" :alt="item.imageName" />
                    </div> 
                </div>
            </div>
        </div>
    </Modal>
</template>
<style>
.imageModal{
    position: relative;
    width: 100%;
    height: 400px;
}
.grid {
	position: relative;
	margin: 0 auto;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    overflow-y: scroll
}

.grid::after {
	content: '';
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	pointer-events: none;
	background-size: 60px auto;
	-webkit-transition: opacity 0.3s;
	transition: opacity 0.3s;
}

.grid--loaded::after {
	opacity: 0;
}

.grid__item {
	width: 180px;
	padding: 10px;
}

.grid__item--current {
	opacity: 0 !important;
}

.img-wrap {
    width: 100px;
    height: 100px;
    padding: 10px;
    display: inline-block;
}

.img-wrap img {
	display: block;
	max-width: 100%;
}
</style>
<script>
import constants from '../../constants.js';
export default {
    name:'imageView',
    props:{
        imageSelect:{
            type: Function,
            default : function imageSelect(value) {
            
            }
        }
    },
    data (){
        return {
             // 初始化信息总条数
            dataCount:0,
            // 每页显示多少条
            pageSize:10,
            current:1,
            size:18,
            uploadHeaders:{},
            imageViewShow:false,
            fileServer:'',
            imageList:[],
            prePath:''
        }
    },
    created:function(){
        this.setHeaders()
        this.fileServer = this.$constants.BIURL +'/img/upload';
        this.prePath = this.$constants.PREPATH;
    },
    methods:{
        changepage:function(value){
            this.current = value;
            this.loadImageByUser();
        },
        onChangePageSize:function(value){
            this.pageSize = value;
            this.loadImageByUser();
        },
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
                    current:self.current,
                    size:self.pageSize,
                    userId:self.$constants.userInfo.userId,
                    tenantId:self.$constants.userInfo.tenantId
                }
            })
            .then(function (response) {
                if(response.status ==200){
                    var data = response.data;
                    if(data.data){
                        self.dataCount = data.data.total;
                        self.imageList = data.data.records;
                    }
                    console.log(self.imageList);
                }
            })
        },
        handleSuccess:function(response, file, fileList){
            this.loadImageByUser();
        },
        setHeaders:function(){
            var self = this;
            var access_token = this.$constants.access_token;
            if(access_token == null || access_token ==''){
                var userInfo =window.localStorage.getItem('userInfo');
                if(userInfo !=null && userInfo!=''){
                    access_token = JSON.parse(userInfo).access_token;
                }
            }
            self.uploadHeaders = {
                'Authorization': "bearer " + access_token
            };  
        }
    },
    mounted:function(){
        
        this.setHeaders();
        //this.loadImageByUser();
    }
}
</script>
