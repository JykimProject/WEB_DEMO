<template>
	<ul class="module-state">
		<!-- class option : online / offline -->
		<!-- <li :class="{ 'online': ethernet, 'offline': !ethernet }">Ethernet</li> -->
		<li class='refresh' @click="refreshAll">{{ t("refresh").cap }}</li>
	</ul>
</template>

<script>

export default {
	components: {
	},
	data() {
		return {
			ethernet: true
		}
	},
	methods: {
		refreshAll() {
			this.$router.go();
		}
	}
};

</script>
