
import axios from 'axios'
const actions = {
	login : function(store,userInfo,fn) {
		// axios(context.state.host+'/gainList',{params : context.state.user.userInfo})
		console.log(userInfo);
		axios(store.state.host + '/verifyUser.do',{params : userInfo})
            .then(fn)
             .catch(function (error) {
               console.log(error);
             });
	},
	register : function (context) {
		axios({
		  method: 'post',
		  url: context.state.host + '/resg',
		  data: {
		    firstName: 'Fred',
		    lastName: 'Flintstone'
		  }
		})
		.then(function (response) {
		   console.log(response);
		 })
		 .catch(function (error) {
		   console.log(error);
		 });
	}
}

export default actions