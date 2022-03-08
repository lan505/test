<template>
	<div>
		<div class="lx-form">
			<Form ref="form" :model="form" :label-width="110" :rules="validate">
				<FormItem label="字典键" prop="dictItemKey">
					<Input v-model="form.dictItemKey" clearable></Input>
				</FormItem>
				<FormItem label="父级字典键" prop="treeParentId">
					<LxTreeSelect :value.sync="form.treeParentId" :queryDataParam="{ dictIndexCode: form.dictIndexCode }" :queryDataUrl="this.globalActionUrl.system.dictItem.queryDictItemChildren" :treeFieldMap="{id: 'dictItemKey', label: 'dictItemValue'}"></LxTreeSelect>
				</FormItem>
				<FormItem label="字典值" prop="dictItemValue">
					<Input v-model="form.dictItemValue" clearable></Input>
				</FormItem>
				<FormItem label="排序" prop="dictItemSort">
					<InputNumber :min="0" v-model="form.dictItemSort" style="width: 100%;"></InputNumber>
				</FormItem>
				<FormItem label="备注说明" prop="comment">
					<Input v-model="form.comment" type="textarea" maxlength="512" show-word-limit :autosize="{minRows: 5, maxRows: 5}"></Input>
				</FormItem>
			</Form>
		</div>
		<div class="lx-form-footer">
			<Button type="text" size="large" @click="formClose">取消</Button>
			<Button type="primary" size="large" @click="formSave">确定</Button>
		</div>
	</div>
</template>
<script>
import {
	saveDictItem,
	existsDictItemKey,
	existsDictItemValue
} from "@/assets/js/api/requestSystem";
import mixinsForm from "@/mixins/mixinsForm";
export default {
	created() { },
	mixins: [mixinsForm],
	data() {
		return {
			formControlData: {
				lsDictIndex: [],
				treeParentId: null
			},
			form: {
				dictIndexCode: null,
				treeParentId: null,
				dictItemKey: null,
				dictItemValue: null,
				comment: null
			},
			validate: {
				dictItemCode: [
					{
						required: true,
						message: "请选择字典类别编号",
						trigger: "blur"
					}
				],
				treeParentId: [
					{
						message: "请选择属性值",
						trigger: "blur"
					}
				],
				dictItemValue: [
					{
						required: true,
						message: "请输入字典值",
						trigger: "blur"
					},
					{
						max: 32,
						message: "字典值最大长度为32位",
						trigger: "blur"
					}
				],
				comment: [
					{
						type: "string",
						max: 512,
						message: "备注说明最大长度为512个字符",
						trigger: "blur"
					}
				]
			}
		};
	},
	methods: {
		formInit(data) {
			this.form.dictIndexCode = data.dictIndexCode;
			console.log(this.form);
		},
		formClear() {
			this.$refs.form.resetFields();
		},
		formClose() {
			this.formClear();
			this.$emit("closeDialog");
		},
		formSave() {
			this.$refs.form.validate((valid) => {
				if (valid) {
					saveDictItem(this.form).then((res) => {
						this.formClose();
						this.$emit("loadTableData", true);
						this.$Message.success("提交成功");
					});
				}
			});
		},
		verifyDictItemKey(rule, value, callback) {
			if (value != null) {
				existsDictItemKey({
					dictIndexCode: value,
					dictItemKey: value
				}).then((res) => {
					if (res) {
						callback(new Error("字典类名称已存在，请重新输入"));
					} else {
						callback();
					}
				});
			} else {
				callback();
			}
		},
		verifyDictItemValue(rule, value, callback) {
			if (value != null) {
				existsDictItemValue({
					dictIndexCode: value,
					dictItemValue: value
				}).then((res) => {
					if (res) {
						callback(new Error("字典类名称已存在，请重新输入"));
					} else {
						callback();
					}
				});
			} else {
				callback();
			}
		}
	}
};
</script>
<style scorep>
</style>