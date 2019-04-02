export default [
  {
    path: '/',
    component: r => require.ensure([], () => r(require('./home.vue')), 'home'),
    name: '人事管理',
    iconCls: 'el-icon-menu',//图标样式class
    children: [
        // { path: '/main', component: Main, name: '主页', hidden: true },
        { path: '/employee', component: r => require.ensure([], () => r(require('./employee/index.vue')), 'employee'), name: '职员管理', iconCls: 'el-ali-thirdyonghuguanli1'},
        // { path: '/form', component: Form, name: 'Form' },
        // { path: '/user', component: user, name: '列表' },
    ]
  },
  {
    path: '/',
    component: r => require.ensure([], () => r(require('./home.vue')), 'home'),
    name: '',
    iconCls: 'el-icon-menu',//图标样式class
    leaf: true,//只有一个节点
    children: [
        { path: '/system', component: r => require.ensure([], () => r(require('./system/index.vue')), 'system'), name: '系统管理' },
    ]
  },
  {
    path: '/',
    component: r => require.ensure([], () => r(require('./home.vue')), 'home'),
    name: '',
    iconCls: 'el-icon-menu',//图标样式class
    leaf: true,//只有一个节点
    children: [
        { path: '/order', component: r => require.ensure([], () => r(require('./system/index.vue')), 'system'), name: '订单管理' },
    ]
  },
  {
    path: '/',
    component: r => require.ensure([], () => r(require('./home.vue')), 'home'),
    name: '报表管理',
    iconCls: 'el-icon-menu',//图标样式class
    children: [
        { path: '/charts/line', component: r => require.ensure([], () => r(require('./charts/index.vue')), 'system'), name: '线性报表', iconCls: 'el-ali-thirdtubiao-zhexiantu'},
    ]
  },
]
