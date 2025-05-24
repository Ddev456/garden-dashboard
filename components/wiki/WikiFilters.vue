<template>
  <div class="bg-white rounded-lg shadow-sm border p-6">
    <div class="flex flex-wrap items-center justify-between gap-4">
      <!-- Filtres -->
      <div class="flex flex-wrap gap-4">
        <!-- Catégorie -->
        <div class="flex items-center gap-2">
          <label class="text-sm font-medium text-gray-700">Catégorie :</label>
          <Select :model-value="filters.category" @update:model-value="updateFilter('category', $event)">
            <SelectTrigger class="w-40">
              <SelectValue placeholder="Toutes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Toutes</SelectItem>
              <SelectItem value="légume-fruit">Légume-fruit</SelectItem>
              <SelectItem value="légume-feuille">Légume-feuille</SelectItem>
              <SelectItem value="légume-racine">Légume-racine</SelectItem>
              <SelectItem value="aromate">Aromate</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <!-- Difficulté -->
        <div class="flex items-center gap-2">
          <label class="text-sm font-medium text-gray-700">Difficulté :</label>
          <Select :model-value="filters.difficulty" @update:model-value="updateFilter('difficulty', $event)">
            <SelectTrigger class="w-32">
              <SelectValue placeholder="Toutes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Toutes</SelectItem>
              <SelectItem value="facile">Facile</SelectItem>
              <SelectItem value="moyen">Moyen</SelectItem>
              <SelectItem value="difficile">Difficile</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <!-- Saison -->
        <div class="flex items-center gap-2">
          <label class="text-sm font-medium text-gray-700">Saison :</label>
          <Select :model-value="filters.season" @update:model-value="updateFilter('season', $event)">
            <SelectTrigger class="w-36">
              <SelectValue placeholder="Toutes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Toutes</SelectItem>
              <SelectItem value="printemps">Printemps</SelectItem>
              <SelectItem value="été">Été</SelectItem>
              <SelectItem value="automne">Automne</SelectItem>
              <SelectItem value="hiver">Hiver</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <!-- Options d'affichage -->
      <div class="flex items-center gap-4">
        <div class="flex items-center gap-2">
          <span class="text-sm text-gray-500">Affichage :</span>
          <div class="flex border border-gray-300 rounded-lg overflow-hidden">
            <button
              @click="updateViewMode('grid')"
              :class="[
                'px-3 py-2 text-sm transition-colors',
                viewMode === 'grid' 
                  ? 'bg-primary text-white' 
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              ]"
            >
              <GridIcon class="w-4 h-4" />
            </button>
            <button
              @click="updateViewMode('list')"
              :class="[
                'px-3 py-2 text-sm transition-colors border-l border-gray-300',
                viewMode === 'list' 
                  ? 'bg-primary text-white' 
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              ]"
            >
              <ListIcon class="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <!-- Nombre de résultats -->
        <div class="text-sm text-gray-500">
          {{ resultsCount }} plante{{ resultsCount > 1 ? 's' : '' }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { GridIcon, ListIcon } from 'lucide-vue-next'

interface Filters {
  category: string
  difficulty: string
  season: string
}

interface Props {
  filters: Filters
  viewMode: 'grid' | 'list'
  resultsCount: number
}

interface Emits {
  (e: 'update:filters', filters: Filters): void
  (e: 'update:viewMode', mode: 'grid' | 'list'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const updateFilter = (key: keyof Filters, value: any) => {
  const newFilters = { ...props.filters, [key]: value || '' }
  emit('update:filters', newFilters)
}

const updateViewMode = (mode: 'grid' | 'list') => {
  emit('update:viewMode', mode)
}
</script> 