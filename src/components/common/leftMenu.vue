<template>
    <div class="left-menu" @click='aaa'>
             <Menu :open-names="['openNames']" accordion width='180px'>

                 <Submenu v-for='menu in menuList' :name="menu.id">
                     <template slot="title">
                         <Icon v-bind:type="menu.iconType"></Icon>
                         {{ menu.name }}
                     </template>
                     <router-link to='/' v-for='seconMenu in menu.menus'>
                      <Menu-item :name="seconMenu.id">
                        {{seconMenu.name}}
                      </Menu-item>
                     </router-link>
                 </Submenu>
                 <Submenu name="1">
                      <template slot="title">
                          <Icon type="ios-people"></Icon>
                          用户管理
                      </template>
                      <router-link to='/clientClassify'>
                        <Menu-item name="2-1">客户分类</Menu-item>
                      </router-link>
                      <router-link to='/clinetRank'>
                        <Menu-item name="2-2">客户级别</Menu-item>
                      </router-link>
                      <router-link to='/area'>
                        <Menu-item name="2-3">区域设置</Menu-item>
                      </router-link>
                      <router-link to='/trade'>
                        <Menu-item name="2-4">行业设置</Menu-item>
                      </router-link>
                  </Submenu>
             </Menu>


      <div class="logo">
        <h1>智谷科技</h1>
      </div>
    </div>

</template>

<script>
import api from '@/api/api'
export default {
  name: 'leftMenu',
  mounted () {
     var _this = this;
     this.axios(api.menus)
        .then(function(res){
            // console.log(res);
            _this.menuList = res.data.datas;
            _this.openNames = res.data.datas[0].id;
        })
        .catch(function (error) {
            console.log(error);
        });
  },
  data () { 
    return {
      menuList : '',
      openNames : ''
    }
  },
  methods : {
    aaa (key) {
      
    }
  }
}
</script>

<style scoped>
  .left-menu {
    height: 100%;
    /* overflow-y: auto; */
    background: #fff;
    padding-bottom: 50px;
    width: 180px;
    overflow: hidden;
  }
  .left-menu .logo {
    position: absolute;
    bottom: 10px;
    left: 25px;
    height: 36px;
  }
  .ivu-menu-light {
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
    width: 197px !important;
    /* padding-right: 16px; */
    box-sizing: content-box;
  }
  .ivu-menu-vertical .ivu-menu-item:hover,.ivu-menu-vertical .ivu-menu-submenu-title:hover {
    background : #eee;
    color: inherit;
  }
  .ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu) {
    width: 180px;
    background : #03b8cc;
    color: #fff;
    border: none;
  }
  .ivu-menu-vertical.ivu-menu-light:after {
    width: 0;
  }
  .senc-menu {
    display: flex;
    padding: 20px 0;
  }
  .senc-menu .menu-group {
    padding: 0 20px;
  }
  .senc-menu .menu-group:nth-child(2) {
    border-left: 1px solid #eee;
  }
  .senc-menu .menu-group header {
    padding: 10px 0;
  }
  .senc-menu .menu-group ul li {
    padding: 5px 0;
  }
</style>
