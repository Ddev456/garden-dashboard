<!-- layouts/default.vue -->
<template>
      <div class="min-h-screen bg-background">
        <!-- Sidebar -->
        <Sidebar
      v-model:isMobileMenuOpen="isMobileMenuOpen"
    />

    <!-- Main Content -->
    <div class="lg:pl-72 p-6">
      <!-- Header -->
      <Header @toggle-mobile-menu="isMobileMenuOpen = !isMobileMenuOpen" />

      <!-- Page Content -->
      <main class="py-6 overflow-y-auto max-h-[calc(100vh-150px)]">
        <div class="px-4 sm:px-6 lg:px-8">
          <slot />
        </div>
        </main>
      </div>
    </div>
</template>

<script setup lang="ts">
const isMobileMenuOpen = ref(false)
</script> 