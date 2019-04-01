export default [{
    path: '/login',
    hidden: true,
		meta: {
			title: '登录',
			notLoading: true,
		},
		component: r => require.ensure([], () => r(require('./login.vue')), 'login')
	},
]
