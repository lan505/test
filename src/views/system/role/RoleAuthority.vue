<!--
 * @Description  : 
 * @Autor        : lan505
 * @Version      : 1.0
 * @Date         : 2021-02-25 12:09:38
 * @LastEditTime : 2022-02-22 16:00:55
-->
<template>
	<div>
		<Modal v-model="dialog" title="角色权限分配" :width="600" :mask-closable="false" @on-visible-change="visibleChange">
			<div class="form scroll">
				<Tree ref="tree" :data="authority" show-checkbox></Tree>
			</div>
			<div slot="footer">
				<Button type="text" size="large" @click="formClose">取消</Button>
				<Button type="primary" size="large" @click="formSave">确定</Button>
			</div>
		</Modal>
	</div>
</template>
<script>
import { assignAuthority, queryAuthority } from "@/assets/js/api/requestSystem";
import mixinsForm from "@/mixins/mixinsForm";
export default {
	created() { },
	mixins: [mixinsForm],
	data() {
		return {
			dialog: false,
			authority: [],
			form: {
				roleId: null,
				lsMenuId: []
			}
		};
	},
	methods: {
		formInit(data) {
			this.loadRoleAuthority(data.roleId);
		},
		formClear() {

		},
		formClose() {
			this.$emit("closeDialog");
		},
		loadDetailRole(roleId) {
			detailRole({ roleId }).then((res) => {
				this.form = res;
			});
		},
		formSave() {
			this.fullData();
			assignAuthority(this.form).then((res) => {
				this.formClose();
				this.$Message.success("提交成功");
			});
		},
		loadRoleAuthority(roleId) {
			queryAuthority({ roleId }).then((res) => {
				this.authority = this.recursionTree(res);
			});
		},
		fullData() {
			this.form.lsMenuId = [];
			this.$refs.tree.getCheckedNodes().map((item) => {
				this.form.lsMenuId.push(item.id);
			});
		},
		recursionTree(data) {
			for (let i = 0; i < data.length; i++) {
				// 转换
				data[i].title = data[i].name;
				data[i].expand = true;
				if (data[i].level < 3) {
					data[i].checked = false;
				}
				if (data[i].children != null && data[i].children.length > 0) {
					this.recursionTree(data[i].children);
				}
			}
			return data;
		}
	}
};
</script>
<style scorep>
.ivu-tree-children {
	width: 150px;
}
.form {
	width: 100%;
	height: 400px;
	overflow-y: auto;
}
</style>
