<template>
	<div>
		<Card>
			<slot></slot>
			<Button type="primary" @click="test2">测试2</Button>
		</Card>
	</div>
</template>

<script>
export default {
	name: "LxCard",
	created() { },
	mounted() { },
	data() {
		return {

		};
	},
	methods: {
		test2() {
			this.$emit("card2", "子组件触发emit");
		}
	}
};
</script>

<style scoped>
</style>