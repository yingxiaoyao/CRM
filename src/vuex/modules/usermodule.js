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
        saveUserInfo (state,msg) {
            state.userInfo = '';
            state.userInfo = msg;
        }

    },
}