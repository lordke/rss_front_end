
import index from '../components/slide.vue'
import entrydiv from '../components/entrydiv.vue'
import post from '../components/post.vue'
import login from '../components/login.vue'

export default
[
  {
    path:'/login',
    component:login
  },
    {
      path: '/',
      name: 'Hello',
      component: index,
      children:[{
        name:'feeds',
        path:':feedid',
        component:entrydiv,
        children:[
          {
            name:'post',
            path:':postid',
            component:post,
          }
        ]
      }]
    },


]

