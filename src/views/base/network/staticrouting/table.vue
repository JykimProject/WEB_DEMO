<template>
  <section class="section">
    <div class="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th v-for="col in columns" :key="col.key">
              {{ t(col.name).cap }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for='(row, rowIndex) in data' :key='rowIndex'>
            <td v-for='col in columns' :key='col.key'>
              <template v-if="col.key === 'enabled'">
                <span class="iconset icon-green-check" v-if="cellVal(row[col.key]) == 1">좋음</span>
                <span v-else></span>
              </template>
              <template v-else-if="col.key === 'actions'">
                <div class="d-flex-center" :style="{justifyContent: 'center', alignItems: 'center'}">
                  <button type="button" class="iconset icon-edit" @click="$emit('edit', rowIndex)">{{ t('edit').cap
                  }}</button>
                  <button type="button" class="iconset icon-trash" @click="$emit('delete', rowIndex)">{{ t('delete').cap
                  }}</button>
                </div>
              </template>
              <template v-else>
                {{ cellVal(row[col.key]) }}
              </template>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <section></section>
    <div class="btn-area btn-setting-area">
      <button class="btn btn-secondary" type="button" @click="$emit('add')">{{ t('add-new-rule') }}</button>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    columns: Array,
    data: Array
  },
  methods: {
    cellVal(cell) {
      if (typeof cell === 'object') {
        return cell.$value
      }
      return cell
    },
  }
}
</script>
