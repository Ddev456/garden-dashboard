import type { Plant, PlantVariety, PlantCompanion, PlantPest, PlantDisease, NutritionalValue, CulturalTip } from '@/types/wiki'

// Données mockées pour le Wiki des Plantes
export const mockPlantsWiki: Plant[] = [
  {
    id: 'tomate',
    slug: 'tomate',
    name: 'Tomate',
    scientificName: 'Solanum lycopersicum',
    icon: '/icons/plants/tomato.svg',
    images: [
      '/images/wiki/tomato/tomato-plant.jpg',
      '/images/wiki/tomato/tomato-fruits.jpg',
      '/images/wiki/tomato/tomato-harvest.jpg'
    ],
    category: 'légume-fruit',
    difficulty: 'moyen',
    seasons: ['printemps', 'été'],
    
    description: 'La tomate est l\'un des légumes-fruits les plus populaires au potager. Originaire d\'Amérique du Sud, elle offre une grande diversité de formes, couleurs et saveurs.',
    characteristics: [
      'Croissance indéterminée ou déterminée selon les variétés',
      'Nécessite un tuteurage pour la plupart des variétés',
      'Sensible au gel et aux maladies cryptogamiques',
      'Production échelonnée tout l\'été',
      'Riche en lycopène et vitamines'
    ],
    origin: 'Amérique du Sud (Pérou, Équateur)',
    family: 'Solanacées',
    
    sowingPeriod: 'Février-Avril (sous abri)',
    plantingPeriod: 'Mi-mai après les dernières gelées',
    harvestPeriod: 'Juillet-Octobre',
    growthDuration: '120-150 jours',
    spacing: '60-80 cm entre plants',
    exposure: 'Plein soleil (6-8h/jour)',
    soil: 'Riche, bien drainé, pH 6.0-6.8',
    watering: 'Régulier et profond, éviter le feuillage',
    temperature: {
      min: 10,
      max: 35,
      optimal: 22
    },
    
    varieties: [
      {
        id: 'cherry-rouge',
        name: 'Tomate Cerise Rouge',
        description: 'Petites tomates très sucrées, parfaites pour l\'apéritif',
        characteristics: ['Très productive', 'Croissance indéterminée', 'Résistante aux maladies'],
        difficulty: 'facile',
        harvestTime: '70-80 jours',
        specialFeatures: ['Idéale débutants', 'Culture en pot possible']
      },
      {
        id: 'coeur-de-boeuf',
        name: 'Cœur de Bœuf',
        description: 'Grosse tomate charnue, excellente en salade',
        characteristics: ['Fruits de 300-500g', 'Chair ferme', 'Peu de graines'],
        difficulty: 'moyen',
        harvestTime: '85-95 jours',
        specialFeatures: ['Variété ancienne', 'Goût authentique']
      },
      {
        id: 'san-marzano',
        name: 'San Marzano',
        description: 'Tomate allongée idéale pour les sauces',
        characteristics: ['Forme allongée', 'Chair dense', 'Peu de jus'],
        difficulty: 'moyen',
        harvestTime: '90-100 jours',
        specialFeatures: ['Parfaite pour conserves', 'Origine italienne']
      }
    ],
    
    companions: [
      {
        plantId: 'basilic',
        plantName: 'Basilic',
        plantIcon: '/icons/plants/basil.svg',
        benefit: 'Améliore le goût et repousse les insectes nuisibles',
        distance: '20-30 cm',
        type: 'beneficial'
      },
      {
        plantId: 'carotte',
        plantName: 'Carotte',
        plantIcon: '/icons/plants/carrot.svg',
        benefit: 'Ameublit le sol, compagnonnage neutre',
        distance: '30 cm',
        type: 'neutral'
      }
    ],
    
    pests: [
      {
        id: 'pucerons',
        name: 'Pucerons',
        description: 'Petits insectes qui sucent la sève des feuilles',
        symptoms: ['Feuilles recroquevillées', 'Miellat collant', 'Croissance ralentie'],
        prevention: ['Pulvérisation d\'eau savonneuse', 'Favoriser les auxiliaires'],
        treatment: ['Savon noir', 'Coccinelles', 'Purin d\'ortie'],
        severity: 'medium',
        season: ['printemps', 'été']
      },
      {
        id: 'doryphore',
        name: 'Doryphore',
        description: 'Coléoptère s\'attaquant au feuillage',
        symptoms: ['Trous dans les feuilles', 'Larves orange visibles'],
        prevention: ['Rotation des cultures', 'Inspection régulière'],
        treatment: ['Ramassage manuel', 'Bacillus thuringiensis'],
        severity: 'high',
        season: ['été']
      }
    ],
    
    diseases: [
      {
        id: 'mildiou',
        name: 'Mildiou',
        description: 'Maladie cryptogamique très courante sur tomate',
        symptoms: ['Taches brunes sur feuilles', 'Pourriture des fruits', 'Duvet blanc'],
        causes: ['Humidité élevée', 'Arrosage sur le feuillage', 'Manque d\'aération'],
        prevention: ['Éviter l\'arrosage sur feuilles', 'Aérer les cultures', 'Paillis au sol'],
        treatment: ['Bouillie bordelaise', 'Décoction de prêle', 'Supprimer parties atteintes'],
        severity: 'high'
      }
    ],
    
    nutritionalValues: [
      {
        nutrient: 'Lycopène',
        amount: '2.6',
        unit: 'mg/100g',
        description: 'Antioxydant puissant, plus biodisponible après cuisson',
        healthBenefit: 'Protection cardiovasculaire et anti-cancer'
      },
      {
        nutrient: 'Vitamine C',
        amount: '23',
        unit: 'mg/100g',
        description: 'Vitamine essentielle pour le système immunitaire',
        healthBenefit: 'Renforce les défenses naturelles'
      },
      {
        nutrient: 'Potassium',
        amount: '237',
        unit: 'mg/100g',
        description: 'Minéral important pour l\'équilibre hydrique',
        healthBenefit: 'Régulation de la pression artérielle'
      }
    ],
    
    culturalTips: [
      {
        title: 'Tuteurage indispensable',
        description: 'Installer les tuteurs dès la plantation pour éviter de blesser les racines',
        season: ['printemps'],
        difficulty: 'facile',
        category: 'plantation'
      },
      {
        title: 'Suppression des gourmands',
        description: 'Éliminer régulièrement les pousses qui se développent à l\'aisselle des feuilles',
        season: ['été'],
        difficulty: 'moyen',
        category: 'entretien'
      }
    ],
    
    tags: ['populaire', 'productive', 'polyvalente', 'tuteurage', 'serre'],
    relatedItineraries: ['tomates-cerises'],
    averageRating: 4.5,
    ratingsCount: 1247,
    popularity: 95
  },

  {
    id: 'laitue',
    slug: 'laitue',
    name: 'Laitue',
    scientificName: 'Lactuca sativa',
    icon: '/icons/plants/lettuce.svg',
    category: 'légume-feuille',
    difficulty: 'facile',
    seasons: ['printemps', 'été', 'automne', 'hiver'],
    
    description: 'La laitue est l\'un des légumes-feuilles les plus faciles à cultiver. Rapide de croissance, elle offre une grande diversité de formes et de textures.',
    characteristics: [
      'Croissance rapide (6-12 semaines)',
      'Culture possible toute l\'année sous abri',
      'Résistante au froid pour certaines variétés',
      'Récolte à la coupe possible',
      'Peu d\'entretien nécessaire'
    ],
    origin: 'Bassin méditerranéen',
    family: 'Astéracées',
    
    sowingPeriod: 'Février-Septembre (étalé)',
    harvestPeriod: 'Mars-Décembre',
    growthDuration: '45-70 jours',
    spacing: '25-30 cm entre plants',
    exposure: 'Mi-ombre en été, soleil ailleurs',
    soil: 'Léger, frais, riche en humus',
    watering: 'Régulier mais modéré',
    temperature: {
      min: -5,
      max: 25,
      optimal: 18
    },
    
    varieties: [
      {
        id: 'batavia',
        name: 'Batavia',
        description: 'Laitue croquante aux feuilles épaisses',
        characteristics: ['Résistante à la chaleur', 'Bonne conservation', 'Texture croquante'],
        difficulty: 'facile',
        harvestTime: '50-60 jours'
      },
      {
        id: 'feuille-de-chene',
        name: 'Feuille de Chêne',
        description: 'Laitue aux feuilles découpées et tendres',
        characteristics: ['Feuilles découpées', 'Saveur douce', 'Croissance rapide'],
        difficulty: 'facile',
        harvestTime: '45-55 jours'
      }
    ],
    
    companions: [
      {
        plantId: 'carotte',
        plantName: 'Carotte',
        plantIcon: '/icons/plants/carrot.svg',
        benefit: 'Optimise l\'espace, racines à profondeurs différentes',
        distance: '10-15 cm',
        type: 'beneficial'
      }
    ],
    
    pests: [
      {
        id: 'limaces',
        name: 'Limaces et escargots',
        description: 'Mollusques s\'attaquant aux jeunes feuilles',
        symptoms: ['Trous dans les feuilles', 'Traces de bave', 'Plants dévorés'],
        prevention: ['Paillis rugueux', 'Coquilles d\'œuf', 'Arrosage matinal'],
        treatment: ['Pièges à bière', 'Cendre', 'Ramassage nocturne'],
        severity: 'medium',
        season: ['printemps', 'automne']
      }
    ],
    
    diseases: [
      {
        id: 'pourriture-grise',
        name: 'Pourriture grise (Botrytis)',
        description: 'Champignon provoquant la pourriture des feuilles',
        symptoms: ['Taches brunes', 'Duvet grisâtre', 'Pourriture molle'],
        causes: ['Excès d\'humidité', 'Manque d\'aération', 'Blessures'],
        prevention: ['Espacement suffisant', 'Arrosage au pied', 'Éviter les blessures'],
        treatment: ['Suppression parties atteintes', 'Améliorer aération'],
        severity: 'medium'
      }
    ],
    
    tags: ['facile', 'rapide', 'toute-saison', 'débutant'],
    averageRating: 4.2,
    ratingsCount: 823,
    popularity: 88
  },

  {
    id: 'carotte',
    slug: 'carotte',
    name: 'Carotte',
    scientificName: 'Daucus carota',
    icon: '/icons/plants/carrot.svg',
    category: 'légume-racine',
    difficulty: 'facile',
    seasons: ['printemps', 'été', 'automne'],
    
    description: 'La carotte est un légume-racine incontournable du potager. Facile à cultiver, elle se conserve bien et offre de nombreuses variétés.',
    characteristics: [
      'Semis direct obligatoire',
      'Croissance en profondeur',
      'Résistante au froid',
      'Excellente conservation',
      'Riche en carotène'
    ],
    origin: 'Afghanistan, Iran',
    family: 'Apiacées',
    
    sowingPeriod: 'Mars-Juillet',
    harvestPeriod: 'Juin-Décembre',
    growthDuration: '70-120 jours',
    spacing: '3-5 cm entre plants',
    exposure: 'Soleil à mi-ombre',
    soil: 'Profond, meuble, sans cailloux',
    watering: 'Régulier, éviter les à-coups',
    temperature: {
      min: -8,
      max: 25,
      optimal: 18
    },
    
    varieties: [
      {
        id: 'nantaise',
        name: 'Nantaise',
        description: 'Carotte classique, cylindrique et sucrée',
        characteristics: ['Forme cylindrique', 'Chair tendre', 'Saveur douce'],
        difficulty: 'facile',
        harvestTime: '90-100 jours'
      },
      {
        id: 'parisienne',
        name: 'Parisienne',
        description: 'Carotte ronde, idéale pour sols lourds',
        characteristics: ['Forme ronde', 'Culture en sol lourd', 'Récolte précoce'],
        difficulty: 'facile',
        harvestTime: '70-80 jours'
      }
    ],
    
    companions: [
      {
        plantId: 'laitue',
        plantName: 'Laitue',
        plantIcon: '/icons/plants/lettuce.svg',
        benefit: 'Utilise l\'espace en surface pendant la croissance des carottes',
        distance: '10 cm',
        type: 'beneficial'
      }
    ],
    
    pests: [
      {
        id: 'mouche-carotte',
        name: 'Mouche de la carotte',
        description: 'Larves creusant des galeries dans les racines',
        symptoms: ['Galeries dans racines', 'Feuillage qui jaunit', 'Racines vermoulues'],
        prevention: ['Voile anti-insectes', 'Rotation cultures', 'Semis tardifs'],
        treatment: ['Difficile une fois installée', 'Voile de protection'],
        severity: 'high',
        season: ['printemps', 'été']
      }
    ],
    
    tags: ['facile', 'conservation', 'semis-direct', 'résistant-froid'],
    averageRating: 4.3,
    ratingsCount: 1156,
    popularity: 91
  },

  {
    id: 'basilic',
    slug: 'basilic',
    name: 'Basilic',
    scientificName: 'Ocimum basilicum',
    icon: '/icons/plants/basil.svg',
    category: 'aromate',
    difficulty: 'facile',
    seasons: ['printemps', 'été'],
    
    description: 'Le basilic est l\'aromate roi de la cuisine méditerranéenne. Facile à cultiver, il parfume délicieusement les plats d\'été.',
    characteristics: [
      'Croissance rapide en climat chaud',
      'Très sensible au froid',
      'Pincement des fleurs nécessaire',
      'Excellent compagnon de la tomate',
      'Parfum intense et authentique'
    ],
    origin: 'Inde, Asie tropicale',
    family: 'Lamiacées',
    
    sowingPeriod: 'Mars-Mai (sous abri puis extérieur)',
    plantingPeriod: 'Mai-Juin',
    harvestPeriod: 'Juin-Octobre',
    growthDuration: '60-90 jours',
    spacing: '20-25 cm entre plants',
    exposure: 'Plein soleil, à l\'abri du vent',
    soil: 'Riche, bien drainé, pH neutre',
    watering: 'Régulier mais sans excès',
    temperature: {
      min: 10,
      max: 30,
      optimal: 25
    },
    
    varieties: [
      {
        id: 'grand-vert',
        name: 'Basilic Grand Vert',
        description: 'Variété classique aux grandes feuilles parfumées',
        characteristics: ['Grandes feuilles', 'Parfum intense', 'Croissance vigoureuse'],
        difficulty: 'facile',
        harvestTime: '60-70 jours'
      },
      {
        id: 'pourpre',
        name: 'Basilic Pourpre',
        description: 'Variété décorative aux feuilles violettes',
        characteristics: ['Feuilles pourpres', 'Saveur épicée', 'Très décoratif'],
        difficulty: 'facile',
        harvestTime: '65-75 jours'
      }
    ],
    
    companions: [
      {
        plantId: 'tomate',
        plantName: 'Tomate',
        plantIcon: '/icons/plants/tomato.svg',
        benefit: 'Améliore la saveur des tomates et repousse certains insectes',
        distance: '25 cm',
        type: 'beneficial'
      }
    ],
    
    pests: [
      {
        id: 'pucerons-basilic',
        name: 'Pucerons',
        description: 'Insectes s\'attaquant aux jeunes pousses',
        symptoms: ['Feuilles recroquevillées', 'Croissance ralentie'],
        prevention: ['Pulvérisation d\'eau', 'Rotation des cultures'],
        treatment: ['Savon noir', 'Coccinelles'],
        severity: 'low',
        season: ['été']
      }
    ],
    
    tags: ['aromate', 'méditerranéen', 'chaleur', 'cuisine'],
    averageRating: 4.6,
    ratingsCount: 675,
    popularity: 78
  },

  {
    id: 'courgette',
    slug: 'courgette',
    name: 'Courgette',
    scientificName: 'Cucurbita pepo',
    icon: '/icons/plants/zucchini.svg',
    category: 'légume-fruit',
    difficulty: 'moyen',
    seasons: ['printemps', 'été'],
    
    description: 'La courgette est un légume-fruit très productif qui demande de l\'espace mais offre des récoltes abondantes tout l\'été.',
    characteristics: [
      'Très productive (2-3 kg par plant)',
      'Croissance rapide et vigoureuse',
      'Besoin d\'espace important',
      'Récolte quasi quotidienne en saison',
      'Fleurs comestibles'
    ],
    origin: 'Amérique centrale',
    family: 'Cucurbitacées',
    
    sowingPeriod: 'Avril-Juin',
    plantingPeriod: 'Mai-Juin',
    harvestPeriod: 'Juillet-Octobre',
    growthDuration: '50-60 jours',
    spacing: '100-120 cm entre plants',
    exposure: 'Plein soleil',
    soil: 'Riche, profond, bien drainé',
    watering: 'Abondant et régulier',
    temperature: {
      min: 12,
      max: 30,
      optimal: 22
    },
    
    varieties: [
      {
        id: 'verte-non-coureuse',
        name: 'Verte non coureuse',
        description: 'Variété compacte parfaite pour petits espaces',
        characteristics: ['Port compact', 'Production concentrée', 'Fruits verts'],
        difficulty: 'facile',
        harvestTime: '50-55 jours'
      },
      {
        id: 'jaune',
        name: 'Courgette Jaune',
        description: 'Variété originale aux fruits jaune vif',
        characteristics: ['Fruits jaunes', 'Chair tendre', 'Très décorative'],
        difficulty: 'moyen',
        harvestTime: '55-60 jours'
      }
    ],
    
    pests: [
      {
        id: 'pucerons-courgette',
        name: 'Pucerons',
        description: 'Colonisent rapidement les jeunes pousses',
        symptoms: ['Feuilles recroquevillées', 'Miellat abondant'],
        prevention: ['Inspection régulière', 'Favoriser auxiliaires'],
        treatment: ['Savon noir', 'Jet d\'eau'],
        severity: 'medium',
        season: ['été']
      }
    ],
    
    diseases: [
      {
        id: 'oidium-courgette',
        name: 'Oïdium',
        description: 'Maladie cryptogamique formant un duvet blanc',
        symptoms: ['Duvet blanc sur feuilles', 'Jaunissement', 'Dessèchement'],
        causes: ['Variations thermiques', 'Humidité stagnante'],
        prevention: ['Espacement des plants', 'Arrosage au pied'],
        treatment: ['Soufre', 'Bicarbonate de soude'],
        severity: 'medium'
      }
    ],
    
    tags: ['productive', 'été', 'espace', 'gourmande'],
    averageRating: 4.1,
    ratingsCount: 987,
    popularity: 85
  },

  {
    id: 'navet',
    slug: 'navet',
    name: 'Navet',
    scientificName: 'Brassica rapa',
    icon: '/icons/plants/turnip.svg',
    category: 'légume-racine',
    difficulty: 'facile',
    seasons: ['automne', 'hiver'],
    
    description: 'Le navet est un légume-racine rustique, parfait pour les cultures d\'automne et d\'hiver. Facile à cultiver et très résistant au froid.',
    characteristics: [
      'Très résistant au froid (-10°C)',
      'Croissance rapide (6-10 semaines)',
      'Culture d\'automne-hiver idéale',
      'Feuilles également comestibles',
      'Peu sensible aux maladies'
    ],
    origin: 'Europe, Asie',
    family: 'Brassicacées',
    
    sowingPeriod: 'Juillet-Septembre',
    harvestPeriod: 'Septembre-Mars',
    growthDuration: '45-70 jours',
    spacing: '15-20 cm entre plants',
    exposure: 'Soleil à mi-ombre',
    soil: 'Frais, profond, bien drainé',
    watering: 'Régulier, éviter la sécheresse',
    temperature: {
      min: -10,
      max: 20,
      optimal: 15
    },
    
    varieties: [
      {
        id: 'milan-rouge',
        name: 'Milan Rouge',
        description: 'Navet plat à collet rouge, très rustique',
        characteristics: ['Forme aplatie', 'Collet rouge', 'Chair blanche'],
        difficulty: 'facile',
        harvestTime: '50-60 jours'
      },
      {
        id: 'rave-dor',
        name: 'Rave d\'Or',
        description: 'Navet rond à chair jaune, très doux',
        characteristics: ['Chair jaune', 'Saveur douce', 'Bonne conservation'],
        difficulty: 'facile',
        harvestTime: '45-55 jours'
      }
    ],
    
    pests: [
      {
        id: 'altises-navet',
        name: 'Altises',
        description: 'Petites puces noires qui criblent les feuilles',
        symptoms: ['Petits trous dans feuilles', 'Ralentissement croissance'],
        prevention: ['Arrosage régulier', 'Voile anti-insectes'],
        treatment: ['Cendre', 'Terre de diatomée'],
        severity: 'low',
        season: ['automne']
      }
    ],
    
    tags: ['résistant-froid', 'automne-hiver', 'facile', 'rustique'],
    relatedItineraries: ['radis'],
    averageRating: 3.8,
    ratingsCount: 456,
    popularity: 62
  }
]

// Fonction utilitaire pour rechercher des plantes
export function searchPlants(query: string = '', filters: any = {}): Plant[] {
  let filteredPlants = [...mockPlantsWiki]
  
  // Recherche textuelle
  if (query) {
    const searchTerm = query.toLowerCase()
    filteredPlants = filteredPlants.filter(plant => 
      plant.name.toLowerCase().includes(searchTerm) ||
      plant.scientificName.toLowerCase().includes(searchTerm) ||
      plant.description.toLowerCase().includes(searchTerm) ||
      plant.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    )
  }
  
  // Filtres
  if (filters.category?.length) {
    filteredPlants = filteredPlants.filter(plant => 
      filters.category.includes(plant.category)
    )
  }
  
  if (filters.difficulty?.length) {
    filteredPlants = filteredPlants.filter(plant => 
      filters.difficulty.includes(plant.difficulty)
    )
  }
  
  if (filters.seasons?.length) {
    filteredPlants = filteredPlants.filter(plant => 
      plant.seasons.some(season => filters.seasons.includes(season))
    )
  }
  
  return filteredPlants
}

// Fonction pour obtenir une plante par slug
export function getPlantBySlug(slug: string): Plant | undefined {
  return mockPlantsWiki.find(plant => plant.slug === slug)
}

// Fonction pour obtenir les statistiques des filtres
export function getFilterStats() {
  const categories = mockPlantsWiki.reduce((acc, plant) => {
    acc[plant.category] = (acc[plant.category] || 0) + 1
    return acc
  }, {} as Record<string, number>)
  
  const difficulties = mockPlantsWiki.reduce((acc, plant) => {
    acc[plant.difficulty] = (acc[plant.difficulty] || 0) + 1
    return acc
  }, {} as Record<string, number>)
  
  const seasons = mockPlantsWiki.reduce((acc, plant) => {
    plant.seasons.forEach(season => {
      acc[season] = (acc[season] || 0) + 1
    })
    return acc
  }, {} as Record<string, number>)
  
  return { categories, difficulties, seasons }
} 