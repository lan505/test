<template>
	<div>
		<i-switch :class="[this.className]" v-model="selected" size="large" :true-value="trueValue" :false-value="falseValue" @on-change="onChange">
			<span slot="open">{{openText}}</span>
			<span slot="close">{{closeText}}</span>
		</i-switch>
	</div>
</template>

<script>
export default {
	name: "LxSwitch",
	created() { },
	mounted() { },
	data() {
		return {
			selected: 0,
		};
	},
	props: {
		value: 0,
		openText: {
			type: String,
			default() {
				return "启用";
			},
		},
		closeText: {
			type: String,
			default() {
				return "禁用";
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
			},
		},
	},
	computed: {
		trueValue: function () {
			return 1;
		},
		falseValue: function () {
			return 0;
		}
	},
};
</script>

<style scoped>
</style>