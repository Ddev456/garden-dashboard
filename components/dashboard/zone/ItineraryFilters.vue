<template>
  <div class="flex flex-wrap gap-4 p-4 bg-secondary/50 rounded-lg">
    <div class="flex items-center gap-2">
      <label class="text-sm font-medium">Difficulté :</label>
      <Select v-model="localDifficultyFilter">
        <SelectTrigger class="w-32">
          <SelectValue placeholder="Toutes" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Toutes</SelectItem>
          <SelectItem value="facile">Facile</SelectItem>
          <SelectItem value="moyen">Moyen</SelectItem>
          <SelectItem value="difficile">Difficile</SelectItem>
        </SelectContent>
      </Select>
    </div>
    
    <div class="flex items-center gap-2">
      <label class="text-sm font-medium">Type :</label>
      <Select v-model="localTypeFilter">
        <SelectTrigger class="w-40">
          <SelectValue placeholder="Tous types" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tous types</SelectItem>
          <SelectItem value="légume-fruit">Légume-fruit</SelectItem>
          <SelectItem value="légume-feuille">Légume-feuille</SelectItem>
          <SelectItem value="légume-racine">Légume-racine</SelectItem>
          <SelectItem value="aromate">Aromate</SelectItem>
        </SelectContent>
      </Select>
    </div>

    <div class="flex items-center gap-2">
      <label class="text-sm font-medium">Saison :</label>
      <Select v-model="localSeasonFilter">
        <SelectTrigger class="w-36">
          <SelectValue placeholder="Toutes" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Toutes</SelectItem>
          <SelectItem value="printemps">Printemps</SelectItem>
          <SelectItem value="été">Été</SelectItem>
          <SelectItem value="automne">Automne</SelectItem>
          <SelectItem value="hiver">Hiver</SelectItem>
          <SelectItem value="toute-saison">Toute saison</SelectItem>
        </SelectContent>
      </Select>
    </div>

    <div v-if="showStatusFilter" class="flex items-center gap-2">
      <label class="text-sm font-medium">Statut :</label>
      <Select v-model="localStatusFilter">
        <SelectTrigger class="w-32">
          <SelectValue placeholder="Tous" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tous</SelectItem>
          <SelectItem value="not-started">Non commencé</SelectItem>
          <SelectItem value="in-progress">En cours</SelectItem>
          <SelectItem value="completed">Terminé</SelectItem>
        </SelectContent>
      </Select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface Props {
  difficultyFilter?: string
  typeFilter?: string
  seasonFilter?: string
  statusFilter?: string
  showStatusFilter?: boolean
}

interface Emits {
  (e: 'update:difficultyFilter', value: string): void
  (e: 'update:typeFilter', value: string): void
  (e: 'update:seasonFilter', value: string): void
  (e: 'update:statusFilter', value: string): void
}

const props = withDefaults(defineProps<Props>(), {
  difficultyFilter: 'all',
  typeFilter: 'all',
  seasonFilter: 'all',
  statusFilter: 'all',
  showStatusFilter: false
})

const emit = defineEmits<Emits>()

// Computed properties pour la liaison bidirectionnelle
const localDifficultyFilter = computed({
  get: () => props.difficultyFilter,
  set: (value) => emit('update:difficultyFilter', value)
})

const localTypeFilter = computed({
  get: () => props.typeFilter,
  set: (value) => emit('update:typeFilter', value)
})

const localSeasonFilter = computed({
  get: () => props.seasonFilter,
  set: (value) => emit('update:seasonFilter', value)
})

const localStatusFilter = computed({
  get: () => props.statusFilter,
  set: (value) => emit('update:statusFilter', value)
})
</script> 