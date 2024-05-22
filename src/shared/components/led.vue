<template>
	<el-dropdown trigger="click">
		<!-- <el-button type="warning" icon="el-icon-s-opportunity" circle></el-button><br> -->
		<span class="el-dropdown-link">
			LED Control
			<i class="el-icon-arrow-down el-icon--right"></i>
		</span>
		<el-dropdown-menu slot="dropdown">
			<el-dropdown-item>
				<el-button @click='on' type="success" round>ON</el-button>
				<el-button @click='off' type="danger" round>OFF</el-button>
			</el-dropdown-item>
		</el-dropdown-menu>
	</el-dropdown> 
</template>
<script>
import ws from '@/shared/lib/ws'
import { RPC } from '@/shared/constants'
import { reportSuccess, reportError } from '@/shared/functions'
import { Loading } from 'element-ui';

export default {
	methods: {
		on () {
			const loading = Loading.service()
			ws.call(RPC.ledon).then(reportSuccess, reportError).finally(() => {
				loading.close()
			})
		},
		off () {
			const loading = Loading.service()
			ws.call(RPC.ledoff).then(reportSuccess, reportError).finally(() => {
				loading.close()
			})
		}
	}
}
</script>