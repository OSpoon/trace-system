const demo = () => import(/* webpackChunkName: "demo" */ '@/views/demo/index.vue')

export default [
  {
    name: 'demo',
    path: '/demo',
    component: demo,
    meta: {
      title: 'Demo',
      login: false
    }
  }
]
