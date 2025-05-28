<template>
  <div class="max-w-2xl mx-auto">
    <div class="relative">
      <SearchIcon class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      <input
        :value="searchQuery"
        @input="handleInput"
        type="text"
        placeholder="Rechercher une plante..."
        class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg"
      />
      <div v-if="searchQuery" class="absolute right-3 top-1/2 transform -translate-y-1/2">
        <button @click="clearSearch" class="text-gray-400 hover:text-gray-600">
          <XIcon class="w-5 h-5" />
        </button>
      </div>
    </div>
    
    <!-- Suggestions de recherche rapide -->
    <div class="flex flex-wrap gap-2 mt-4 justify-center">
      <button
        v-for="suggestion in suggestions"
        :key="suggestion"
        @click="selectSuggestion(suggestion)"
        class="border-2 border-transparent hover:border-primary hover:border-dashed px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700"
      >
        {{ suggestion }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SearchIcon, XIcon } from 'lucide-vue-next'

interface Props {
  searchQuery: string
  suggestions?: string[]
}

interface Emits {
  (e: 'update:searchQuery', value: string): void
  (e: 'search'): void
  (e: 'clear'): void
}

const props = withDefaults(defineProps<Props>(), {
  suggestions: () => ['tomate', 'basilic', 'laitue', 'carotte', 'facile', 'printemps']
})

const emit = defineEmits<Emits>()

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:searchQuery', target.value)
  emit('search')
}

const clearSearch = () => {
  emit('update:searchQuery', '')
  emit('clear')
}

const selectSuggestion = (suggestion: string) => {
  emit('update:searchQuery', suggestion)
  emit('search')
}
</script> 