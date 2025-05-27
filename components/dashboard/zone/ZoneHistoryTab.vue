<template>
  <div class="space-y-4 md:space-y-6">
    <!-- Filtres et statistiques - Layout mobile optimisé -->
    <div class="flex flex-col gap-4 md:gap-6">
      <!-- Filtres - Collapsible sur mobile -->
      <Card class="md:hidden">
        <CardHeader class="pb-3">
          <CardTitle class="text-base flex items-center justify-between">
            Filtres
            <Button 
              variant="ghost" 
              size="sm" 
              @click="showMobileFilters = !showMobileFilters"
              class="p-1"
            >
              <ChevronDownIcon 
                class="w-4 h-4 transition-transform" 
                :class="showMobileFilters ? 'rotate-180' : ''"
              />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent v-if="showMobileFilters" class="space-y-3">
          <div>
            <label class="text-xs font-medium mb-1 block">Type d'événement</label>
            <Select v-model="eventTypeFilter">
              <SelectTrigger class="text-sm">
                <SelectValue placeholder="Tous les types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les types</SelectItem>
                <SelectItem value="plantation">Plantation</SelectItem>
                <SelectItem value="arrosage">Arrosage</SelectItem>
                <SelectItem value="fertilisation">Fertilisation</SelectItem>
                <SelectItem value="taille">Taille</SelectItem>
                <SelectItem value="traitement">Traitement</SelectItem>
                <SelectItem value="récolte">Récolte</SelectItem>
                <SelectItem value="observation">Observation</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label class="text-xs font-medium mb-1 block">Plante</label>
            <Select v-model="plantFilter">
              <SelectTrigger class="text-sm">
                <SelectValue placeholder="Toutes les plantes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les plantes</SelectItem>
                <SelectItem v-for="plant in uniquePlants" :key="plant" :value="plant!">
                  {{ plant }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label class="text-xs font-medium mb-1 block">Période</label>
            <Select v-model="periodFilter">
              <SelectTrigger class="text-sm">
                <SelectValue placeholder="Toute la période" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toute la période</SelectItem>
                <SelectItem value="week">Cette semaine</SelectItem>
                <SelectItem value="month">Ce mois</SelectItem>
                <SelectItem value="quarter">Ce trimestre</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <!-- Filtres desktop -->
      <div class="hidden md:flex md:flex-row gap-6">
        <Card class="lg:w-1/3">
          <CardHeader>
            <CardTitle class="text-lg">Filtres</CardTitle>
          </CardHeader>
          <CardContent class="space-y-4">
            <div>
              <label class="text-sm font-medium mb-2 block">Type d'événement</label>
              <Select v-model="eventTypeFilter">
                <SelectTrigger>
                  <SelectValue placeholder="Tous les types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les types</SelectItem>
                  <SelectItem value="plantation">Plantation</SelectItem>
                  <SelectItem value="arrosage">Arrosage</SelectItem>
                  <SelectItem value="fertilisation">Fertilisation</SelectItem>
                  <SelectItem value="taille">Taille</SelectItem>
                  <SelectItem value="traitement">Traitement</SelectItem>
                  <SelectItem value="récolte">Récolte</SelectItem>
                  <SelectItem value="observation">Observation</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label class="text-sm font-medium mb-2 block">Plante</label>
              <Select v-model="plantFilter">
                <SelectTrigger>
                  <SelectValue placeholder="Toutes les plantes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les plantes</SelectItem>
                  <SelectItem v-for="plant in uniquePlants" :key="plant" :value="plant!">
                    {{ plant }}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label class="text-sm font-medium mb-2 block">Période</label>
              <Select v-model="periodFilter">
                <SelectTrigger>
                  <SelectValue placeholder="Toute la période" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toute la période</SelectItem>
                  <SelectItem value="week">Cette semaine</SelectItem>
                  <SelectItem value="month">Ce mois</SelectItem>
                  <SelectItem value="quarter">Ce trimestre</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <!-- Métriques rapides desktop -->
        <div class="lg:w-2/3 grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card class="bg-blue-50 border-blue-200 hover:bg-blue-100 transition-colors">
            <CardContent class="p-4 text-center">
              <div class="text-2xl font-bold text-blue-700">{{ totalEvents }}</div>
              <div class="text-sm text-blue-600">Événements totaux</div>
            </CardContent>
          </Card>
          <Card class="bg-green-50 border-green-200 hover:bg-green-100 transition-colors">
            <CardContent class="p-4 text-center">
              <div class="text-2xl font-bold text-green-700">{{ harvestCount }}</div>
              <div class="text-sm text-green-600">Récoltes</div>
            </CardContent>
          </Card>
          <Card class="bg-purple-50 border-purple-200 hover:bg-purple-100 transition-colors">
            <CardContent class="p-4 text-center">
              <div class="text-2xl font-bold text-purple-700">{{ averageWateringFrequency }}</div>
              <div class="text-sm text-purple-600">Arrosages/semaine</div>
            </CardContent>
          </Card>
          <Card class="bg-orange-50 border-orange-200 hover:bg-orange-100 transition-colors">
            <CardContent class="p-4 text-center">
              <div class="text-2xl font-bold text-orange-700">{{ activePlantsCount }}</div>
              <div class="text-sm text-orange-600">Plantes actives</div>
            </CardContent>
          </Card>
        </div>
      </div>

      <!-- Métriques rapides mobile -->
      <div class="grid grid-cols-2 gap-3 md:hidden">
        <Card class="bg-blue-50 border-blue-200">
          <CardContent class="p-3 text-center">
            <div class="text-lg font-bold text-blue-700">{{ totalEvents }}</div>
            <div class="text-xs text-blue-600">Événements</div>
          </CardContent>
        </Card>
        <Card class="bg-green-50 border-green-200">
          <CardContent class="p-3 text-center">
            <div class="text-lg font-bold text-green-700">{{ harvestCount }}</div>
            <div class="text-xs text-green-600">Récoltes</div>
          </CardContent>
        </Card>
      </div>
    </div>

    <!-- Recommandations basées sur l'historique -->
    <Card v-if="recommendations.length > 0" class="bg-amber-50 border-amber-200">
      <CardHeader class="pb-3">
        <CardTitle class="text-base md:text-lg flex items-center gap-2">
          <LightbulbIcon class="w-4 h-4 md:w-5 md:h-5 text-amber-600" />
          Recommandations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div class="space-y-2">
          <div v-for="rec in recommendations" :key="rec.id" class="flex items-start gap-3 p-3 bg-white rounded-lg">
            <component :is="getRecommendationIcon(rec.type)" class="w-4 h-4 md:w-5 md:h-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <div class="min-w-0">
              <p class="text-sm font-medium">{{ rec.title }}</p>
              <p class="text-xs text-gray-600">{{ rec.description }}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Timeline des événements - Optimisée mobile -->
    <Card>
      <CardHeader class="pb-3">
        <CardTitle class="text-base md:text-lg">Historique chronologique</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="space-y-4 md:space-y-6">
          <div v-for="(eventsGroup, date) in groupedEvents" :key="date" class="relative">
            <!-- Date - Design mobile optimisé -->
            <div class="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
              <div class="bg-primary text-primary-foreground px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium whitespace-nowrap">
                {{ formatDate(date) }}
              </div>
              <div class="flex-1 h-px bg-gray-200"></div>
            </div>

            <!-- Événements du jour - Layout mobile optimisé -->
            <div class="space-y-2 md:space-y-3 ml-2 md:ml-4">
              <div 
                v-for="event in eventsGroup" 
                :key="event.id"
                class="relative flex gap-3 md:gap-4 p-3 md:p-4 bg-white border rounded-lg hover:shadow-sm transition-all duration-200 active:scale-[0.98]"
              >
                <!-- Icône de l'événement -->
                <div class="flex-shrink-0">
                  <div :class="getEventIconClass(event.type)" class="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center">
                    <component :is="getEventIcon(event.type)" class="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                </div>

                <!-- Contenu de l'événement -->
                <div class="flex-1 min-w-0">
                  <div class="flex items-start justify-between gap-2">
                    <div class="flex items-center gap-2 min-w-0">
                      <img v-if="event.plantIcon" :src="event.plantIcon" :alt="event.plantName" class="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                      <h4 class="font-medium text-gray-900 text-sm md:text-base truncate">{{ event.plantName || 'Zone générale' }}</h4>
                      <Badge :variant="getEventBadgeVariant(event.type)" class="text-xs flex-shrink-0 hidden sm:inline-flex">
                        {{ getEventTypeLabel(event.type) }}
                      </Badge>
                    </div>
                    <time class="text-xs text-gray-500 flex-shrink-0">{{ event.time || '12:00' }}</time>
                  </div>

                  <!-- Badge mobile -->
                  <Badge :variant="getEventBadgeVariant(event.type)" class="text-xs mt-1 sm:hidden">
                    {{ getEventTypeLabel(event.type) }}
                  </Badge>

                  <p class="text-xs md:text-sm text-gray-600 mt-1">{{ getEventDescription(event) }}</p>

                  <!-- Détails spécifiques selon le type - Layout mobile optimisé -->
                  <div v-if="hasEventDetails(event)" class="mt-2 space-y-1 md:grid md:grid-cols-2 md:gap-4 md:space-y-0 text-xs">
                    <div v-if="event.yield" class="flex justify-between md:block">
                      <span class="font-medium text-gray-500">Rendement:</span>
                      <span class="ml-1">{{ event.yield }}</span>
                    </div>
                    <div v-if="event.quantity" class="flex justify-between md:block">
                      <span class="font-medium text-gray-500">Quantité:</span>
                      <span class="ml-1">{{ event.quantity }}</span>
                    </div>
                    <div v-if="event.product" class="flex justify-between md:block">
                      <span class="font-medium text-gray-500">Produit:</span>
                      <span class="ml-1">{{ event.product }}</span>
                    </div>
                    <div v-if="event.weather" class="flex justify-between md:block">
                      <span class="font-medium text-gray-500">Météo:</span>
                      <span class="ml-1">{{ event.weather }}</span>
                    </div>
                  </div>

                  <!-- Notes -->
                  <p v-if="event.notes" class="text-xs text-gray-500 mt-2 italic line-clamp-2 md:line-clamp-none">{{ event.notes }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Message si aucun événement -->
          <div v-if="filteredEvents.length === 0" class="text-center py-8 md:py-12 text-gray-500">
            <div class="w-16 h-16 md:w-20 md:h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <CalendarIcon class="w-8 h-8 md:w-10 md:h-10 text-gray-300" />
            </div>
            <p class="text-sm md:text-base font-medium">Aucun événement trouvé</p>
            <p class="text-xs md:text-sm mt-1">Modifiez vos filtres pour voir plus d'événements</p>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { format, parseISO, isWithinInterval, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfQuarter, endOfQuarter, differenceInDays } from 'date-fns'
import { fr } from 'date-fns/locale'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  CalendarIcon,
  DropletIcon,
  SparklesIcon,
  ScissorsIcon,
  ShieldIcon,
  SproutIcon,
  PackageIcon,
  EyeIcon,
  LightbulbIcon,
  TrendingUpIcon,
  AlertTriangleIcon,
  ChevronDownIcon
} from 'lucide-vue-next'

// Alias pour l'icône de récolte
const HarvestIcon = PackageIcon

// Interface pour les événements enrichis
interface EnrichedEvent {
  id: string
  type: 'plantation' | 'arrosage' | 'fertilisation' | 'taille' | 'traitement' | 'récolte' | 'observation'
  plantName?: string
  plantIcon?: string
  date: string
  time?: string
  action?: string
  yield?: string
  quantity?: string
  product?: string
  weather?: string
  notes?: string
  details?: any
}

interface Recommendation {
  id: string
  type: 'watering' | 'fertilizing' | 'harvesting' | 'planting'
  title: string
  description: string
}

const props = defineProps<{ history: any[] }>()

// États des filtres
const eventTypeFilter = ref('all')
const plantFilter = ref('all')
const periodFilter = ref('all')
const showMobileFilters = ref(false)

// Transformation des données d'historique en événements enrichis
const enrichedEvents = computed((): EnrichedEvent[] => {
  const events: EnrichedEvent[] = []
  
  // Convertir l'historique existant
  props.history.forEach(item => {
    if (item.plantedDate) {
      events.push({
        id: `${item.id}-planted`,
        type: 'plantation',
        plantName: item.plantName,
        plantIcon: item.plantIcon,
        date: item.plantedDate,
        action: 'Plantation',
        notes: item.notes
      })
    }
    
    if (item.harvestedDate) {
      events.push({
        id: `${item.id}-harvested`,
        type: 'récolte',
        plantName: item.plantName,
        plantIcon: item.plantIcon,
        date: item.harvestedDate,
        action: 'Récolte',
        yield: item.yield,
        notes: item.notes
      })
    }
  })

  // Ajouter des événements simulés pour enrichir l'historique
  const today = new Date()
  const simulatedEvents: EnrichedEvent[] = [
    {
      id: 'sim-1',
      type: 'arrosage',
      plantName: 'Tomates Roma',
      plantIcon: '/icons/plants/tomatoes.svg',
      date: format(new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000), 'dd/MM/yyyy'),
      time: '08:30',
      quantity: '2L',
      weather: 'Ensoleillé',
      notes: 'Arrosage matinal, sol bien drainé'
    },
    {
      id: 'sim-2',
      type: 'fertilisation',
      plantName: 'Courgettes',
      plantIcon: '/icons/plants/zucchini.svg',
      date: format(new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000), 'dd/MM/yyyy'),
      time: '16:00',
      product: 'Compost maison',
      quantity: '500g',
      notes: 'Application autour du pied'
    },
    {
      id: 'sim-3',
      type: 'observation',
      plantName: 'Haricots verts',
      plantIcon: '/icons/plants/beans.svg',
      date: format(new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000), 'dd/MM/yyyy'),
      time: '19:15',
      notes: 'Première floraison observée, développement normal'
    },
    {
      id: 'sim-4',
      type: 'taille',
      plantName: 'Tomates Roma',
      plantIcon: '/icons/plants/tomatoes.svg',
      date: format(new Date(today.getTime() - 5 * 24 * 60 * 60 * 1000), 'dd/MM/yyyy'),
      time: '10:00',
      notes: 'Suppression des gourmands, tuteurage renforcé'
    },
    {
      id: 'sim-5',
      type: 'traitement',
      plantName: 'Courgettes',
      plantIcon: '/icons/plants/zucchini.svg',
      date: format(new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000), 'dd/MM/yyyy'),
      time: '07:00',
      product: 'Purin d\'ortie',
      notes: 'Traitement préventif contre le mildiou'
    }
  ]

  return [...events, ...simulatedEvents]
})

// Plantes uniques pour le filtre
const uniquePlants = computed(() => {
  const plants = new Set(enrichedEvents.value.map(e => e.plantName).filter(Boolean))
  return Array.from(plants).sort()
})

// Événements filtrés
const filteredEvents = computed(() => {
  return enrichedEvents.value.filter(event => {
    // Filtre par type
    if (eventTypeFilter.value !== 'all' && event.type !== eventTypeFilter.value) {
      return false
    }
    
    // Filtre par plante
    if (plantFilter.value !== 'all' && event.plantName !== plantFilter.value) {
      return false
    }
    
    // Filtre par période
    if (periodFilter.value !== 'all') {
      try {
        const eventDate = parseISO(event.date.split('/').reverse().join('-'))
        const now = new Date()
        
        switch (periodFilter.value) {
          case 'week':
            return isWithinInterval(eventDate, { start: startOfWeek(now), end: endOfWeek(now) })
          case 'month':
            return isWithinInterval(eventDate, { start: startOfMonth(now), end: endOfMonth(now) })
          case 'quarter':
            return isWithinInterval(eventDate, { start: startOfQuarter(now), end: endOfQuarter(now) })
        }
      } catch {
        return true
      }
    }
    
    return true
  })
})

// Événements groupés par date
const groupedEvents = computed(() => {
  const groups: Record<string, EnrichedEvent[]> = {}
  
  filteredEvents.value
    .sort((a, b) => {
      try {
        const dateA = parseISO(a.date.split('/').reverse().join('-'))
        const dateB = parseISO(b.date.split('/').reverse().join('-'))
        return dateB.getTime() - dateA.getTime() // Plus récent en premier
      } catch {
        return 0
      }
    })
    .forEach(event => {
      if (!groups[event.date]) {
        groups[event.date] = []
      }
      groups[event.date].push(event)
    })
  
  return groups
})

// Métriques
const totalEvents = computed(() => filteredEvents.value.length)

const harvestCount = computed(() => 
  filteredEvents.value.filter(e => e.type === 'récolte').length
)

const averageWateringFrequency = computed(() => {
  const wateringEvents = filteredEvents.value.filter(e => e.type === 'arrosage')
  if (wateringEvents.length === 0) return 0
  
  // Calculer sur les 30 derniers jours
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
  
  const recentWaterings = wateringEvents.filter(e => {
    try {
      const eventDate = parseISO(e.date.split('/').reverse().join('-'))
      return eventDate >= thirtyDaysAgo
    } catch {
      return false
    }
  })
  
  return Math.round((recentWaterings.length / 4) * 10) / 10 // Moyenne par semaine
})

const activePlantsCount = computed(() => {
  const plants = new Set(filteredEvents.value.map(e => e.plantName).filter(Boolean))
  return plants.size
})

// Recommandations basées sur l'historique
const recommendations = computed((): Recommendation[] => {
  const recs: Recommendation[] = []
  
  // Recommandation d'arrosage
  const lastWatering = filteredEvents.value
    .filter(e => e.type === 'arrosage')
    .sort((a, b) => {
      try {
        const dateA = parseISO(a.date.split('/').reverse().join('-'))
        const dateB = parseISO(b.date.split('/').reverse().join('-'))
        return dateB.getTime() - dateA.getTime()
      } catch {
        return 0
      }
    })[0]
  
  if (lastWatering) {
    try {
      const lastWateringDate = parseISO(lastWatering.date.split('/').reverse().join('-'))
      const daysSince = differenceInDays(new Date(), lastWateringDate)
      
      if (daysSince > 2) {
        recs.push({
          id: 'watering-rec',
          type: 'watering',
          title: 'Arrosage recommandé',
          description: `Dernier arrosage il y a ${daysSince} jours. Vérifiez l'humidité du sol.`
        })
      }
    } catch {
      // Ignore parsing errors
    }
  }
  
  // Recommandation de fertilisation
  const lastFertilizing = filteredEvents.value
    .filter(e => e.type === 'fertilisation')
    .sort((a, b) => {
      try {
        const dateA = parseISO(a.date.split('/').reverse().join('-'))
        const dateB = parseISO(b.date.split('/').reverse().join('-'))
        return dateB.getTime() - dateA.getTime()
      } catch {
        return 0
      }
    })[0]
  
  if (!lastFertilizing || (lastFertilizing && differenceInDays(new Date(), parseISO(lastFertilizing.date.split('/').reverse().join('-'))) > 14)) {
    recs.push({
      id: 'fertilizing-rec',
      type: 'fertilizing',
      title: 'Fertilisation suggérée',
      description: 'Il est temps d\'apporter des nutriments à vos plantes pour optimiser leur croissance.'
    })
  }
  
  return recs
})

// Fonctions utilitaires
const formatDate = (dateStr: string) => {
  try {
    const date = parseISO(dateStr.split('/').reverse().join('-'))
    return format(date, 'EEEE d MMMM', { locale: fr })
  } catch {
    return dateStr
  }
}

const hasEventDetails = (event: EnrichedEvent) => {
  return !!(event.yield || event.quantity || event.product || event.weather)
}

const getEventIcon = (type: string) => {
  switch (type) {
    case 'plantation': return SproutIcon
    case 'arrosage': return DropletIcon
    case 'fertilisation': return SparklesIcon
    case 'taille': return ScissorsIcon
    case 'traitement': return ShieldIcon
    case 'récolte': return HarvestIcon
    case 'observation': return EyeIcon
    default: return CalendarIcon
  }
}

const getEventIconClass = (type: string) => {
  switch (type) {
    case 'plantation': return 'bg-green-100 text-green-600'
    case 'arrosage': return 'bg-blue-100 text-blue-600'
    case 'fertilisation': return 'bg-purple-100 text-purple-600'
    case 'taille': return 'bg-orange-100 text-orange-600'
    case 'traitement': return 'bg-red-100 text-red-600'
    case 'récolte': return 'bg-yellow-100 text-yellow-600'
    case 'observation': return 'bg-gray-100 text-gray-600'
    default: return 'bg-gray-100 text-gray-600'
  }
}

const getEventBadgeVariant = (type: string) => {
  switch (type) {
    case 'plantation': return 'secondary'
    case 'récolte': return 'default'
    case 'traitement': return 'destructive'
    default: return 'outline'
  }
}

const getEventTypeLabel = (type: string) => {
  const labels: Record<string, string> = {
    'plantation': 'Plantation',
    'arrosage': 'Arrosage',
    'fertilisation': 'Fertilisation',
    'taille': 'Taille',
    'traitement': 'Traitement',
    'récolte': 'Récolte',
    'observation': 'Observation'
  }
  return labels[type] || type
}

const getEventDescription = (event: EnrichedEvent) => {
  if (event.action) return event.action
  
  switch (event.type) {
    case 'plantation': return 'Nouvelle plantation dans la zone'
    case 'arrosage': return 'Arrosage effectué'
    case 'fertilisation': return 'Fertilisation appliquée'
    case 'taille': return 'Taille et entretien'
    case 'traitement': return 'Traitement appliqué'
    case 'récolte': return 'Récolte effectuée'
    case 'observation': return 'Observation et suivi'
    default: return 'Événement enregistré'
  }
}

const getRecommendationIcon = (type: string) => {
  switch (type) {
    case 'watering': return DropletIcon
    case 'fertilizing': return SparklesIcon
    case 'harvesting': return HarvestIcon
    case 'planting': return SproutIcon
    default: return TrendingUpIcon
  }
}
</script>

<style scoped>
/* Limitation du nombre de lignes pour les notes sur mobile */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@media (min-width: 768px) {
  .line-clamp-none {
    display: block;
    -webkit-line-clamp: unset;
    -webkit-box-orient: unset;
    overflow: visible;
  }
}
</style> 