<template>
    <div class="bi-main-container">
        <Breadcrumb class="breadcrumb">
            <BreadcrumbItem to="/">首页</BreadcrumbItem>
            <BreadcrumbItem >乡村振兴</BreadcrumbItem>
            <BreadcrumbItem >党建地图</BreadcrumbItem>
        </Breadcrumb>
        <div class="bi-container map-container" id="container">
            <baidu-map :style="{width:map.width,height:map.height}" class="map" ak="UXTxGY2P3obB5GZ0IBEYBPui0NkUdG0o" :zoom="map.zoom" :center="{lng: map.center.lng, lat: map.center.lat}"
                @ready="handler" :scroll-wheel-zoom="true">
                 <!--缩放控件-->
                <bm-navigation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" ></bm-navigation>
                <bm-marker v-for="marker of markers" :key="marker.id" :position="{lng: marker.lng, lat: marker.lat}" @click="lookDetail(marker)">
                    <bm-label
                        :content="marker.deptName"
                        :labelStyle="{color: marker.color , fontSize : '14px'}"
                        :offset="{width: 14, height: -20}"
                        />
                </bm-marker>

                 <!--信息窗体-->
                <bm-info-window :position="{lng: infoWindow.info.lng, lat: infoWindow.info.lat}" :title="infoWindow.info.name" :show="infoWindow.show" @close="infoWindowClose" @open="infoWindowOpen">
                    <p><h3 style='margin:0 0 5px 0;padding:0.2em 0'>{{infoWindow.info.deptName}}</h3></p>
                    <div style='float:left;margin:4px' :id="infoWindow.info.id"><p style='margin:0;line-height:1.5;font-size:13px;'>
                        <p> 所在地址:{{infoWindow.info.address}}</p>  
                        <p> 党员人数:{{infoWindow.info.totalMember}}</p>   
                        <p> 党支部数量:{{infoWindow.info.partyNum}}</p>    
                    </div>
                </bm-info-window>
            </baidu-map>
        </div>
    </div>
</template>
<style>
.header{
    margin-bottom: 15px;
    }
.map-container{
    padding: 0px;
    overflow: hidden;
}
.map{
        min-width: 800px; width:1000px;height:710px;float:left;background:white;border-radius:5px;margin-left:10px;
        .right{
            text-align: left;
        }
        .left{
            width: 100px;
        }
    }
.pageView{
    text-align: right;
    margin-top: 10px;
}
</style>

<script> 

import redflag from '@/assets/images/redflag.png'
export default {
    data () {
        return {
            map:{
                center: {lng: 109.215295,lat:21.653808},//'北海市',
                zoom: 12,
                width:'100%',
                height:'100%'
            },
            flagIcon:null,
            baiduMap:null,
            markers:[],
            infoWindow: {
                lng: 0,
                lat: 0,
                show: false,
                info:{
                    id:0,
                    deptName:'',
                    address: '',
                    totalMember: 0,
                    partyNum: 0
                }
            }
        }
    },
    created:function(){
        
    },
    methods:{
        handler:function({BMap, map}){
            console.log(BMap, map)
            this.loadDepartmentMap();
        },
        loadDepartmentMap:function(){
            var self = this;
            self.$http({
                url:self.$constants.BIURL+'/deptMap/list',
                method:'GET'
            })
            .then(function (response) {
                if(response.status ==200){
                    var data = response.data;
                    self.markers = data.data;
                }
            }).catch(function (error) {
                    self.$Message.error({
                    content: error.message,
                    duration: 2
                });
                console.log(error);
            });
        },
        lookDetail:function(data, target){
            this.infoWindow.show =true;
            this.infoWindow.info=data;
        },
        infoWindowClose (e) {
            this.infoWindow.show = false
        },
        infoWindowOpen (e) {
            this.infoWindow.show = true
        },
    },
    mounted:function(){
    }
}
</script>
