<template>
  <AssistantDrawer v-if="isMobile" />
  <AssistantModal v-else />
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue'
import AssistantDrawer from './AssistantDrawer.vue'
import AssistantModal from './AssistantModal.vue'

const isMobile = ref(false)

const checkScreenSize = () => {
  isMobile.value = window.innerWidth < 1024 // lg breakpoint
}

onMounted(() => {
  checkScreenSize()
  window.addEventListener('resize', checkScreenSize)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkScreenSize)
})
</script> 