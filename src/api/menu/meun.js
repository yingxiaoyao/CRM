import axios from 'axios'
const actions = {
	menuJson : function(store,fn) {
		axios(store.state.host + '/sys/menu/fetchUserMenus.do')
            .then(fn)
	        .catch(function (error) {
	          console.log(error);
	        });
	}
}

export default actions