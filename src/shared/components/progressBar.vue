<template>
	<div>
		<div class="progress-container">
			<div class="progress"></div>
		</div>
		<div>
			<p>{{ progress.toFixed(2) }}%</p>
		</div>
	</div>
</template>
<script>
export default {
	props: ['progress'],
	computed: {
		progressbar () {
			return document.querySelector(".progress")
		}
	},
	watch: {
		'progress' () {
			this.progressbar.style.width = `${Math.round(this.progress)}%`
		}
	}
}
</script>
<style>
.progress-container {
	height: 0.8rem;
	width: 32rem;
	border: 0.5px solid #477be4;
	border-radius: 0.4rem;
	background: #ffffff;
}

.progress-container .progress {
	height: 100%;
	width: 0;
	border-radius: 0.4rem;
	background: #477be4;
	transition: width 0.4s ease;
}
</style>
