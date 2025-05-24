<template>
  <div class="text-center py-16">
    <component :is="icon" class="w-16 h-16 text-gray-300 mx-auto mb-4" />
    <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ title }}</h3>
    <p class="text-gray-600 max-w-md mx-auto mb-4">
      {{ description }}
    </p>
    <slot name="action">
      <Button v-if="actionLabel" @click="$emit('action')" variant="outline">
        {{ actionLabel }}
      </Button>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
import type { Component } from 'vue'

interface Props {
  icon: Component
  title: string
  description: string
  actionLabel?: string
}

interface Emits {
  (e: 'action'): void
}

defineProps<Props>()
defineEmits<Emits>()
</script> 