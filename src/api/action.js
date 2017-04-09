
import axios from 'axios'
const actions = {
	login : function(userInfo) {
		// axios(context.state.host+'/gainList',{params : context.state.user.userInfo})
		axios(this.$state.state.host + '/verifyUser.do',{params : this.$state.user.userInfo})
            .then(function (response) {
               	if(response.data.status == 1) {
               		this.$router.push('/');
               	}
             })
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