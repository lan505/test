<template>
    <div>
          <!--  :render="renderContent" -->
          <Select style="width:200px" clearable>
                <Tree :data="data" :load-data="loadData"></Tree>
          </Select>
    </div>
</template>

<script>
export default {
  created() {
    this.init();
  },
  data() {
    return {
      data: []
    };
  },
  props: {
    url: {
      type: String,
      requere: true
    }
  },
  methods: {
    init(pid, callback) {
      this.axios.get(this.url, { params: { pid: pid } }).then(res => {
        if (callback == null) {
          this.data = res;
        } else {
          callback(res);
        }
      });
    },
    onPageSort(param) {
      console.log(param);
      this.$emit("onPageSort", param);
    },
    loadData(item, callback) {
      this.init(item.id, callback);
    },
    renderContent(h, { root, node, data }) {
      return h(
        "Option",
        {
          style: {
            display: "inline-block",
            margin: "0"
          },
          props: {
            value: data.id
          }
        },
        data.title
      );
    }
  }
};
</script>

<style scoped>
</style>
