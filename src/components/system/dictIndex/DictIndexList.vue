<template>
    <div>
        <div class="cm-flex row" style="width: 100%;">
            <div class="cm-flex" style="width: 100px;" v-show="this.showButton(this.globalActionUrl.system.dictIndex.save)">
                <Button type="primary" icon="md-add" @click="showNewForm">新增</Button>
            </div>  
            <div class="cm-flex" style="width: calc(100% - 100px); justify-content: flex-end;">
                <div class="search-btn">
                    <Input v-model="tableData.query.name" clearable>
                        <span slot="prepend">名称</span>
                    </Input>
                </div>
                <div class="search-btn">
                    <Button type="default" icon="md-search" @click="load()">查询</Button>
                </div>
                <div class="search-btn">
                    <Button type="default" icon="md-refresh" @click="refresh()">刷新</Button>
                </div>
                <div class="search-btn">
                    <Button type="default" icon="md-search" @click="reset()">重置</Button>
                </div>
                <div class="search-btn">
                    <Button type="error" icon="md-trash" @click="removeBatch()">删除</Button>
                </div>
            </div>
        </div>
        <TablePage
            ref="tablePage"
            :data="tableData.data"
            :columns="tableData.columns"
            :total="tableData.total"
            :loading="tableData.loading"
            @onSelect="onSelect"
            @onSelectCancel="onSelectCancel"
            @onSelectAll="onSelectAll"
            @onPageSort="onPageSort"
            @onPageIndex="onPageIndex"
            @onPageSize="onPageSize"
        ></TablePage>
        <DictIndexNew ref="newForm" @loadList="loadList"></DictIndexNew>
        <DictIndexEdit ref="editForm" @loadList="loadList"></DictIndexEdit>
        <DictIndexDetail ref="detailForm" @loadList="loadList"></DictIndexDetail>
    </div>
</template>
<script>
import DictIndexNew from "./DictIndexNew";
import DictIndexEdit from "./DictIndexEdit";
import DictIndexDetail from "./DictIndexDetail";
export default {
  created() {
    this.load();
  },
  data() {
    return {
      searchControlData: {},
      tableData: {
        loading: true,
        remove: {
          ids: []
        },
        query: {
          name: null,
          page: {
            current: 1,
            size: 10,
            orders: []
          }
        },
        total: 0,
        data: [],
        columns: [
          {
            type: "selection",
            width: 60,
            align: "center"
          },
          {
            title: "字典类别编号",
            key: "code",
            ellipsis: "true",
            tooltip: "true"
          },
          {
            title: "字典类别名称",
            key: "name",
            ellipsis: "true",
            tooltip: "true",
            sortable: "custom"
          },
          {
            title: "字典项总数",
            key: "subNum",
            ellipsis: "true",
            tooltip: "true",
            sortable: "custom"
          },
          {
            title: "创建人员",
            key: "creator",
            ellipsis: "true",
            tooltip: "true"
          },
          {
            title: "创建时间",
            key: "createTime",
            ellipsis: "true",
            tooltip: "true",
            width: 170
          },
          {
            title: "操作",
            key: "action",
            align: "center",
            width: 250,
            render: (h, params) => {
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      type: "default",
                      size: "small",
                      icon: "md-search"
                    },
                    style: {
                      marginRight: "5px",
                      display: this.showButton(
                        this.globalActionUrl.system.dictIndex.detail
                      )
                        ? "inline"
                        : "none"
                    },
                    on: {
                      click: () => {
                        this.showDetailForm(params.row.dictIndexId);
                      }
                    }
                  },
                  "查看"
                ),
                h(
                  "Button",
                  {
                    props: {
                      type: "default",
                      size: "small",
                      icon: "md-create"
                    },
                    style: {
                      marginRight: "5px",
                      display: this.showButton(
                        this.globalActionUrl.system.dictIndex.edit
                      )
                        ? "inline"
                        : "none"
                    },
                    on: {
                      click: () => {
                        this.showEditForm(params.row.dictIndexId);
                      }
                    }
                  },
                  "编辑"
                ),
                h(
                  "Button",
                  {
                    props: {
                      type: "default",
                      size: "small",
                      icon: "md-trash"
                    },
                    style: {
                      marginRight: "5px",
                      display: this.showButton(
                        this.globalActionUrl.system.dictIndex.remove
                      )
                        ? "inline"
                        : "none"
                    },
                    on: {
                      click: () => {
                        this.remove(params.row.dictIndexId);
                      }
                    }
                  },
                  "删除"
                )
              ]);
            }
          }
        ]
      }
    };
  },
  methods: {
    load() {
      this.axios
        .post(this.globalActionUrl.system.dictIndex.list, this.tableData.query)
        .then(res => {
          this.tableData.total = res == null ? 0 : res.total;
          this.tableData.data = res == null ? [] : res.records;
          this.tableData.loading = false;
          this.loadCompleted();
        });
    },
    reset() {
      Object.keys(this.tableData.query).forEach(
        key => (this.tableData.query[key] = null)
      );
      this.load();
    },
    refresh() {
      this.load();
    },
    remove(id) {
      this.$Modal.confirm({
        title: "提示框",
        content: "是否删除当前数据?",
        onOk: () => {
          this.axios
            .post(this.globalActionUrl.system.dictIndex.remove, {
              ids: [id]
            })
            .then(res => {
              this.tableData.remove.ids = [];
              this.$Message.success("删除成功");
              this.load();
            });
        }
      });
    },
    removeBatch() {
      if (this.tableData.remove.ids.length > 0) {
        this.$Modal.confirm({
          title: "提示框",
          content: "是否删除当前数据?",
          onOk: () => {
            this.axios
              .post(
                this.globalActionUrl.system.dictIndex.remove,
                this.tableData.remove
              )
              .then(res => {
                this.tableData.remove.ids = [];
                this.$Message.success("删除成功");
                this.load();
              });
          }
        });
      } else {
        this.$Message.info("请选择要删除的数据");
      }
    },
    showNewForm() {
      this.$refs.newForm.load();
    },
    showEditForm(id) {
      this.$refs.editForm.load(id);
    },
    showDetailForm(id) {
      this.$refs.detailForm.load(id);
    },
    showButton(param) {
      return this.buttonAuthority(this, param);
    },
    onSelect(param, row) {
      this.tableData.remove.ids.push(row.dictIndexId);
    },
    onSelectCancel(param, row) {
      this.tableData.remove.ids.splice(
        this.tableData.remove.ids.findIndex(item => item === row.dictIndexId),
        1
      );
    },
    onSelectAll(param) {
      for (let i = 0; i < param.length; i++) {
        this.tableData.remove.ids.push(param[i].dictIndexId);
      }
    },
    onPageSort(param) {
      if (param.order != "normal") {
        this.tableData.query.page.orders.push({
          column: param.key,
          asc: param.order == "asc"
        });
      }
      this.load();
    },
    onPageIndex(param) {
      this.tableData.query.page.current = param;
      this.load();
    },
    onPageSize(param) {
      this.tableData.query.page.size = param;
      this.load();
    },
    loadCompleted() {
      this.tableData.query.page.orders = [];
    }
  },
  components: {
    DictIndexNew,
    DictIndexEdit,
    DictIndexDetail
  }
};
</script>
<style scoped>
.save-btn {
  width: 10%;
  float: left;
}
.search-tool {
  width: 90%;
  text-align: right;
}
.search-btn {
  margin-left: 10px;
}
</style>