<template>
	<section class="section">
		<div class="table-responsive">
			<table class="table">
        <thead>
          <tr>
            <th v-for="col in columns" :key="col.key">
              {{ t(col.name) }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for='(row, rowIndex) in data' :key='rowIndex'>
            <td v-for='col in columns' :key='col.key'>
              <template v-if="col.key === '1'">
                {{ cellVal(row.mac) }}
              </template>
              <template v-if="col.key === '2'">
                {{ cellVal(row.ip) }}
              </template>
              <template v-else-if="col.key === 'actions'">
                <div class="d-flex" :style="{justifyContent: 'center', alignItems: 'center'}">
                  <button type="button" class="iconset icon-trash" @click="$emit('delete', rowIndex)">{{ t('delete').cap }}</button>
                </div>
              </template>
            </td>
          </tr>
        </tbody>
			</table>
		</div>
		<section></section>
	</section>
</template>

<script>
import { reportSuccess } from '@/shared/functions'
export default {
	props: {
    columns: Array,
    data: Array
	},
  methods: {
	copy_info(index) {
      navigator.clipboard.writeText(index)
      reportSuccess()
		},
    cellVal (cell) {
			if (typeof cell === 'object') {
				return cell.$value
			}
			return cell
		},
  }
}
</script>
