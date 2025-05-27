<template>
  <div class="space-y-6">
    <!-- Formulaire d'ajout de note -->
    <Card class="bg-primary/5 border-primary/20">
      <CardHeader>
        <CardTitle class="text-lg flex items-center gap-2">
          <PlusIcon class="w-5 h-5" />
          Ajouter une note
        </CardTitle>
      </CardHeader>
      <CardContent class="space-y-4">
        <Textarea
          v-model="newNote"
          placeholder="Décrivez vos observations, actions effectuées, ou notes importantes..."
          class="min-h-[100px]"
        />
        <div class="flex flex-col sm:flex-row gap-4">
          <div class="flex-1">
            <label class="text-sm font-medium mb-2 block">Catégorie</label>
            <Select v-model="newNoteCategory">
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner une catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="observation">🔍 Observation</SelectItem>
                <SelectItem value="action">⚡ Action effectuée</SelectItem>
                <SelectItem value="probleme">⚠️ Problème détecté</SelectItem>
                <SelectItem value="recolte">🌾 Récolte</SelectItem>
                <SelectItem value="meteo">🌤️ Conditions météo</SelectItem>
                <SelectItem value="general">📝 Note générale</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div class="flex-1">
            <label class="text-sm font-medium mb-2 block">Plante concernée (optionnel)</label>
            <Select v-model="newNotePlant">
              <SelectTrigger>
                <SelectValue placeholder="Toute la zone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toute la zone</SelectItem>
                <SelectItem v-for="plant in availablePlants" :key="plant.id" :value="plant.name">
                  {{ plant.name }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div class="flex justify-end">
          <Button @click="addNote" :disabled="!newNote.trim()" class="flex items-center gap-2">
            <SaveIcon class="w-4 h-4" />
            Ajouter la note
          </Button>
        </div>
      </CardContent>
    </Card>

    <!-- Filtres - Layout mobile optimisé -->
    <div class="flex flex-col sm:flex-row gap-3 md:gap-4 p-3 md:p-4 bg-secondary/50 rounded-lg">
      <div class="flex-1">
        <label class="text-xs md:text-sm font-medium mb-1 block">Catégorie :</label>
        <Select v-model="categoryFilter">
          <SelectTrigger class="w-full text-sm">
            <SelectValue placeholder="Toutes" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes</SelectItem>
            <SelectItem value="observation">Observations</SelectItem>
            <SelectItem value="action">Actions</SelectItem>
            <SelectItem value="probleme">Problèmes</SelectItem>
            <SelectItem value="recolte">Récoltes</SelectItem>
            <SelectItem value="meteo">Météo</SelectItem>
            <SelectItem value="general">Générales</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div class="flex-1">
        <label class="text-xs md:text-sm font-medium mb-1 block">Période :</label>
        <Select v-model="periodFilter">
          <SelectTrigger class="w-full text-sm">
            <SelectValue placeholder="Toutes" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes</SelectItem>
            <SelectItem value="week">Cette semaine</SelectItem>
            <SelectItem value="month">Ce mois</SelectItem>
            <SelectItem value="quarter">Ce trimestre</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>

    <!-- Liste des notes -->
    <div class="space-y-4">
      <div v-for="entry in filteredEntries" :key="entry.id" class="group">
        <Card :class="getCategoryCardClass(entry.category)" class="hover:shadow-md transition-shadow">
          <CardHeader class="pb-3">
            <div class="flex items-start justify-between">
              <div class="flex items-center gap-3">
                <div :class="getCategoryIconClass(entry.category)" class="w-8 h-8 rounded-full flex items-center justify-center">
                  {{ getCategoryEmoji(entry.category) }}
                </div>
                <div>
                  <CardTitle class="text-base flex items-center gap-2">
                    {{ entry.author }}
                    <Badge v-if="entry.category" :variant="getCategoryBadgeVariant(entry.category)" class="text-xs">
                      {{ getCategoryLabel(entry.category) }}
                    </Badge>
                  </CardTitle>
                  <div class="flex items-center gap-2 text-sm text-gray-500">
                    <CalendarIcon class="w-4 h-4" />
                    {{ formatDate(entry.createdAt) }}
                    <span v-if="entry.plant" class="flex items-center gap-1">
                      • <SproutIcon class="w-3 h-3" /> {{ entry.plant }}
                    </span>
                  </div>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" class="opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreVerticalIcon class="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem @click="editEntry(entry)">
                    <EditIcon class="w-4 h-4 mr-2" />
                    Modifier
                  </DropdownMenuItem>
                  <DropdownMenuItem @click="deleteEntry(entry.id)" class="text-red-600">
                    <TrashIcon class="w-4 h-4 mr-2" />
                    Supprimer
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent>
            <p class="text-sm leading-relaxed">{{ entry.content }}</p>
            
            <!-- Photos si disponibles -->
            <div v-if="entry.photos && entry.photos.length" class="flex gap-2 mt-4">
              <img 
                v-for="(photo, idx) in entry.photos" 
                :key="idx" 
                :src="photo" 
                class="w-16 h-16 object-cover rounded-lg border hover:scale-105 transition-transform cursor-pointer" 
                @click="openPhotoModal(photo)"
              />
            </div>

            <!-- Météo si disponible -->
            <div v-if="entry.weather" class="mt-3 p-2 bg-blue-50 rounded-lg">
              <div class="flex items-center gap-2 text-sm text-blue-700">
                <CloudIcon class="w-4 h-4" />
                <span class="font-medium">Conditions météo :</span>
                {{ entry.weather }}
              </div>
            </div>

            <!-- Actions liées si disponibles -->
            <div v-if="entry.relatedActions && entry.relatedActions.length" class="mt-3">
              <div class="text-xs font-medium text-gray-500 mb-2">Actions liées :</div>
              <div class="flex flex-wrap gap-1">
                <Badge v-for="action in entry.relatedActions" :key="action" variant="outline" class="text-xs">
                  {{ action }}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <!-- Message si aucune note -->
      <div v-if="filteredEntries.length === 0" class="text-center py-8 text-gray-500">
        <BookOpenIcon class="w-12 h-12 mx-auto text-gray-300 mb-2" />
        <p>Aucune note ne correspond aux filtres sélectionnés.</p>
        <p class="text-sm mt-1">Commencez par ajouter votre première observation !</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { format, parseISO, isWithinInterval, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfQuarter, endOfQuarter } from 'date-fns'
import { fr } from 'date-fns/locale'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu'
import { 
  PlusIcon,
  SaveIcon,
  CalendarIcon,
  SproutIcon,
  MoreVerticalIcon,
  EditIcon,
  TrashIcon,
  CloudIcon,
  BookOpenIcon
} from 'lucide-vue-next'

interface EnrichedJournalEntry {
  id: string
  content: string
  createdAt: string
  author: string
  category?: 'observation' | 'action' | 'probleme' | 'recolte' | 'meteo' | 'general'
  plant?: string
  photos?: string[]
  weather?: string
  relatedActions?: string[]
}

const props = defineProps<{ 
  journal: any[]
  availablePlants?: Array<{ id: string; name: string }>
}>()

const emit = defineEmits<{
  noteAdded: [note: Omit<EnrichedJournalEntry, 'id' | 'createdAt'>]
  noteEdited: [id: string, note: Partial<EnrichedJournalEntry>]
  noteDeleted: [id: string]
}>()

// États pour l'ajout de note
const newNote = ref('')
const newNoteCategory = ref<string>('general')
const newNotePlant = ref<string>('')

// États des filtres
const categoryFilter = ref('all')
const periodFilter = ref('all')

// Transformation des données en entrées enrichies
const enrichedEntries = computed((): EnrichedJournalEntry[] => {
  return props.journal.map(entry => ({
    ...entry,
    category: entry.category || 'general'
  }))
})

// Entrées filtrées
const filteredEntries = computed(() => {
  return enrichedEntries.value.filter(entry => {
    // Filtre par catégorie
    if (categoryFilter.value !== 'all' && entry.category !== categoryFilter.value) {
      return false
    }
    
    // Filtre par période
    if (periodFilter.value !== 'all') {
      try {
        const entryDate = parseISO(entry.createdAt.split(' ')[0].split('/').reverse().join('-'))
        const now = new Date()
        
        switch (periodFilter.value) {
          case 'week':
            return isWithinInterval(entryDate, { start: startOfWeek(now), end: endOfWeek(now) })
          case 'month':
            return isWithinInterval(entryDate, { start: startOfMonth(now), end: endOfMonth(now) })
          case 'quarter':
            return isWithinInterval(entryDate, { start: startOfQuarter(now), end: endOfQuarter(now) })
        }
      } catch {
        return true
      }
    }
    
    return true
  }).sort((a, b) => {
    // Trier par date décroissante
    try {
      const dateA = parseISO(a.createdAt.split(' ')[0].split('/').reverse().join('-'))
      const dateB = parseISO(b.createdAt.split(' ')[0].split('/').reverse().join('-'))
      return dateB.getTime() - dateA.getTime()
    } catch {
      return 0
    }
  })
})

// Fonctions utilitaires
const formatDate = (dateStr: string) => {
  try {
    const [datePart, timePart] = dateStr.split(' ')
    const date = parseISO(datePart.split('/').reverse().join('-'))
    return `${format(date, 'EEEE d MMMM yyyy', { locale: fr })} à ${timePart || '12:00'}`
  } catch {
    return dateStr
  }
}

const getCategoryEmoji = (category?: string) => {
  switch (category) {
    case 'observation': return '🔍'
    case 'action': return '⚡'
    case 'probleme': return '⚠️'
    case 'recolte': return '🌾'
    case 'meteo': return '🌤️'
    case 'general': return '📝'
    default: return '📝'
  }
}

const getCategoryLabel = (category?: string) => {
  switch (category) {
    case 'observation': return 'Observation'
    case 'action': return 'Action'
    case 'probleme': return 'Problème'
    case 'recolte': return 'Récolte'
    case 'meteo': return 'Météo'
    case 'general': return 'Général'
    default: return 'Note'
  }
}

const getCategoryCardClass = (category?: string) => {
  switch (category) {
    case 'observation': return 'border-blue-200 bg-blue-50/50'
    case 'action': return 'border-green-200 bg-green-50/50'
    case 'probleme': return 'border-red-200 bg-red-50/50'
    case 'recolte': return 'border-yellow-200 bg-yellow-50/50'
    case 'meteo': return 'border-cyan-200 bg-cyan-50/50'
    case 'general': return 'border-gray-200 bg-gray-50/50'
    default: return 'border-gray-200 bg-white'
  }
}

const getCategoryIconClass = (category?: string) => {
  switch (category) {
    case 'observation': return 'bg-blue-100 text-blue-600'
    case 'action': return 'bg-green-100 text-green-600'
    case 'probleme': return 'bg-red-100 text-red-600'
    case 'recolte': return 'bg-yellow-100 text-yellow-600'
    case 'meteo': return 'bg-cyan-100 text-cyan-600'
    case 'general': return 'bg-gray-100 text-gray-600'
    default: return 'bg-gray-100 text-gray-600'
  }
}

const getCategoryBadgeVariant = (category?: string) => {
  switch (category) {
    case 'probleme': return 'destructive'
    case 'recolte': return 'default'
    case 'action': return 'secondary'
    default: return 'outline'
  }
}

// Actions
const addNote = () => {
  if (!newNote.value.trim()) return
  
  const note: Omit<EnrichedJournalEntry, 'id' | 'createdAt'> = {
    content: newNote.value.trim(),
    author: 'Utilisateur', // À remplacer par l'utilisateur connecté
    category: newNoteCategory.value as any,
    plant: newNotePlant.value || undefined
  }
  
  emit('noteAdded', note)
  
  // Reset du formulaire
  newNote.value = ''
  newNoteCategory.value = 'general'
  newNotePlant.value = ''
}

const editEntry = (entry: EnrichedJournalEntry) => {
  // À implémenter : ouvrir un modal d'édition
  console.log('Edit entry:', entry)
}

const deleteEntry = (id: string) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer cette note ?')) {
    emit('noteDeleted', id)
  }
}

const openPhotoModal = (photo: string) => {
  // À implémenter : ouvrir un modal pour voir la photo en grand
  console.log('Open photo:', photo)
}
</script> 