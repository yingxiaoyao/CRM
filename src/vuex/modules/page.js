export default{
    state:{
         customerPage : 1,  //客户列表 页码
    },
    mutations:{
        customerPage : (state , page ) => {
            state.customerPage = page;
        }
    },
}