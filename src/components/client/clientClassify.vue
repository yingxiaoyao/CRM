<template>
    <div class="clientClassify">
        <Breadcrumb>
            <Breadcrumb-item>首页</Breadcrumb-item>
            <Breadcrumb-item>客户管理</Breadcrumb-item>
            <Breadcrumb-item>客户分类</Breadcrumb-item>
        </Breadcrumb>
        <Row type="flex" justify="end" class="fileHandle">
            <div class="buttonM">
                <Button type="warning">新增一级分类</Button>
            </div>
            <div class="buttonM">
                <Button type="info">导入</Button>
            </div>
            <div class="buttonM">
                <Button type="info">导出</Button>
            </div>
            <div class="buttonM">
                <Button type="info">模板下载</Button>
            </div>
        </Row>
        <div class="fileHandle">
            <Table :columns="columns1" width='100%' :data="data1" size='small'></Table>
        </div>
    </div>
</template>

<script>
    import api from '@/api/api'
export default {
    mounted () {
        // var kid = this.$route.params.id;
    },
    data () {
            return {
                columns1 : [
                    {
                        title : '客户分类',
                        align : 'center',
                        key : 'name'
                    },
                    {
                        title : '操作',
                        key : 'action',
                        align: 'center',
                        render (row, column, index) {
                            return `<i-button type="text" size="small" @click="show(${index})">新增子类</i-button> <i-button type="text" size="small">编辑</i-button> <i-button type='text' size='small' @click='index(${index},"prev")'>上移</i-button> <i-button type='text' size='small' @click='index(${index},"next")'>下移</i-button> <i-button type='text' size='small' @click="remove(${index})">删除</i-button>`;
                        }
                    }
                ],
                data1 : [
                    {
                        name : '办公类',
                        age : 12
                    },
                    {
                        name : '工具类'
                    },
                    {
                        name : '商品类'
                    }
                ]
            }
        },
        methods: {
            show (index) {
                this.$Modal.info({
                    title : '新增分类',
                    content : 'aaa'
                })
            },
            index (index,type) {
                var newValue1,
                 newValue2;
                if(type == 'prev') {
                    if(index == 0) {
                        return;
                    }
                    newValue1 = this.data1[index];
                    newValue2 = this.data1[index-1];
                    this.data1.splice(index-1,2,newValue1,newValue2);
                }else if (type == 'next') {
                    if(index == this.data1.length-1) {
                        return;
                    }
                    newValue1 = this.data1[index+1];
                    newValue2 = this.data1[index];
                    this.data1.splice(index,2,newValue1,newValue2);
                }

            }
        }
    }
</script>

<style scoped>
    .fileHandle {
        margin-top: 16px;
    }
    .buttonM {
        margin-right: 10px;
    }
    .buttonM:nth-last-child(1) {
        margin: 0;
    }
</style>