import { ref, computed } from 'vue'
import { mockGardens, defaultGarden, getGardenById, getZoneById, getItineraryById } from '@/mocks/gardensData'
import type { Garden, Zone, ZoneItinerary } from '@/types'

// État global du jardin sélectionné
const currentGarden = ref<Garden>(defaultGarden)

export const useGarden = () => {
  // Computed pour les zones du jardin actuel
  const currentZones = computed(() => currentGarden.value.zones)
  
  // Computed pour tous les itinéraires du jardin actuel
  const currentItineraries = computed(() => {
    return currentGarden.value.zones.flatMap((zone: Zone) => zone.itineraries)
  })

  // Fonctions de navigation
  const selectGarden = (gardenId: string) => {
    const garden = getGardenById(gardenId)
    if (garden) {
      currentGarden.value = garden
    }
  }

  const getZone = (zoneId: string) => {
    return getZoneById(zoneId)
  }

  const getItinerary = (itineraryId: string) => {
    return getItineraryById(itineraryId)
  }

  // Fonction pour obtenir les informations de zone d'un itinéraire
  const getZoneInfoForItinerary = (itinerary: ZoneItinerary) => {
    const zone = getZoneById(itinerary.zoneId)
    if (!zone) return null
    
    const garden = getGardenById(zone.gardenId)
    if (!garden) return null

    return {
      zone,
      garden,
      zoneColor: zone.color,
      gardenIcon: garden.icon
    }
  }

  // Fonction pour naviguer vers une zone spécifique
  const navigateToZone = (zoneId: string) => {
    return `/zones/${zoneId}`
  }

  // Fonction pour naviguer vers un itinéraire spécifique
  const navigateToItinerary = (itineraryId: string) => {
    return `/itineraires/${itineraryId}`
  }

  return {
    // État
    currentGarden: readonly(currentGarden),
    currentZones,
    currentItineraries,
    allGardens: mockGardens,
    
    // Actions
    selectGarden,
    getZone,
    getItinerary,
    getZoneInfoForItinerary,
    navigateToZone,
    navigateToItinerary
  }
} 