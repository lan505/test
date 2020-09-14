<template>
    <div>
        <RadioGroup v-model="selected" @on-change="onChange">
            <Radio v-for="item in data" :label="item.key" :key="item.key">{{item.value}}</Radio>
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
      selected: this.value
    };
  },
  props: {
    value: null,
    data: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    init() {
      
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