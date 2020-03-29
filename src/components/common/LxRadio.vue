<template>
    <div>
        <RadioGroup v-model="selected" @on-change="onChange">
            <Radio v-for="item in dataSource" :label="item.key" :key="item.key">{{item.value}}</Radio>
        </RadioGroup>
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
      console.log(data);
      this.$emit("update:value", data);
    }
  }
};
</script>

<style scoped>
</style>