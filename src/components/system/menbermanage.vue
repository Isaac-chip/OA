<template>
    <div class="bi-main-container">
        <Breadcrumb class="breadcrumb">
            <BreadcrumbItem to="/">首页</BreadcrumbItem>
            <BreadcrumbItem >党务信息</BreadcrumbItem>
            <BreadcrumbItem to="/system/dept">党员管理</BreadcrumbItem>
        </Breadcrumb>
        <div class="bi-container">
             <div class="content">
               <Row>
                    <Col span="4">
                        <Button type="success" size="large" @click="addPartymem = true">新增党员</Button>
                    </Col>
                    <Col span="8">
                        <span style="font-size:15px;">所属组织 ： </span>
                        <Select v-model="model1" style="width:250px" size="large">
                            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </Col>
                    <Col span="7">
                        <Input v-model="queryStr" size="large" search enter-button="查找" @on-search="onSeach" style="width:80%;" placeholder="输入姓名/手机号查找" />
                    </Col>
                    <Col span="4">
                        <Button type="info" size="large" @click="Import = true">导入</Button>
                        <Button type="info" size="large" @click="exportData(1)">导出</Button>
                        
                    </Col>
                    
                </Row>
                <div class="namesheet">
                    <Table ref="table" border  :columns="columns1" :data="data1" no-data-text="暂时没有数据"></Table>
                </div>
                <Row >
                    <Col span="5" style="font-size:15px; margin-top:15px;">显示页数 1 / 3,440</Col>
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
        v-model="addPartymem"
        title="修改用户信息"
        width="800"
        :footer-hide="true"
        >
        <Tabs type="card" >
            <Tab-pane label="基本信息">
                <Form ref="selfinfo" :model="selfinfo" :rules="ruleselfinfo" :label-width="80" >
                <Row>
                    <Col span="12">
                        <FormItem label="用户名" prop="username">
                            <Input v-model="selfinfo.username" placeholder="用户名" />
                        </FormItem>
                        <FormItem label="姓名" prop="name">
                            <Input v-model="selfinfo.name" placeholder="姓名" />
                        </FormItem>
                        <FormItem label="所属组织" prop="subordinate">
                            <i-col span="12" style="padding-right:10px" >
                                <i-select v-model="selfinfo.subordinate" filterable >
                                    <i-option v-for="item in cityList"  :value="item.value">{{ item.label }}</i-option>
                                </i-select>
                            </i-col>
                        </FormItem>
                        <FormItem label="政治面貌" prop="political">
                            <i-select v-model="selfinfo.political" style="width:200px" >
                                <i-option v-for="item in political" :value="item">{{ item }}</i-option>
                            </i-select>
                        </FormItem>
                        <FormItem label="性别" prop="sex">
                            <i-select v-model="selfinfo.sex" style="width:200px">
                                <i-option v-for="item in ['男','女']" :value="item">{{ item }}</i-option>
                            </i-select>
                        </FormItem>
                        <FormItem label="人员分类" prop="personnel">
                            <i-select v-model="selfinfo.personnel" style="width:200px" >
                                <i-option v-for="item in personnel " :value="item">{{ item }}</i-option>
                            </i-select>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="密码登录" prop="password">
                            <Input type="password" v-model="selfinfo.password" placeholder="密码登录..." />
                        </FormItem>

                        <FormItem label="手机号码" prop="number">
                            <Input number v-model="selfinfo.number" placeholder="手机号码..." />
                        </FormItem>

                        <FormItem label="岗位" prop="station">
                            <i-col span="12" style="padding-right:10px">
                                <i-select v-model="selfinfo.station" filterable >
                                    <i-option v-for="item in station" :value="item" >{{ item }}</i-option>
                                </i-select>
                            </i-col>
                        </FormItem>

                        <FormItem label="职务" prop="work">
                            <Input number v-model="selfinfo.work" placeholder="职务" />
                        </FormItem>
                        <FormItem label="民族" prop="national">
                            <i-select v-model="selfinfo.national" style="width:200px" >
                                <i-option v-for="item in national" :value="item">{{ item }}</i-option>
                            </i-select>
                        </FormItem>
                        <FormItem label="人员编制" prop="staffestablish">
                            <i-select v-model="selfinfo.staffestablish" style="width:200px" >
                                <i-option v-for="item in staffestablish " :value="item">{{ item }}</i-option>
                            </i-select>
                        </FormItem>
                    </Col>
                </Row>
                
                <FormItem>
                    <Button style="margin-left: 8px" @click="hideModel('selfinfo')">关闭</Button>
                    <Button type="primary" @click="handleSubmit('selfinfo')">保存</Button>
                </FormItem>
            </Form>
            </Tab-pane>
            <Tab-pane label="详细信息">
                       <Form ref="detailinfo" :model="detailinfo" :rules="ruledetailinfo" :label-width="100" >
                <Row>
                    <Col span="12">
                        <FormItem label="职业分类" prop="classification">
                            <i-col span="12" style="padding-right:10px">
                                <i-select v-model="detailinfo.classification" filterable>
                                    <i-option v-for="item in classification" :value="item">{{ item }}</i-option>
                                </i-select>
                            </i-col>
                        </FormItem>
                        <FormItem label="行政职务" prop="adminposition">
                            <i-col span="12" style="padding-right:10px">
                                <i-select v-model="detailinfo.adminposition" filterable>
                                    <i-option v-for="item in adminposition" :value="item">{{ item }}</i-option>
                                </i-select>
                            </i-col>
                        </FormItem>
                        <FormItem label="学历" prop="education">
                            <i-col span="12" style="padding-right:10px">
                                <i-select v-model="detailinfo.education" filterable>
                                    <i-option v-for="item in education" :value="item">{{ item }}</i-option>
                                </i-select>
                            </i-col>
                        </FormItem>
                        <FormItem label="出生日期" prop="birthday">
                            <i-col span="12">
                                <Date-picker confirm @on-change="birthChange" type="date" placeholder="年-月-日" style="width: 200px"></Date-picker>
                            </i-col>
                        </FormItem>
                        <FormItem label="入党时间" prop="jointime">
                            <i-col span="12">
                                <Date-picker confirm @on-change="joinChange" type="date" placeholder="年-月-日" style="width: 200px"></Date-picker>
                            </i-col>
                        </FormItem>
                        <FormItem label="电子邮箱" prop="email">
                            <Input number v-model="detailinfo.email" placeholder="电子邮箱" />
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="在职状态" prop="jobstatus">
                            <i-select v-model="detailinfo.jobstatus" style="width:200px">
                                <i-option v-for="item in jobstatus" :value="item">{{ item }}</i-option>
                            </i-select>
                        </FormItem>

                        <FormItem label="职务级别" prop="positionlevel">
                            <i-select v-model="detailinfo.positionlevel" style="width:200px">
                                <i-option v-for="item in positionlevel " :value="item">{{ item }}</i-option>
                            </i-select>
                        </FormItem>

                        <FormItem label="婚姻状况" prop="maritalstatus">
                            <i-col span="12" style="padding-right:10px">
                                <i-select v-model="detailinfo.maritalstatus" filterable>
                                    <i-option v-for="item in maritalstatus" :value="item">{{ item }}</i-option>
                                </i-select>
                            </i-col>
                        </FormItem>

                        <FormItem label="参加工作时间" prop="worktime" >
                            <i-col span="12" >
                                <Date-picker confirm :value="detailinfo.worktime" type="date" placeholder="年-月-日" style="width: 200px" @on-change="workChange"></Date-picker>
                            </i-col>
                        </FormItem>
                        <FormItem label="身份证" prop="IDcardnum">
                            <Input number v-model="detailinfo.IDcardnum" placeholder="身份证号码" />
                        </FormItem>
                        <FormItem label="用户状态" prop="userstatus">
                            <i-select v-model="detailinfo.userstatus" style="width:200px">
                                <i-option v-for="item in ['启用','停用'] " :value="item">{{ item }}</i-option>
                            </i-select>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                      <FormItem label="家庭住址" prop="address">
                            <Input number v-model="detailinfo.address" placeholder="家庭住址" />
                        </FormItem>  
                    </Col>
                    <Col span="24">
                      <FormItem label="序号" prop="num">
                            <Input number v-model="detailinfo.num" placeholder="序号" />
                        </FormItem>  
                    </Col>
                </Row>
                
                
                
                <FormItem>
                    <Button style="margin-left: 8px" @click="hideModel('detailinfo')">关闭</Button>
                    <Button type="primary" @click="handleSubmit('detailinfo')">保存</Button>
                    
                </FormItem>
            </Form>
            </Tab-pane>
            
        </Tabs>
    </Modal>

    <!-- 导入框 -->
    <Modal
        :mask-closable="false"
        v-model="Import"
        title="导入党员"
        @on-ok="ok"
        @on-cancel="cancel">
        <p style="font-weight:600;font-size:14px;margin-bottom:20px;">上传Excel文件</p>
        <Row>
            <Col span="12">
                <Upload 
                    ref="upload"
                    action="/api/book/excel/import"    
                    name="excel-file"
                    :show-upload-list="true"
                    :on-format-error="handleFormatError"
                    :on-success="handleSuccess"
                    :on-error="handleError"
                    :format ="['xlsx','xls']">
                <Button type="info" icon="ios-cloud-upload-outline" style="font-size:16px;">导入</Button>
                </Upload>
            </Col>
            <Col span="12">
                <a href="/" style="font-size:18px;">模板下载</a>
            </Col>
        </Row>
   
    </Modal>
    <!-- 重置密码 -->
    <Modal
        v-model="reset"
        title="重置密码"
        @on-ok="ok"
        @on-cancel="cancel">
        <Form>
            <FormItem label="新密码 ：" prop="newnum">
                <Input type="password" v-model="selfinfo.password" placeholder="输入新密码" />
            </FormItem>
            <FormItem label="确认密码 ：" prop="ensurenum">
                <Input type="password" v-model="selfinfo.password" placeholder="再次输入密码" />
            </FormItem>
        </Form>
        
       
    </Modal>

    </div>
</template>

<script>

export default{
    name: 'menbermanage',
    data (){
        return {
            queryStr:'',
            current:1,
             // 初始化信息总条数
            dataCount:0,
            // 每页显示多少条
            pageSize:10,
            value1:'',
            select1:'',
            model1:'',
            Import:false,
            addPartymem: false,
            reset:false,
            resetIndex:'',
            selfinfo:{
                username:'',
                name:'',
                password:'',
                subordinate:'',
                political:'',
                sex:'',
                personnel:'',
                password:'',
                number:'',
                station:'',
                work:'',
                national:'',
                staffestablish:'',

            },
            detailinfo:{
                classification:'',
                adminposition:'',
                education:'',
                birthday:'',
                jointime:'',
                email:'',
                jobstatus:'',
                positionlevel:'',
                maritalstatus:'',
                worktime:'',
                IDcardnum:'',
                userstatus:'',
                address:'',
                num:'',
            },

            ruleselfinfo:{
                username: [
                        { required: true, message: '用户名不能为空', trigger: 'blur' }
                    ],
                
                political: [
                        { required: true, type: 'string', message: '政治面貌不能为空', trigger: 'blur' }
                    ],
                    sex: [
                        { required: true,type: 'string', message: '性别不能为空', trigger: 'blur' }
                    ]
            },
            ruledetailinfo:{
                num: [
                        { required: true, message: '请输入序号', trigger: 'blur' }
                                    ],
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
                        title: '名字',
                        key: 'name',
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
                                                 console.log('dianjil')
                                                    this.addPartymem=true
                                                // this.$router.push({ path: '../marketing_manage/add_gift_card?gcid=' + this.giftCardsList[params.index].gcid});
                                            }
                                        }
                                    }, '修改'),
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
                                                click:()=>{}
                                            }},'删除'),
                                              h('DropdownItem',{
                                                 nativeOn:{
                                                      click:()=>{
                                                          console.log(params.index)
                                                         this.show(params.index)
                                                       
                                                      }
                                                  } 
                                              },'查看权限'),
                                              h('DropdownItem',{
                                                nativeOn:{
                                                        click:()=>{
                                                            this.reset=true
                                                            this.resetIndex=params.index
                                                            }
                                                    }
                                              },'重置密码')
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
                        name:'小明',
                        phone:12324678865,
                        suborganize:'常乐镇党委/常乐镇中心卫生院党支部',
                        political:'中共党员',
                        sex:'男',
                        updatetime:'2015-06-01',
                        operation:'操作'
                        
                    },
                    {
                        num:2,
                        name:'小明',
                        phone:12324678865,
                        suborganize:'常乐镇党委/常乐镇中心卫生院党支部',
                        political:'中共党员',
                        sex:'男',
                        updatetime:'2015-06-01',
                        operation:'操作'
                        
                    },
                    {
                        num:3,
                        name:'小明',
                        phone:12324678865,
                        suborganize:'常乐镇党委/常乐镇中心卫生院党支部',
                        political:'中共党员',
                        sex:'男',
                        updatetime:'2015-06-01',
                        operation:'操作'
                        
                    },
                    {
                        num:4,
                        name:'小明',
                        phone:12324678865,
                        suborganize:'常乐镇党委/常乐镇中心卫生院党支部',
                        political:'中共党员',
                        sex:'男',
                        updatetime:'2015-06-01',
                        operation:'操作'
                        
                    },
                    {
                        num:5,
                        name:'小明',
                        phone:12324678865,
                        suborganize:'常乐镇党委/常乐镇中心卫生院党支部',
                        political:'中共党员',
                        sex:'男',
                        updatetime:'2015-06-01',
                        operation:'操作'
                        
                    },
                   
                ],
                // 政治面貌
                political:['中共党员','中共预备党员','入党积极分子','共青团员','民革党员','民盟盟员','民建会员','民进会员','农工党党员','致公党党员','九三学社社员','台盟盟员','无党派人士','群众','其他'],
                // 人员分类
                personnel:['国家机关负责人','党政机关工作人员','企业负责人','事业单位负责人','专业技术人员','办事人员和有关人员','商业、服务业人员','农业生产人员','林业生产人员','畜牧业生产人员','渔业生产人员','水利业生产人员','生产、运输设备操作人员及有关人员军人','其他从业人员','聘用人员'],
                // 岗位
                station:[],
                // 民族
                national:[],
                // 人员编制
                staffestablish:['公务员','参照公务员','行政编制','全额拨款事业编制','差额拨款事业编制','聘用'],
                // 职业分类
                classification:['工人','农民','教师','学生','公务员','军人','其他'],
                // 行政职务
                adminposition:['厅局级正职','厅局级副职','县处级正职','县处级副职','乡科级正职','乡科级副职','科员','办事员'],
                // 学历
                education:['博士后','博士','硕士','本科','大专','中专','高中','初中','其他'],
                // 工作状态
                jobstatus:['在职','停职','离职','退休','试用期'],
                positionlevel:['正市','副市','正区','副区','正县','副县','正局','副局','正处','副处','正科','副科','科员','无'],
                maritalstatus:['已婚','未婚','离异'],


        }
    },
    methods:{
        // 导出数据
        exportData (type) {
                
                if (type === 1) {
                    this.$refs.table.exportCsv({
                        filename: 'The original data'
                    });
                } else if (type === 2) {
                    this.$refs.table.exportCsv({
                        filename: 'Sorting and filtering data',
                        original: false
                    });
                } else if (type === 3) {
                    this.$refs.table.exportCsv({
                        filename: 'Custom data',
                        columns: this.columns8.filter((col, index) => index < 4),
                        data: this.data7.filter((data, index) => index < 4)
                    });
                }     
        },

        onSeach(){
            this.current = 1;
            // this.loadUser();
        },
         show (index) {
            this.$Modal.info({
            title: `${this.data1[index].name}所具有的权限`,
            content: `角色名称 : <span style="font-size:15px;color:red;font-weight:600;">${this.data1[index].political}</span>`
        //   content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
        })
      },
      remove (index) {
        this.data6.splice(index, 1);
      },



        // 导入弹框确认按钮
        ok () {
                this.$Message.info('点击了确定');
            },
            cancel () {
                this.$Message.info('点击了取消');
            },
        // 文件导入
        handleFormatError(file){
                this.$Notice.warning({
                    title: '文件格式不正确',
                    desc: '文件 ' + file.name + ' 格式不正确，请上传.xls,.xlsx文件。'
                })
            },
            handleSuccess(res,file){
                if(res.errcode === 0){
                    this.dialoLead = false
                    this.$Message.success("数据导入成功！")
                    this._getBookList()
                    this.$refs.upload.clearFiles()
                }
            },
            handleError(error,file){
                this.$Message.error("数据导入失败！")
            },
        
        //详细信息
        birthChange(daterange){
            this.detailinfo.birtthday=daterange
        },
        joinChange(daterange){
            this.detailinfo.jointime=daterange
        },
        workChange(daterange){
            this.detailinfo.worktime=daterange
        },
        // 信息保存
        handleSubmit(name){
            
            console.log(this.selfinfo)
            console.log(this.detailinfo)
        },
        hideModel:function(name){
                this.$refs[name].resetFields();
                this.addPartymem = false;
            },
        // 弹出框
        //  ok () {
        //         this.$Message.info('点击了确定');
        //     },
        //     cancel () {
        //         this.$Message.info('点击了取消');
        //     },
        changepage(value){
            this.current = value;
            // this.loadUser();
        },
        onChangePageSize(){
             this.pageSize = value;
            // this.loadUser();
        },

        rowClassName (row, index) {
                if (index === 1) {
                    return 'demo-table-info-row';
                } else if (index === 3) {
                    return 'demo-table-error-row';
                }
                return '';
            }

    },
    mounted:function(){
      
    }
}
</script>

<style scoped>
/* .ivu-dropdown-menu{
    z-index: 500 !important;
} */
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
