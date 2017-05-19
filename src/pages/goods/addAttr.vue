<template>
   <div class="addAttr">
        <Breadcrumb>
             <Breadcrumb-item>商品信息</Breadcrumb-item>
            <Breadcrumb-item>
                <router-link to='/productAttribute'>
                    商品属性
                </router-link>
            </Breadcrumb-item>
             <Breadcrumb-item>添加属性</Breadcrumb-item>
         </Breadcrumb>
         <Form :model="data" ref='attrform' :label-width="120" :rules='attrRules'>
             
            <Row class="fileHandle" type='flex' justify='center'>
                <Col span='7'>
                    <Form-item label="属性名称：" prop="name">
                        <Input v-model="data.name" style="width: 200px" placeholder="必填"></Input>
                    </Form-item>
                </Col>
                <Col span='7'>
                    <Form-item label="属性描述：">
                        <Input v-model="data.description" style="width: 200px"></Input>
                    </Form-item>
                </Col>
                <Col span='7'>
                    <Form-item label="属性编码：">
                        <Input v-model="data.code" style="width: 200px"></Input>
                    </Form-item>
                </Col>
            </Row>
         </Form>
        <div class="fileHandle">
            <div class="table">
                <div class="table-header">
                    <div class="table-td">属性值名称</div>
                    <div class="table-td">属性值编码</div>
                    <div class="table-td">属性值描述</div>
                    <div class="table-td">排序</div>
                    <div class="table-td">操作</div>
                </div>
                <div class="table-tbody">
                    <div class="table-tr" v-for='(item,index) in data.values' :key='index'>
                        <div class="table-td">
                            <Input v-model="item.name" placeholder="请输入属性值名称"></Input>
                        </div>
                        <div class="table-td">
                            <Input v-model="item.code"></Input>
                        </div>
                        <div class="table-td">
                            <Input v-model="item.description"></Input>
                        </div>
                        <div class="table-td">
                            <Input v-model="item.orderNum"></Input>
                        </div>
                        <div class="table-td">
                            <Button type='text' @click='add'>增加</Button>
                            <Button type="text" @click="del(index)">删除</Button>
                        </div>
                    </div>
                </div>
            </div>
         </div>
        
         <Row type="flex" justify="center" class="code-row-bg addFooter" style='margin-top : 40px;'>
            <Col span="3">
                <Button type="warning" size="large" long @click.native='save("formItem")'>保存并新增</Button>
            </Col>
        </Row>

   </div>
</template>
<script>
import api from '@/api/api'

export default {
    name : 'addAttr',
    mounted () {
        const _this = this;
        if(this.$route.params.id) {
            console.log(this.$route.params.id);
            const id = this.$route.params.id;
            _this.axios(api.productAttr + id + api.queryById)
                .then(function(res) {
                    console.log(res);
                    const data = res.data.datas;
                    // _this.data = res.data.datas;
                    _this.data.id = data.id;
                    _this.data.name = data.name;
                    _this.data.code = data.code;
                    _this.data.description = data.description;
                    _this.data.values = res.data.datas.productAttributeValues;
                    _this.isModify = true;
                })
                .catch(function(err){
                    console.log(err);
                })
        }


    },
    data () {
        return {
            isModify : false,
            data : {
                name : '',
                code : '',
                description : '',
                values : [
                    {
                        name : '',
                        code : '',
                        orderNum : '',
                        description : ''
                    }
                ]
            },
            status : false,
            attrRules : {
                name : [
                    {required: true, message: '请输入商品名称', trigger: 'blur'}
                ],
                attrValue : [
                    {required : true , message : '请输入商品属性值' , trigger : 'blur'}
                ]
            }
            
        }
    },
    computed : {
        
    },
    methods: {
        add () {
            console.log(this.data);

            const values = {
                name : '',
                code : '',
                orderNum : '',
                description : ''
            }
            this.data.values.push(values);
            console.log(this.data.values);
        },
        del (index) {
            /*if(this.data.values.length == 1) {
                this.$Message.warning('属');
            }*/
            const _this = this;

            this.$Modal.confirm({
                title: '确认框',
                content: '<p>确定要删除商品属性值吗</p>',
                onOk: () => {
                    if(this.isModify) {
                        if(this.data.values[index].id) {
                            _this.axios(api.productAttr + this.data.values[index].id + api.productAttrValue)
                                .then(function(res) {
                                    console.log(res);
                                    if(res.data.status == 1) {
                                        _this.data.values.splice(index,1);
                                    }else {
                                        _this.$Message.error(res.data.message);
                                    }
                                })
                                .catch(function(err){
                                    console.log(err);
                                })
                        }else {
                            this.data.values.splice(index,1);
                        }
                    }else {
                        this.data.values.splice(index,1);
                    }
                }
            });
        },
        save () {
            const _this = this;
            this.$refs['attrform'].validate((valid) => {
                if (valid) {
                    if(this.data.values.length == 0) {
                         _this.status = true;
                         console.log(this.data);
                         return;
                    }
                    this.data.values.forEach(function(item,index) {
                       if(item.name == '' || item.name == undefined ) {
                           _this.$Message.error('属性值名称不能为空');
                           _this.status = false;
                           return;
                       } else {
                            _this.status = true;
                       }
                   })
                } else {
                    this.$Message.error('属性名称不能为空');
                }
            })

            if(this.status) {
                if(!this.isModify) {
                    _this.axios({
                        method : 'post',
                        header : {
                            "Content-Type" : 'application/x-www-form-urlencoded'
                        },
                        url :api.productAttr + api.add,
                        data : api.jsonData(_this.data)
                    })
                    .then(function(res) {
                        console.log(res);
                        if(res.data.status) {
                            _this.$router.push('/productAttribute');
                        }
                    })
                    .catch(function(err){
                        console.log(err);
                    })
                }else {
                    _this.axios({
                        method: 'post',
                        header : {
                            "Content-Type" : 'application/x-www-form-urlencoded'
                        },
                        url : api.productAttr + api.modify,
                        data : api.jsonData(_this.data)
                    })
                        .then(function(res) {
                            console.log(res);
                            if(res.data.status == 1) {
                                _this.$router.push('/productAttribute');
                            }
                        })
                        .catch(function(err){
                            console.log(err);
                        })
                }
            }

            
        }
    }
}
</script>

<style scoped>
.table {
    display: table;
    width: 100%;
    margin: 10px;
}
.child-table {
    display: table;
    width: 200%;
}
.table-header {
    display: table-header-group;
    background : #f5f7f9;
    border: 1px solid #ddd;
    /*color: #fff;*/
}
.table-tbody {
    display: table-row-group;
}
.table-tr {
    display: table-row;
    background: #fff;
}
.table-tr:hover {
    background: #f9f9f9;
}
.table-td {
    display: table-cell;
    height: 30px;
    width: auto;
    vertical-align: middle;
    text-align: center;
    border-bottom: 1px solid #ddd;
    padding: 10px 20px;
}

</style>
