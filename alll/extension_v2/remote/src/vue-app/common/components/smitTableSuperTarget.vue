<template>
  <table class="table">
    <thead>
      <tr>
        <th v-if="isShowStt" scope="col" style="border-top-left-radius: 10px 10px">STT</th>
        <th v-for="(header, index) in headers" :key="index">
          <div v-if="slots['header_'+header.value]">
            <slot :name="'header_'+header.value" v-bind="header"></slot>
          </div>
          <span v-if="!slots['header_'+header.value]"> {{ header.text }}</span>
        </th>
        <th v-if="slots.actions" style="border-top-right-radius: 10px 10px">Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in data" :key="index">
        <th v-if="isShowStt" style="text-align: center; vertical-align: middle;" scope="row">{{ index + 1 }}</th>
        <td v-for="(header, indexHeader) in headers" :key="indexHeader" style="vertical-align: middle;">
          {{ item[header.value] }}
        </td>
        <td v-if="slots.actions">
          <slot name="actions" v-bind="item"></slot>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
import { useSlots } from 'vue';
export default {
  name: 'SmitTableSuperTarget',
  props: {
    isShowStt: {
      type: Boolean,
      default: false
    },
    headers: {
      type: Array,
      default: () => []
    },
    data: {
      type: Array,
      default: () => []
    },
  },
  setup() {
    const slots = useSlots()
    return {
      slots
    }
  }
}
</script>
<style lang="scss" scoped>
.table {
  thead {
    background:  var(--bs-wrapper);
    color: white;
    th {
      line-height: 35px;
      font-size: 13px;
    }
  }
  tbody tr:hover {
    background: wheat;
  }
}
</style>