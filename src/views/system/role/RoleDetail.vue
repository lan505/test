<!--
 * @Description  : 
 * @Autor        : lan505
 * @Version      : 1.0
 * @Date         : 2021-02-25 12:09:38
 * @LastEditTime : 2022-01-13 17:20:26
-->
<template>
	<div>
		<div>
			<Row class="row-space" :gutter="16">
				<Col span="4" class="col-right-aligen">角色编号</Col>
				<Col span="20">{{form.roleCode}}</Col>
			</Row>
			<Row class="row-space" :gutter="16">
				<Col span="4" class="col-right-aligen">角色名称</Col>
				<Col span="20">{{form.roleName}}</Col>
			</Row>
			<Row class="row-space" :gutter="16">
				<Col span="4" class="col-right-aligen">备注说明</Col>
				<Col span="20">{{form.comment}}</Col>
			</Row>
			<Row class="row-space" :gutter="16">
				<Col span="4" class="col-right-aligen">创建人员</Col>
				<Col span="20">{{form.creator}}</Col>
			</Row>
			<Row class="row-space" :gutter="16">
				<Col span="4" class="col-right-aligen">创建时间</Col>
				<Col span="20">{{form.createTime}}</Col>
			</Row>
			<Row class="row-space" :gutter="16">
				<Col span="4" class="col-right-aligen">编辑人员</Col>
				<Col span="20">{{form.editor}}</Col>
			</Row>
			<Row class="row-space" :gutter="16">
				<Col span="4" class="col-right-aligen">编辑时间</Col>
				<Col span="20">{{form.editTime}}</Col>
			</Row>
		</div>
		<div class="lx-form-footer">
			<Button type="text" size="large" @click="close">关闭</Button>
			<Button type="primary" size="large" @click="save">确定</Button>
		</div>
	</div>
</template>
<script>
import { detailRole } from "@/assets/js/api/requestSystem";
export default {
	created() { },
	data() {
		return {
			dialog: false,
			form: {
				roleName: null,
				roleCode: null,
				comment: null,
				creator: null,
				createTime: null,
				editor: null,
				editTime: null,
			},
		};
	},
	methods: {
		resetDialogForm() {
			console.log("resetForm");
		},
		load(roleId) {
			this.dialog = true;
			detailRole({ roleId }).then((res) => {
				this.form = res;
			});
		},
		close() {
			this.dialog = false;
		},
	},
};
</script>
<style scorep>
</style>
