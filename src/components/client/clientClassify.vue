<template>
    <div class="clientClassify">
        <Breadcrumb>
            <Breadcrumb-item href="/">首页</Breadcrumb-item>
            <Breadcrumb-item href="javascript:">客户管理</Breadcrumb-item>
            <Breadcrumb-item>客户分类</Breadcrumb-item>
        </Breadcrumb>
        <Row type="flex" justify="end" class="fileHandle">
            <Col span="2">
                <Button type="info">导入</Button>
            </Col>
            <Col span="2">
                <Button type="info">导出</Button>
            </Col>
            <Col span="2">
                <Button type="info">模板下载</Button>
            </Col>
        </Row>
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
                
            }
        },
        methods: {
            handleSubmit(name) {
                
            }
        }
    }
</script>

<style scoped>
    .fileHandle {
        margin-top: 16px;
    }
</style>