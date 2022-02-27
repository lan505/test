<template>
	<div>
		<Modal v-model="dialog" title="部门新增" :width="800" :mask-closable="false" @on-visible-change="visibleChange">
			<div class="form scroll">
				<Form ref="form" :model="form" :label-width="80" :rules="validate">
					<FormItem label="父级部门" prop="treeParentId">
						<Treeselect v-model="form.treeParentId" :options="formControlData.treeParent" :normalizer="normalizerTreeDepartParent" :autoLoadRootOptions="false" loadingText="搜索中" placeholder="" noChildrenText="暂无数据" noOptionsText="暂无数据" noResultsText:="暂无数据" />
					</FormItem>
                    <FormItem label="部门编号" prop="departCode">
                        <Input v-model="form.departCode" clearable></Input>
                    </FormItem>
					<FormItem label="部门名称" prop="departName">
						<Input v-model="form.departName" clearable></Input>
					</FormItem>
					<FormItem label="部门排序" prop="departSort">
						<Input v-model.number="form.departSort" clearable></Input>
					</FormItem>
					<FormItem label="备注" prop="comment">
						<Input v-model="form.comment" type="textarea" maxlength="512" show-word-limit :autosize="{minRows: 5, maxRows: 5}"></Input>
					</FormItem>
				</Form>
			</div>
			<div slot="footer">
				<Button type="text" size="large" @click="close">取消</Button>
				<Button type="primary" size="large" @click="save">确定</Button>
			</div>
		</Modal>
	</div>
</template>
<script>
import {
    saveDepart,
    queryDepartTreeNode,
    existsDepartCode,
    existsDepartName,
    queryDictItemAll
} from "@/assets/js/api/requestSystem";
export default {
    created() {},
    data() {
        return {
            formControlData: {
                departType: null,
                treeParent: null
            },
            dialog: false,
            form: {
                departCode: null,
                departName: null,
                departSort: null,
                comment: null
            },
            validate: {
                departCode: [
                    {
                        message: "请输入部门编号",
                        trigger: "blur"
                    },
                    {
                        min: 1,
                        max: 32,
                        message: "部门编号长度为1-10位",
                        trigger: "blur"
                    },
                    {
                        trigger: "blur",
                        validator: (rule, value, callback) => {
                            this.verifyDepartCode(rule, value, callback);
                        }
                    }
                ],
                departName: [
                    {
                        required: true,
                        message: "请输入部门名称",
                        trigger: "blur"
                    },
                    {
                        min: 1,
                        max: 32,
                        message: "部门名称长度为1-20位",
                        trigger: "blur"
                    },
                    {
                        trigger: "blur",
                        validator: (rule, value, callback) => {
                            this.verifyDepartName(rule, value, callback);
                        }
                    }
                ],
                departSort: [
                    {
                        type: "number",
                        message: "请输入数字",
                        trigger: "blur"
                    }
                ],
                comment: [
                    {
                        max: 512,
                        message: "备注最大长度为512个字符",
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    methods: {
        load() {
            this.dialog = true;
            this.loadDepartType();
            this.loadTreeDepartParent();
        },
        close() {
            this.$refs.form.resetFields();
            this.dialog = false;
        },
        save() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    saveDepart(this.form).then(res => {
                        this.close();
                        this.$emit("loadTableData");
                        this.$Message.success("提交成功");
                    });
                }
            });
        },
        visibleChange(data) {
            if (!data) {
                this.close();
            }
        },
        loadDepartType() {
            queryDictItemAll({
                dictIndexCode: this.globalConsts.dictIndexCode.departType
            }).then(res => {
                this.formControlData.departType = this.globalHelper.mapKeyValue(
                    res,
                    "dictItemKey",
                    "dictItemValue"
                );
            });
        },
        loadTreeDepartParent() {
            queryDepartTreeNode().then(res => {
                this.formControlData.treeParent = res;
            });
        },
        normalizerTreeDepartParent(node) {
            return {
                id: node.id,
                label: node.title,
                children: node.children
            };
        },
        verifyDepartName(rule, value, callback) {
            if (value != null) {
                existsDepartName({
                    departName: value
                }).then(res => {
                    if (res) {
                        callback(new Error("部门名称已存在，请重新输入"));
                    } else {
                        callback();
                    }
                });
            } else {
                callback();
            }
        },
        verifyDepartRouter(rule, value, callback) {
            if (value != null) {
                existsDepartRouter({
                    departRouter: value
                }).then(res => {
                    if (res) {
                        callback(new Error("部门路由已存在，请重新输入"));
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
.form {
    width: 100%;
    height: 400px;
    overflow-y: auto;
    padding-right: 15px;
}
</style>
