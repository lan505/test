<template>
    <div>
        <CheckboxGroup v-model="selected" @on-change="onChange">
            <Checkbox v-for="item in dataSource" :label="item.key" :key="item.key">{{ item.value }}</Checkbox>
        </CheckboxGroup>
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
      this.$emit("update:value", data);
    }
  }
};
</script>

<style scoped>
</style>