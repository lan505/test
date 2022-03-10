<!--
 * @Description  : 
 * @Autor        : lan505
 * @Version      : 1.0
 * @Date         : 2021-02-25 12:09:38
 * @LastEditTime : 2022-02-17 15:40:27
-->
<template>
	<div>
		<CheckboxGroup v-model="selected" :class="[this.className]" @on-change="onChange">
			<Checkbox v-for="item in data" :label="item.key" :key="item.key">{{ item.value }}</Checkbox>
		</CheckboxGroup>
	</div>
</template>

<script>
export default {
	name: "LxCheckBox",
	created() { },
	mounted() { },
	data() {
		return {
			selected: [],
		};
	},
	props: {
		value: {
			type: Array,
			default() {
				return [];
			},
		},
		data: {
			type: Array,
			default() {
				return [];
			},
		},
		className: {
			type: String,
			default() {
				return "";
			}
		}
	},
	methods: {
		onChange(data) {
			this.$emit("update:value", data);
		},
	},
	watch: {
		value: {
			immediate: true,
			handler() {
				this.selected = this.value;
			}
		},
	},
};
</script>

<style scoped>
</style>