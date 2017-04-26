// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import routes from './router/routes'
import axios from 'axios'
import VueCookie from 'vue-cookie'
import VueAxios from 'vue-axios'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

Vue.use(ElementUI)
Vue.use(VueAxios,axios)
Vue.use(VueRouter)
Vue.use(VueCookie)
const router =new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  name = VueCookie.get('username')
  if(to.path=='/login'){

    if(name!='null'){
      next('/')
    }
    else{
      next()
    }
  }
  else{
    if(name!='null'){
      next()
    }
    else{
      next('/login')
    }
  }
})


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
