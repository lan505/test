<template>
    <div>
        <div class="cm-flex row" style="width: 100%;">
            <div class="cm-flex" style="width: 100px;" v-show="this.showButton(this.globalActionUrl.system.menu.save)">
                <Button type="primary" icon="md-add" @click="showNewForm">新增</Button>
            </div>  
            <div class="cm-flex" style="width: calc(100% - 100px); justify-content: flex-end;">
                <div class="search-btn">
                    <Input v-model="tableData.query.menuName" clearable>
                        <span slot="prepend">名称</span>
                    </Input>
                </div>
                <div class="search-btn">
                    <LxSelect :value.sync="tableData.query.menuType" :url="this.globalActionUrl.system.menu.listMenuType"></LxSelect>
                </div>
                <div class="search-btn">
                    <Button type="default" icon="md-search" @click="loadList()">查询</Button>
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
        <LxTablePage
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
        ></LxTablePage>
        <MenuNew ref="newForm" @loadList="loadList"></MenuNew>
        <MenuEdit ref="editForm" @loadList="loadList"></MenuEdit>
        <MenuDetail ref="detailForm" @loadList="loadList"></MenuDetail>
    </div>
</template>
<script>
import MenuNew from "./MenuNew";
import MenuEdit from "./MenuEdit";
import MenuDetail from "./MenuDetail";
export default {
  created() {
    this.initData();
  },
  data() {
    return {
      searchControlData: {

      },
      tableData: {
        loading: true,
        remove: {
          ids: []
        },
        query: {
          menuName: null,
          menuType: null,
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
            title: "父级菜单",
            key: "menuParentName",
            ellipsis: "true",
            tooltip: "true"
          },
          {
            title: "菜单名称",
            key: "menuName",
            ellipsis: "true",
            tooltip: "true",
            sortable: "custom",
            width: 170
          },
          {
            title: "菜单URL",
            key: "menuUrl",
            ellipsis: "true",
            tooltip: "true",
            width: 170
          },
          {
            title: "子菜单数",
            key: "menuSubNum",
            ellipsis: "true",
            tooltip: "true",
          },
          {
            title: "菜单图标",
            key: "menuIcon",
            ellipsis: "true",
            tooltip: "true"
          },
          {
            title: "菜单路由",
            key: "menuRouter",
            ellipsis: "true",
            tooltip: "true"
          },
          {
            title: "菜单类型",
            key: "menuType",
            ellipsis: "true",
            tooltip: "true"
          },
          {
            title: "菜单排序",
            key: "menuSort",
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
                        this.globalActionUrl.system.menu.detail
                      )
                        ? "inline"
                        : "none"
                    },
                    on: {
                      click: () => {
                        this.showDetailForm(params.row.menuId);
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
                        this.globalActionUrl.system.menu.edit
                      )
                        ? "inline"
                        : "none"
                    },
                    on: {
                      click: () => {
                        this.showEditForm(params.row.menuId);
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
                        this.globalActionUrl.system.menu.remove
                      )
                        ? "inline"
                        : "none"
                    },
                    on: {
                      click: () => {
                        this.remove(params.row.menuId);
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
    initData() {
      this.loadList();
    },
    loadList() {
      this.axios
        .post(this.globalActionUrl.system.menu.list, this.tableData.query)
        .then(res => {
          this.tableData.total = res == null ? 0 : res.total;
          this.tableData.data = res == null ? [] : res.records;
          this.tableData.loading = false;
          this.loadCompleted();
        });
    },
    reset() {
      Object.keys(this.tableData.query).forEach(
        key => {
          (this.tableData.query[key] = null)
        });
      this.loadList();
    },
    refresh() {
      this.loadList();
    },
    remove(id) {
      this.$Modal.confirm({
        title: "提示框",
        content: "是否删除当前数据?",
        onOk: () => {
          this.axios
            .post(this.globalActionUrl.system.menu.remove, {
              ids: [id]
            })
            .then(res => {
              this.tableData.remove.ids = [];
              this.$Message.success("删除成功");
              this.loadList();
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
                this.globalActionUrl.system.menu.remove,
                this.tableData.remove
              )
              .then(res => {
                this.tableData.remove.ids = [];
                this.$Message.success("删除成功");
                this.loadList();
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
      return this.globalHelper.hasAuthority(this.$route.meta.button, param);
    },
    onSelect(param, row) {
      this.tableData.remove.ids.push(row.menuId);
    },
    onSelectCancel(param, row) {
      this.tableData.remove.ids.splice(
        this.tableData.remove.ids.findIndex(item => item === row.menuId),
        1
      );
    },
    onSelectAll(param) {
      for (let i = 0; i < param.length; i++) {
        this.tableData.remove.ids.push(param[i].menuId);
      }
    },
    onPageSort(param) {
      if (param.order != "normal") {
        this.tableData.query.page.orders.push({
          column: param.key,
          asc: param.order == "asc"
        });
      }
      this.loadList();
    },
    onPageIndex(param) {
      this.tableData.query.page.current = param;
      this.loadList();
    },
    onPageSize(param) {
      this.tableData.query.page.size = param;
      this.loadList();
    },
    loadCompleted() {
      this.tableData.query.page.orders = [];
    },
    loadMenuType() {
      this.axios
        .get(this.globalActionUrl.system.menu.optionMenuType)
        .then(res => {
          this.searchControlData.menuType = res;
        });
    }
  },
  components: {
    MenuNew,
    MenuEdit,
    MenuDetail,
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