<template>
	<router-view></router-view>
</template>

<script>
export default {
	mounted() {
		this.$nextTick(() => {
			document.body.className = 'aside-page';
		});
	}
}
</script>
