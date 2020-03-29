<template>
    <div>
        <Select v-model="selected" style="width:200px" clearable @on-change="onChange">
            <Option v-for="item in dataSource" :value="item.key" :key="item.key">{{ item.value }}</Option>
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
      dataSource: null,
      selected: this.value
    };
  },
  props: {
    value: {

    },
    url: {
      type: String,
      required: true,
      default() {
        return "";
      }
    }
  },
  methods: {
    init() {
      this.axios.get(this.url).then(res => {
        this.dataSource = res;
      });
    },
    onChange(data) {
        this.$emit('update:value', data)
    }
  }
};
</script>

<style scoped>
</style>