<template>
	<header class="header" v-if="this.$buildOptions.model!='telia' || this.$route.name!=='login'">
		<div class="wrap-content">
			<!-- class option : container / container-fluid / container-full -->
			<div class="container-fluid px-4">
				<nav class="header-nav-bar">
					<div class="al" v-if="this.$route.name=='login'">
					</div>
					<div class="al" v-else-if="this.$route.name!=='login'">
						<!--div class="btn-toogle" @click="$store.commit('SET_STATUS', {path: 'sidebar.open', val: true})">
							<span></span>
							<span></span>
							<span></span>
							<span></span>
						</div-->
						<router-link :to="{name: 'status'}" tag='div' class="header__logo">
							<div class="brand">
								<h1 class="site-name">Quantum Wide</h1>
							</div>
						</router-link>
					</div>
					<div class="ar">
						<ul class="nav-setting" style="text-transform : uppercase;">
							<!-- <note></note> -->
							<!-- <led v-if="$buildOptions.ledcontrol&this.$route.name!='login'"></led> -->
							<widelang></widelang>
							<!-- <language style='color: white;'></language> -->
							<admin v-if="this.$route.name!='login'"></admin>
							<!-- <li>Help</li> -->
						</ul>
					</div>
				</nav> <!-- /.header-bar -->
			</div> <!-- /.container -->
		</div> <!-- /.wrap-content -->
	</header> <!-- /.header -->
</template>

<script>
import vClickOutside from 'v-click-outside'
import Language from '@/shared/components/language.vue'
import Note from '@/shared/components/note.vue'
import Admin from '@/shared/components/admin.vue'
import Widelang from '@/shared/components/widelang.vue'
import Led from '@/shared/components/led.vue'

export default {
	directives: {
		clickOutside: vClickOutside.directive
	},
	components: {
		Language,
		Note,
		Admin,
		Widelang,
		Led
	}
}
</script>
