<template>
    <div>
        <!--  :render="renderContent" -->
        <Select
            class="select"
            :multiple="enableMultiple"
            :filterable="enableFilterable"
            @on-query-change="onQueryChange"
        >
            <Input class="select-input" placeholder="搜索内容" @on-change="onQueryChange" />
            <Tree
                :data="data"
                :load-data="loadData"
                :render="renderContent"
            ></Tree>
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
            data: [],
            search: null,
            enableMultiple: null,
            enableFilterable: null,
        };
    },
    props: {
        url: {
            type: String,
            required: true
        },
        multiple: {
            type: Boolean,
            default() {
                return false;
            }
        },
        multiple: {
            type: Boolean,
            default() {
                return false;
            }
        },
        filterable: {
            type: Boolean,
            default() {
                return true;
            }
        }
    },
    watch: {
        multiple(val) {
            this.enableMultiple = val;
            console.log(this.enableMultiple);
        },
        filterable(val) {
            this.enableFilterable = val;
            console.log(this.enableFilterable);
        }
    },
    methods: {
        init(pid, search, callback) {
            this.axios.get(this.url, { params: { pid: pid, search: search } }).then(res => {
                res.forEach(function(value) {
                    if (value.subNum > 0) {
                        value.loading = false;
                    }
                });
                if (callback == null) {
                    this.data = res;
                } else {
                    callback(res);
                }
            });
        },
        loadData(item, callback) {
            this.init(item.id, null, callback);
        },
        renderContent(h, { root, node, data }) {
            return h(
                "Option",
                {
                    style: {
                        display: "inline-block",
                        margin: "0px 0px 0px 0px",
                    },
                    props: {
                        value: data.id
                    }
                },
                data.title
            );
        },
        onQueryChange(event) {
          let queryContent = event.target.value;
          if(queryContent == null || queryContent == ""){
            this.init();
          }else{
            this.init(null, queryContent);
          }
        }
    }
};
</script>

<style scoped>
.select {
  
}
.select-input {
  padding: 5px 10px 0px 10px;
}
</style>
