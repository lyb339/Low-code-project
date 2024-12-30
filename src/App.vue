<script setup lang="ts">
import layout from './components/layout.jsx'
import './assets/whole.scss'
import data from './assets/data.json'
import { provide, ref } from 'vue'
import { wholeConfig as config } from './utils/whole-config.jsx'
import block from './components/layout-block.jsx'
const state = ref(data)
provide('config', config) //将组件配置释放出去
</script>
<template>
  <layout v-model="state"></layout>
</template>

<style scoped>
.edit {
}
</style>
