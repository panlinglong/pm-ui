import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import store from './store'

import {postKeyValueRequest} from './utils/api'
import {postRequest} from './utils/api'
import {putRequest} from './utils/api'
import {getRequest} from './utils/api'
import {deleteRequest} from './utils/api'
import {initMenu} from './utils/menu'
import 'font-awesome/css/font-awesome.min.css'

Vue.prototype.postKeyValueRequest=postKeyValueRequest;
Vue.prototype.postRequest=postRequest;
Vue.prototype.putRequest=putRequest;
Vue.prototype.getRequest=getRequest;
Vue.prototype.deleteRequest=deleteRequest;

Vue.config.productionTip = false

router.beforeEach((to,from,next)=>{
  if (to.path=="/"){
    next();
  }else {
    if (window.sessionStorage.getItem("user")){
      initMenu(router,store);
      next();
    }else {
      next('/?redirect='+to.path);
    }
  }
})

Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
