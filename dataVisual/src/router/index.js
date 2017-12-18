import Vue from 'vue'
import Router from 'vue-router'
import DataList from '@/components/DataList'
import EchartVisual from '@/components/EchartVisual'
import D3Visual from '@/components/D3Visual'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'DataList',
      component: DataList
    },
    {
      path: '/echart',
      name: 'EchartVisual',
      component: EchartVisual
    },
    {
      path: '/d3',
      name: 'D3Visual',
      component: D3Visual
    }
  ]
})
