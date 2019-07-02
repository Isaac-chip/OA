<template>
    <div class="bi-main-container">
        <Breadcrumb class="breadcrumb">
            <BreadcrumbItem to="/">首页</BreadcrumbItem>
            <BreadcrumbItem >党群服务</BreadcrumbItem>
            <BreadcrumbItem to="/system/dept">志愿服务</BreadcrumbItem>
        </Breadcrumb>
        <div class="bi-container">
             <div class="content">
               <Row>
                    <Col span="16">
                        <Button type="success" size="large" @click="addService = true" style="margin-left:15px;">新增服务</Button>
                    </Col>
                    
                    <Col span="8">
                        <Input v-model="queryStr" size="large" search enter-button="查询" @on-search="onSeach" style="max-width:400px;" placeholder="输入主题关键字查找" />
                    </Col>
                    
                </Row>
                <div class="namesheet">
                    <Table ref="table" border  :columns="columns1" :data="data1" no-data-text="暂时没有数据"></Table>
                </div>
                <Row >
                    <Col span="5" style="font-size:15px;margin-top:15px;">显示页数 1 / 3,440</Col>
                    <Col span="18">
                        <Page :total="dataCount" :page-size="pageSize" show-total show-sizer @on-change="changepage" @on-page-size-change="onChangePageSize" class="pageView"></Page>
                    </Col>
                </Row>
            </div>
        </div>
       <!-- 弹出框 -->
       <Modal
       class="info"
       :mask-closable="false"
        v-model="addService"
        title="修改内容"
        width="800"
        :footer-hide="true"
        >

        <Form ref="selfinfo" :model="selfinfo" :rules="ruleselfinfo" :label-width="80" >
            <Row>
                <Col span="12">
                    <FormItem label="主题服务" prop="theme">
                        <Input v-model="selfinfo.theme"  />
                    </FormItem>
                    <FormItem label="服务时间" prop="sertime">
                        <i-col span="12">
                                <Date-picker confirm @on-change="sertimeChange" type="datetime" style="width: 200px"></Date-picker>
                        </i-col>
                    </FormItem>
                    <FormItem label="服务地点" prop="seradress">
                        <Input v-model="selfinfo.seradress"  />
                    </FormItem>
                    <FormItem label="服务内容" prop="sercontent">
                        <Input v-model="selfinfo.sercontent" type="textarea" :rows="4"  />
                    </FormItem>
                    <FormItem label="携带物品" prop="sergoods">
                        <Input v-model="selfinfo.sergoods"  />
                    </FormItem>
                    
                </Col>
                <Col span="12">
                
                <FormItem label="召集人 : " prop="person">
                        <!-- <Input type="hidden" v-model="selfinfo.person"  /> -->
                    </FormItem>
                    <FormItem label="召集职务" prop="serjob">
                        <Input  v-model="selfinfo.serjob"  />
                    </FormItem>

                    <FormItem label="报名时限" prop="signuptime">
                        <i-col span="12">
                                <Date-picker confirm @on-change="sighupChange" type="datetime"  style="width: 200px"></Date-picker>
                            </i-col>
                    </FormItem>

                    <FormItem label="活动人数" prop="num">
                        <Input  v-model="selfinfo.num"  />
                    </FormItem>
                    <FormItem label="评分规则 : " prop="rule">
                        <div>{{selfinfo.rule}}</div>
                    </FormItem>
                </Col>
            </Row>
                
            <Row>
                <FormItem label="状态" prop="rule">
                    <Radio-group v-model="selfinfo.state">
                        <Radio label="0">停用</Radio>
                        <Radio label="1">启用</Radio>
                        <Radio label="2">结束</Radio>
                    </Radio-group>
                </FormItem>
            </Row>
            <Row>
                <FormItem>
                <Button type="primary" @click="handleSubmit('selfinfo')">保存</Button>
                <Button style="margin-left:8px" @click="resetService('selfinfo')">重置</Button>  
                </FormItem> 
            </Row>
           
        </Form>
           
    </Modal>

    <!-- 审核 -->
    <Modal
        :mask-closable="false"
        v-model="examine"
        title="审核状态"
        :footer-hide="true"
        >
        <Form ref="exammess" :model="examineMess" :rules="ruleselfinfo" :label-width="80" abel-position="top">
            <Form-item label="审核状态">
                <Radio-group v-model="examineMess.state">
                    <Radio label="0">通过</Radio>
                    <Radio label="1">不通过</Radio>
                </Radio-group>
            </Form-item>
            <Form-item label="审核意见">
                <Input v-model="examineMess.examview" type="textarea" :rows="4" />
            </Form-item>
            <FormItem>
                <Button type="primary" @click="examSave('exammess')">保存</Button>
                <Button style="margin-left:8px" @click="examReset('exammess')">重置</Button>  
            </FormItem>
        </Form>
   
    </Modal>
    
    <Modal
        v-model="score"
        title="志愿服务评分"
        :footer-hide="true"
        class="score"
        :mask-closable="false"
        width="500"
       >
        <div class="scorerule">当前打分规则:分数在1～10之间 不能超过这个分数区间</div>
        <Row>
            <Col span="12">韩仁义</Col>
            <Col span="12">
                <Input  v-model="selfinfo.num"  />
            </Col>
        </Row>
        <Row>
            <Col span="12">韩仁义</Col>
            <Col span="12">
                <Input  v-model="selfinfo.num"  />
            </Col>
        </Row>
        <Row>
            <div style="text-align:center">
                <Button type="primary" size="large"  @click="scoreSubmit()" >提交</Button>
            </div>
        </Row>
        
    </Modal>

    <Modal
        v-model="QRcode"
        title="二维码"
        :footer-hide="true"
        class="score"
        :mask-closable="false"
        width="500"
       >
         
    </Modal>

    </div>
</template>

<script>

export default{
    name: 'volunteer',
    data (){
        return {
            queryStr:'',
            current:1,
             // 初始化信息总条数
            dataCount:0,
            // 每页显示多少条
            pageSize:10,
            addService: false,
            examine:false,
            reset:false,
            score:false,
            resetIndex:'',
            QRcode:false,
            examineMess:{
                state:'',
                examview:'',
            },
            selfinfo:{
                theme:'',
                sertime:'',
                seradress:'',
                sercontent:'',
                sergoods:'',
                person:'',
                serjob:'',
                signuptime:'',
                num:'',
                rule:'',
                state:'',

            },
           

            ruleselfinfo:{
                theme: [
                        { required: true, message: '服务主题不能为空', trigger: 'blur' }
                    ],
                
                seradress: [
                        { required: true, type: 'string', message: '服务地点不能为空', trigger: 'blur' }
                    ],
                sercontent: [
                        { required: true, type: 'string', message: '服务内容不能为空', trigger: 'blur' }
                    ],
                num: [
                        { required: true,type: 'string', message: '活动总人数不能为空', trigger: 'blur' }
                    ]
            },

            cityList:[
                {
                    value:'中国共产党合浦县委员会',
                    label:'中国共产党合浦县委员会'
                },
                {
                    value:'广西北海市合浦县',
                    label:'广西北海市合浦县'
                },
            ],
            columns1: [
                    {
                        title:'序号',
                        key:'num',
                        align:'center',
                        width:100,
                    },
                    {
                        title: '服务主题',
                        key: 'theme',
                        align:'center',
                        width:100,
                    },
                    {
                        title: '手机号码',
                        key: 'phone',
                        align:'center',
                        width:150,
                    },
                    {
                        title: '所属组织',
                        key: 'suborganize',
                        width:450,
                    },
                    {
                        title: '政治面貌',
                        key: 'political',
                        align:'center',
                    },
                    {
                        title: '性别',
                        key: 'sex',
                        align:'center',
                    },
                    {
                        title: '更新时间',
                        key: 'updatetime',
                        align:'center',
                    },
                    {
                        title: '操作',
                        key: 'operation',
                        render: (h, params) => {
                            if(true){
                                return h('div', [
                                    h('Button', {
                                        props: {
                                            type: 'success',
                                            size: 'default'
                                        },
                                        style: {
                                            marginRight: '5px',
                                            padding:'4px 15px 4px 15px'
                                        },

                                        on: {
                                            click: () => {

                                                    this.examine=true
                                                    this.resetIndex=params.index
                                            }
                                        }
                                    }, '审核'),
                                    h('Dropdown', {
                                            props:{
                                                trigger: "click",
                                            },
                                            on:{
                                                click:()=>{
                                                   
                                                }
                                                
                                            }
                                            
                                            
                                  },
                                    [h('Button',{
                                            props:{
                                                type:'primary',
                                                // size:'default'
                                            },
                                            style:{
                                                padding:'4px 8px 4px 8px'
                                            }
                                        },
                                        [
                                            h('span','更多'),
                                            h('Icon',{props:{type:'ios-arrow-down'},style:{marginLeft:'3px'}})
                                        ]
                                        
                                        ),
                                         h('DropdownMenu',{
                                                slot:'list',
                                                props:{
                                                    transfer:true
                                                },
                                                style:{
                                                    width:'50px',
                                                    z_index:20,
                                                }
                                         },
                                            [h('DropdownItem',{
                                                
                                                nativeOn:{
                                                click:()=>{
                                                this.resetIndex=params.index
                                                this.addService=true    
                                                }
                                            }},'修改'),
                                                
                                            h('DropdownItem',{
                                                
                                                nativeOn:{
                                                click:()=>{
                                                    this.deletelist(params.index)
                                                }
                                            }},'删除'),
                                              h('DropdownItem',{
                                                 nativeOn:{
                                                      click:()=>{
                                                        this.score=true;
                                                       
                                                      }
                                                  } 
                                              },'评分'),
                                              h('DropdownItem',{
                                                nativeOn:{
                                                        click:()=>{
                                                            this.QRcode=true
                                                            // this.resetIndex=params.index
                                                            }
                                                    }
                                              },'二维码')
                                             ]
                                         )
                                        ]
                                    )
                                ]);
                            }
                    }
                }


                    
                ],
                data1: [
                    {
                        num:1,
                        theme:'清洁',
                        phone:12324678865,
                        suborganize:'常乐镇党委/常乐镇中心卫生院党支部',
                        political:'中共党员',
                        sex:'男',
                        updatetime:'2015-06-01',
                        operation:'操作'
                        
                    },
                    {
                        num:2,
                        theme:'清洁清洁清洁清洁清洁清洁',
                        phone:12324678865,
                        suborganize:'常乐镇党委/常乐镇中心卫生院党支部',
                        political:'中共党员',
                        sex:'男',
                        updatetime:'2015-06-01',
                        operation:'操作'
                        
                    },
                    {
                        num:3,
                        theme:'清洁',
                        phone:12324678865,
                        suborganize:'常乐镇党委/常乐镇中心卫生院党支部',
                        political:'中共党员',
                        sex:'男',
                        updatetime:'2015-06-01',
                        operation:'操作'
                        
                    },
                    {
                        num:4,
                        theme:'清洁',
                        phone:12324678865,
                        suborganize:'常乐镇党委/常乐镇中心卫生院党支部',
                        political:'中共党员',
                        sex:'男',
                        updatetime:'2015-06-01',
                        operation:'操作'
                        
                    },
                    {
                        num:5,
                        theme:'清洁',
                        phone:12324678865,
                        suborganize:'常乐镇党委/常乐镇中心卫生院党支部',
                        political:'中共党员',
                        sex:'男',
                        updatetime:'2015-06-01',
                        operation:'操作'
                        
                    },
                   
                ],
        }
    },
    methods:{
        // 评分提交
        scoreSubmit(){
            this.score=false;
        },
        // 删除
       deletelist(index){
            this.$Modal.confirm({
                    title: '系统提示',
                    content: '<p>确定删除当前内容吗？</p>',
                    onOk: () => {
                        this.$Message.info('点击了确定');
                    },
                    onCancel: () => {
                        this.$Message.info('点击了取消');
                    }
                });
       },
        onSeach(){
            this.current = 1;
            // this.loadUser();
        },

        // 导入弹框确认按钮
        ok () {
                this.$Message.info('点击了确定');
            },
            cancel () {
                this.$Message.info('点击了取消');
            },
      
            handleError(error,file){
                this.$Message.error("数据导入失败！")
            },
        
        //详细信息
        sighupChange(daterange){
            this.selfinfo.signuptime=daterange;
        },
        sertimeChange(daterange){
            this.selfinfo.sertime=daterange;
        },
        
        // 信息保存
        handleSubmit(name){
            this.addService=false;
            console.log(this.selfinfo);
            
        },
        // 重置
        resetService(name){
            alert(1)
            this.selfinfo={
                theme:'',
                sertime:'',
                seradress:'',
                sercontent:'',
                sergoods:'',
                person:'',
                serjob:'',
                signuptime:'',
                num:'',
                rule:'',
                state:'',
            }
           
            },
        examSave(name){
            this.examine=false
        },
        examReset(name){
            this.examineMess.examview='';
           
        },

        changepage(value){
            this.current = value;
            // this.loadUser();
        },
        onChangePageSize(){
             this.pageSize = value;
            // this.loadUser();
        },

    },
    mounted:function(){
      
    }
}
</script>

<style scoped>
.score .scorerule{
    color:#2db7f5;
    font-size:15px;
    text-align: center;
    margin-bottom:10px;
}
.score .ivu-row{
    padding:20px 30px 0px 30px!important;
    /* margin-top:20px!important; */
}
.content{
    margin-top:15px;
}
.ivu-table-wrapper {
    overflow: visible !important;
}
.ivu-table{
    overflow: visible !important;
}
.ivu-form-item{
    margin-top:10px !important;
}
    /*调节选择框的下拉框的宽度*/
    .ivu-select-dropdown{
        min-width: 100px!important;
        z-index: 20;
    }
   
    .sheetwidth{
        background-color: #2db7f5;
        color: #fff;
    }
   
    .namesheet{
        margin-top:20px;
        padding-bottom:50px;
    }
    /* 弹出框 */
    .info{

    }
    .info input{
        width:200px;
    }
    
    

</style>
