<template>
	<div>
		<div class="lx-form" :style="{ height: '400px' }">
			<Form ref="form" :model="form" :label-width="110" :rules="validate">
				<FormItem label="字典类别编号" prop="dictIndexCode">
					<Input v-model="form.dictIndexCode" clearable></Input>
				</FormItem>
				<FormItem label="字典类别名称" prop="dictIndexName">
					<Input v-model="form.dictIndexName" clearable></Input>
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
	saveDictIndex,
	existsDictIndexCode,
	existsDictIndexName,
} from "@/assets/js/api/requestSystem";
import mixinsForm from "@/mixins/mixinsForm";
export default {
	created() { },
	mixins: [mixinsForm],
	data() {
		return {
			formControlData: {},
			form: {
				dictIndexCode: null,
				dictIndexName: null,
				comment: null,
			},
			validate: {
				dictIndexCode: [
					{
						required: true,
						message: "请输入字典类别编号",
						trigger: "blur",
					},
					{
						trigger: "blur",
						validator: (rule, value, callback) => {
							this.verifyDictIndexCode(rule, value, callback);
						},
					},
				],
				dictIndexName: [
					{
						required: true,
						message: "请输入字典类别名称",
						trigger: "blur",
					},
					{
						max: 32,
						message: "字典类别名称最大长度为32位",
						trigger: "blur",
					},
					{
						trigger: "blur",
						validator: (rule, value, callback) => {
							this.verifyDictIndexName(rule, value, callback);
						},
					},
				],
				comment: [
					{
						type: "string",
						max: 512,
						message: "备注说明最大长度为512个字符",
						trigger: "blur",
					},
				],
			},
		};
	},
	methods: {
		formInit() { },
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
					saveDictIndex(this.form).then((res) => {
						this.formClose();
						this.$emit("loadTableData");
						this.$Message.success("提交成功");
					});
				}
			});
		},
		verifyDictIndexCode(rule, value, callback) {
			if (value != null) {
				existsDictIndexCode({
					dictIndexCode: value,
				}).then((res) => {
					if (res) {
						callback(new Error("字典类编号已存在，请重新输入"));
					} else {
						callback();
					}
				});
			} else {
				callback();
			}
		},
		verifyDictIndexName(rule, value, callback) {
			if (value != null) {
				existsDictIndexName({
					dictIndexName: value,
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
	},
};
</script>
<style scorep>
</style>