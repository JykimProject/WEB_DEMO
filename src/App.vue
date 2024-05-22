<template>
	<section class="wrap-body">
		<section class="wrap-box">
			<main-header></main-header>
			<router-view />
		</section>
	</section>
</template>

<script>
import MainHeader from './views/header.vue'

export default {
	components: { MainHeader }
}

</script>
