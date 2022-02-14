<!--
 * @Description  : 
 * @Autor        : lan505
 * @Version      : 1.0
 * @Date         : 2021-02-25 12:09:38
 * @LastEditTime : 2022-02-14 19:01:25
-->
<template>
	<div class="error-content">
		<Card class="error-card">
			<div class="code">
				<h1>404</h1>
			</div>
			<div class="title">你的页面在星球上找不到啦</div>
		</Card>
	</div>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.error-content {
	height: 100%;
}
.error-content .error-card {
	height: auto;
}
.code {
	margin-top: 100px;
	text-align: center;
	font-size: 100px;
	font-weight: 700;
}
.title {
	text-align: center;
	font-size: 30px;
	font-weight: 700;
}
</style>
