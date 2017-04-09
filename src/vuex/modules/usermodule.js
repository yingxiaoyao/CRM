export default{
    state:{
        userInfo: {

    	},
    	logindata : {}
    },
    mutations:{
        showUserName(state){
            alert(state.userInfo.name);
        },
        updateUserInfo (state,msg) {
            state.userInfo = '';
            state.userInfo = msg;
        }
    },
}