<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model.trim="filters.name" placeholder="订单号"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getOrders">查询</el-button>
				</el-form-item>
				<!-- <el-form-item>
					<el-button type="primary" @click="handleAdd">新增</el-button>
				</el-form-item> -->
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange" @sort-change="sortChange" style="width: 100%;">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<!-- <el-table-column type="index" width="60">
			</el-table-column> -->
			<el-table-column prop="orderId" label="订单号" min-width="150" sortable>
			</el-table-column>
			<el-table-column prop="orderStatus" label="订单状态" width="100" :formatter="formatStatus" sortable>
			</el-table-column>
			<el-table-column prop="orderType" label="订单类型" width="120" :formatter="formatType" sortable>
			</el-table-column>
			<el-table-column prop="orderTime" label="下单时间" min-width="120" sortable>
			</el-table-column>
			<el-table-column prop="orderAmount" label="订单金额" width="180">
			</el-table-column>
      <el-table-column prop="orderRealAmount" label="实际金额" width="180">
			</el-table-column>
			<el-table-column label="操作" width="150">
				<template slot-scope="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
			<el-pagination layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange" background :page-sizes="[10, 20, 30, 50, 100]" :page-size="pageSize" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

		<!--编辑界面-->
		<el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
				<el-form-item label="订单编号" prop="name">
					<el-input v-model="editForm.orderId" auto-complete="off" disabled></el-input>
				</el-form-item>
				<el-form-item label="订单状态">
					<el-select v-model="editForm.orderStatus" placeholder="请选择">
            <el-option
              v-for="item in orderStatusList"
              :key="item.index"
              :label="item.value"
              :value="item.index">
            </el-option>
          </el-select>
				</el-form-item>
				<el-form-item label="订单类型">
					<el-select v-model="editForm.orderType" placeholder="请选择">
            <el-option
              v-for="item in orderTypeList"
              :key="item.index"
              :label="item.value"
              :value="item.index">
            </el-option>
          </el-select>
				</el-form-item>
				<el-form-item label="下单时间">
					<el-date-picker type="datetime" placeholder="选择日期" v-model="editForm.orderTime" disabled></el-date-picker>
				</el-form-item>
				<el-form-item label="订单金额">
					<el-input v-model="editForm.orderAmount" disabled></el-input>
				</el-form-item>
        <el-form-item label="实际金额">
					<el-input v-model="editForm.orderRealAmount"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>

		<!--新增界面-->
		<el-dialog title="新增" :visible.sync="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
				<el-form-item label="订单编号" prop="name">
					<el-input v-model="addForm.orderId" auto-complete="off" disabled></el-input>
				</el-form-item>
				<el-form-item label="订单状态">
					<el-select v-model="addForm.orderStatus" placeholder="请选择">
            <el-option
              v-for="item in orderStatusList"
              :key="item.index"
              :label="item.value"
              :value="item.index">
            </el-option>
          </el-select>
				</el-form-item>
				<el-form-item label="订单类型">
					<el-select v-model="addForm.orderType" placeholder="请选择">
            <el-option
              v-for="item in orderTypeList"
              :key="item.index"
              :label="item.value"
              :value="item.index">
            </el-option>
          </el-select>
				</el-form-item>
				<el-form-item label="下单时间">
					<el-date-picker type="datetime" placeholder="选择日期" v-model="addForm.orderTime"></el-date-picker>
				</el-form-item>
				<el-form-item label="订单金额">
					<el-input v-model="addForm.orderAmount"></el-input>
				</el-form-item>
        <el-form-item label="实际金额">
					<el-input v-model="addForm.orderRealAmount"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>
	</section>
</template>

<script>
	// import util from '../../common/js/util'
	import api from './api';
	export default {
		data() {
			return {
				filters: {
					name: ''
				},
				users: [],
        total: 0,
        // 默认当前页
        pageNum: 1,
        // 默认每页记录条数
        pageSize: 10,
				listLoading: false,
				sels: [],//列表选中列
				editFormVisible: false,//编辑界面是否显示
				editLoading: false,
				editFormRules: {
					name: [
						{ required: true, message: '请输入订单编号', trigger: 'blur' }
					]
				},
				//编辑界面数据
				editForm: {
					orderId: '',
          orderType: '',
          orderStatus: '',
          orderTime: '',
          orderAmount: '',
          orderRealAmount: ''
				},
				addFormVisible: false,//新增界面是否显示
				addLoading: false,
				addFormRules: {
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					]
				},
				//新增界面数据
				addForm: {
					orderId: '',
          orderType: '',
          orderStatus: '',
          orderTime: '',
          orderAmount: '',
          orderRealAmount: ''
        },
        // 订单类型
        orderTypeList: [
          {index: -1, value: '--请选择--'},
          {index: 1, value: '普通订单'},
          {index: 2, value: '秒杀订单'},
          {index: 3, value: '全球购订单'},
        ],
        // 订单状态
        orderStatusList: [
          {index: -1, value: '--请选择--'},
          {index: 1, value: '待支付'},
          {index: 2, value: '已支付'},
          {index: 3, value: '待发货'},
          {index: 4, value: '代签收'},
          {index: 5, value: '已签收'},
          {index: 6, value: '交易成功'},
          {index: 7, value: '已取消'},
        ],
			}
		},
		methods: {
			// table排序
			sortChange(column, prop, order) {
				console.log("table sort:", column, prop, order)
			},
			//订单状态显示转换
			formatStatus(row, column) {
				return row.orderStatus == 1 ? '待支付' : row.orderStatus == 2 ? '已支付' : row.orderStatus == 3 ? '待发货' : row.orderStatus == 4 ? '代签收' : row.orderStatus == 5 ? '已签收' : row.orderStatus == 6 ? '交易成功' : row.orderStatus == 7 ? '已取消' : '未知'
      },
      // 订单类型
			formatType(row, column) {
				return row.orderType == 1 ? '普通订单' : row.orderType == 2 ? '秒杀订单' : row.orderType == 3 ? '全球购订单' : '未知'
      },
      // 日期
      formatDateTime(row, column) {
        //20070312171355
        let pattern = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/
        console.log(row)
        return row.orderTime.replace(pattern, '$1-$2-$3 $4:$5:$6');
      },
			// 首页变动
			handleCurrentChange(val) {
				this.pageNum = val
				this.getOrders()
			},
			// 每页条数变动
			handleSizeChange(val) {
				this.pageSize = val
				this.getOrders()
			},
			// 获取订单列表
			getOrders() {
				let para = {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
					name: this.filters.name
				};
				this.listLoading = true;
				api.queryAllByMock(para).then((res) => {
          console.log("订单列表数据：", res.data)
          if (res.data) {
            this.total = res.data.data.total
            this.users = res.data.data.orderList
            console.log(223, this.total, this.users)
          }
					this.listLoading = false
				})
      },
      
			// 删除单条记录
			handleDel: function (index, row) {
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = { id: row.id };
					removeUser(para).then((res) => {
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getOrders();
					});
				}).catch(() => {
				})
			},
			//显示编辑界面
			handleEdit(index, row) {
        this.editFormVisible = true;
				this.editForm = Object.assign({}, row);
        console.log(111, index, row, this.editFormVisible, this.editForm)
			},
			//显示新增界面
			handleAdd() {
				this.addFormVisible = true;
				this.addForm = {
					name: '',
					sex: -1,
					age: 0,
					birth: '',
					addr: ''
				}
			},
			//编辑
			editSubmit() {
				this.$refs.editForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.editLoading = true;
							let para = Object.assign({}, this.editForm);
							para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
							editUser(para).then((res) => {
								this.editLoading = false;
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['editForm'].resetFields();
								this.editFormVisible = false;
								this.getOrders();
							});
						});
					}
				});
			},
			//新增
			addSubmit() {
				this.$refs.addForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.addLoading = true;
							let para = Object.assign({}, this.addForm);
							para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
							addUser(para).then((res) => {
								this.addLoading = false;
								this.$message({
									message: '提交成功',
									type: 'success'
								})
								this.$refs['addForm'].resetFields()
								this.addFormVisible = false
								this.getOrders()
							})
						})
					}
				})
			},
			selsChange: function (sels) {
				console.log("选择变换：", sels)
				this.sels = sels;
			},
			//批量删除
			batchRemove() {
				var ids = this.sels.map(item => item.id).toString()
				this.$confirm('确认删除选中记录吗？', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true
					let para = { ids: ids }
					batchRemoveUser(para).then((res) => {
						this.listLoading = false
						this.$message({
							message: '删除成功',
							type: 'success'
						})
						this.getOrders();
					})
				}).catch(() => {
				})
			}
		},
		created() {
			this.getOrders()
		},
		mounted() {
			
		}
	}
</script>

<style scoped>
</style>