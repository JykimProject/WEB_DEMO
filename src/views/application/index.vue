<template>
	<article class="article">
		<div class="wrap-content">
				<!-- class option : container / container-fluid / container-full -->
				<div class="container-fluid">
						<module-state></module-state>
						<section class="section">
								<h3 class="section-title">Application</h3>
						</section>
						<section class="section">
								<ul class="application-list">
										<li>
												<div class="application-icon-wrap">
														<span class="application-model application-img">Img</span>
												</div>
												<div class="application-info-wrap">
														<div class="application-name">F-Secure</div>
														<div class="application-ver">V2.0</div>
														<div class="application-data">July 02, 2022</div>
														<div class="application-sate">Inacive</div>
												</div>
										</li>
										<li>
												<div class="application-icon-wrap">
														<span class="application-model application-boot">Boot</span>
												</div>
												<div class="application-info-wrap">
														<div class="application-name">Domos</div>
														<div class="application-ver">V0.8.4</div>
														<div class="application-data">August 08, 2022</div>
														<div class="application-sate">Inactive</div>
												</div>
										</li>
										<li>
												<div class="application-icon-wrap">
														<span class="application-model application-home">home</span>
												</div>
												<div class="application-info-wrap">
														<div class="application-name">Heimgard</div>
														<div class="application-ver">V1.0</div>
														<div class="application-data">September 02, 2022</div>
														<div class="application-sate">Inacive</div>
												</div>
										</li>
								</ul>
								<div class="btn-area devices-btn-area">
										<button class="btn-devices-more">MORE</button>
								</div>
						</section>
				</div> <!-- /.container -->
		</div> <!-- /.wrap-content -->
</article> <!-- /.article -->
</template>

<script>
import ModuleState from "../module-state"

export default {
	components: {
		ModuleState
	},
	mounted() {
		this.$nextTick(() => {
			document.body.className = 'full-page';
		})
		this.fetchData()
	},
}
</script>
