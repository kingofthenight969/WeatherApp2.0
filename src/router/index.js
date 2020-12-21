import Vue from 'vue'
import VueRouter from 'vue-router'
import WeatherForecast from '../views/WeatherForecast.vue'
import SelectLocation from '../views/SelectLocation.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'WeatherForecast',
    component: WeatherForecast
  },
  {
    path: '/location',
    name: 'SelectLocation',
    component: SelectLocation,
    meta: { 
      hasLocation: true 
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(!sessionStorage.location && to.matched.some(record => record.meta.hasLocation)) {
    next({
      path: '/',
    })
  } else {
    next()
  }
})

export default router
