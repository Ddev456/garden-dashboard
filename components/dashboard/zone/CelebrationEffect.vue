<template>
  <Teleport to="body">
    <div 
      v-if="show" 
      class="fixed inset-0 pointer-events-none z-50 flex items-center justify-center"
    >
      <div class="relative">
        <div class="text-6xl animate-bounce">🎉</div>
        <div class="absolute top-0 -left-10 text-4xl animate-ping delay-100">✨</div>
        <div class="absolute top-0 -right-10 text-4xl animate-ping delay-200">⭐</div>
        <div class="mt-4 text-center">
          <div class="bg-white/95 backdrop-blur-sm rounded-lg px-6 py-3 shadow-lg border">
            <p class="text-lg font-semibold text-primary">{{ title }}</p>
            <p class="text-sm text-gray-600">{{ message }}</p>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
interface Props {
  show?: boolean
  title?: string
  message?: string
}

withDefaults(defineProps<Props>(), {
  show: false,
  title: 'Étape terminée !',
  message: 'Excellent travail ! 👏'
})
</script> 