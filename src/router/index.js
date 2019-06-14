import Vue from 'vue'
import Router from 'vue-router'
import Slider from '@/pages/slider'
import tag from '@/pages/label'
import editor from '@/pages/editor'
import home from '@/pages/home'
import process from '@/pages/process'
import messaage from '@/pages/article'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Slider,
      redirect:'tag',
      children:[
        {
          path:'/home',
          name:'home',
          component:home
        },
        {
          path:'/tag',
          name:'tag',
          component:tag,
        },
        {
          path:'/editor',
          component:editor,
          name:'editor'
        },
        {
          path:'/editor/:id',
          component:editor,
          name:'editor'
        },
        {
          path:'/process/:id',
          component:process,
          name:'process',
          meta:{
            keepAlive:true
          }
        },
        {
          path:'/messaage',
          name:'messaage',
          component:messaage,
        }
      ]
    }
  ]
})
