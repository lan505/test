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
			<Button type="text" size="large" @click="formClose">关闭</Button>
		</div>
	</div>
</template>
<script>
import { detailRole } from "@/assets/js/api/requestSystem";
import mixinsForm from "@/mixins/mixinsForm";
export default {
	created() { },
	mixins: [mixinsForm],
	data() {
		return {
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
		formInit(data) {
			this.loadDetailRole(data.roleId);
		},
		formClose() {
			this.$emit("closeDialog");
		},
		loadDetailRole(roleId) {
			detailRole({ roleId }).then((res) => {
				this.form = res;
			});
		}
	},
};
</script>
<style scorep>
</style>
