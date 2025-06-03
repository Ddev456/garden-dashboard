import type { PlantDatabase } from '@/types/assistant'

export const plantsDatabase: PlantDatabase[] = [
  {
    id: 'tomato-cherry',
    name: 'Tomate cerise',
    type: 'légume-fruit',
    description: 'Petites tomates sucrées parfaites pour les salades et l\'apéritif',
    icon: '/icons/plants/tomatoes.svg',
    difficulty: 'moyen',
    
    soilTypes: ['Terre argilo-limoneuse', 'Terre sableuse enrichie', 'Terreau universel'],
    sunExposure: ['Plein soleil - 6h/jour', 'Plein soleil - 7h/jour', 'Plein soleil - 8h/jour'],
    seasons: ['printemps', 'été'],
    spacing: '40-50cm entre plants',
    depth: '1-2cm de profondeur',
    
    seedingPeriod: ['Mars', 'Avril'],
    transplantPeriod: ['Mai', 'Juin'],
    harvestPeriod: ['Juillet', 'Août', 'Septembre'],
    growthDuration: '4-5 mois',
    
    varieties: [
      {
        name: 'Cherry Belle',
        characteristics: 'Petites tomates rondes très sucrées, production abondante',
        difficulty: 'facile',
        harvestTime: '65-70 jours'
      },
      {
        name: 'Black Cherry',
        characteristics: 'Tomates violettes au goût complexe, très originales',
        difficulty: 'moyen',
        harvestTime: '75-80 jours'
      },
      {
        name: 'Sweet Million',
        characteristics: 'Grappes très fournies, résistante aux maladies',
        difficulty: 'facile',
        harvestTime: '60-65 jours'
      }
    ],
    
    companions: [
      {
        plant: 'Basilic',
        benefit: 'Améliore le goût et repousse les pucerons',
        distance: '30-40cm',
        icon: '/icons/plants/basil.svg'
      },
      {
        plant: 'Œillets d\'Inde',
        benefit: 'Protection contre les nématodes et pucerons',
        distance: '25cm',
        icon: '/icons/plants/marigold.svg'
      }
    ],
    
    stepTemplates: [
      {
        title: 'Préparation des semis',
        description: 'Semis en godets dans un endroit chaud',
        duration: '2 heures',
        relativeWeek: 0,
        icon: '/icons/tools/direct-sowing.svg',
        tools: ['Godets', 'Terreau', 'Arrosoir'],
        tips: ['Maintenir la température à 20-22°C', 'Arroser avec précaution']
      },
      {
        title: 'Transplantation',
        description: 'Repiquer les plants en pleine terre',
        duration: '1 heure',
        relativeWeek: 8,
        icon: '/icons/tools/transplant.svg',
        tools: ['Transplantoir', 'Seau d\'eau', 'Paillis'],
        tips: ['Transplanter en soirée', 'Arroser abondamment']
      },
      {
        title: 'Installation des tuteurs',
        description: 'Mettre en place les supports pour les plants',
        duration: '45 minutes',
        relativeWeek: 10,
        icon: '/icons/planting.svg',
        tools: ['Tuteurs', 'Liens souples'],
        tips: ['Installer les tuteurs dès la plantation', 'Vérifier régulièrement']
      },
      {
        title: 'Première récolte',
        description: 'Récolter les premières tomates mûres',
        duration: '30 minutes',
        relativeWeek: 16,
        icon: '/icons/tools/harvest.svg',
        tools: ['Sécateur', 'Panier de récolte'],
        tips: ['Récolter le matin', 'Cueillir les fruits bien colorés']
      }
    ]
  },
  
  {
    id: 'lettuce',
    name: 'Laitue',
    type: 'légume-feuille',
    description: 'Légume-feuille facile à cultiver, parfait pour les débutants',
    icon: '/icons/plants/lettuce.svg',
    difficulty: 'facile',
    
    soilTypes: ['Terre argilo-limoneuse', 'Terre sableuse', 'Terreau universel'],
    sunExposure: ['Mi-ombre', 'Plein soleil - 4h/jour', 'Plein soleil - 6h/jour'],
    seasons: ['printemps', 'été', 'automne'],
    spacing: '25-30cm entre plants',
    depth: '0.5-1cm de profondeur',
    
    seedingPeriod: ['Mars', 'Avril', 'Mai', 'Août', 'Septembre'],
    transplantPeriod: ['Avril', 'Mai', 'Juin', 'Septembre'],
    harvestPeriod: ['Mai', 'Juin', 'Juillet', 'Octobre', 'Novembre'],
    growthDuration: '2-3 mois',
    
    varieties: [
      {
        name: 'Batavia',
        characteristics: 'Feuilles croquantes, résistante à la montée en graines',
        difficulty: 'facile',
        harvestTime: '60-70 jours'
      },
      {
        name: 'Lollo Rossa',
        characteristics: 'Feuilles rouges ondulées, très décorative',
        difficulty: 'facile',
        harvestTime: '50-60 jours'
      }
    ],
    
    stepTemplates: [
      {
        title: 'Semis en place',
        description: 'Semer directement en pleine terre',
        duration: '30 minutes',
        relativeWeek: 0,
        icon: '/icons/steps/seeding.svg',
        tools: ['Graines', 'Râteau', 'Arrosoir'],
        tips: ['Semer clair', 'Recouvrir légèrement']
      },
      {
        title: 'Éclaircissage',
        description: 'Éliminer les plants en surnombre',
        duration: '20 minutes',
        relativeWeek: 3,
        icon: '/icons/tools/thin.svg',
        tools: ['Ciseaux'],
        tips: ['Garder un plant tous les 25cm', 'Arroser après']
      },
      {
        title: 'Récolte',
        description: 'Couper la laitue à la base',
        duration: '15 minutes',
        relativeWeek: 8,
        icon: '/icons/steps/harvest.svg',
        tools: ['Couteau'],
        tips: ['Récolter le matin', 'Couper au ras du sol']
      }
    ]
  },
  
  {
    id: 'carrot',
    name: 'Carotte',
    type: 'légume-racine',
    description: 'Légume-racine nutritif, excellent pour la santé',
    icon: '/icons/plants/carrot.svg',
    difficulty: 'moyen',
    
    soilTypes: ['Terre sableuse', 'Terre légère bien drainée'],
    sunExposure: ['Plein soleil - 6h/jour', 'Mi-ombre'],
    seasons: ['printemps', 'été', 'automne'],
    spacing: '3-5cm entre plants',
    depth: '1-2cm de profondeur',
    
    seedingPeriod: ['Mars', 'Avril', 'Mai', 'Juin', 'Juillet'],
    transplantPeriod: [], // Pas de transplantation pour les carottes
    harvestPeriod: ['Juin', 'Juillet', 'Août', 'Septembre', 'Octobre'],
    growthDuration: '3-4 mois',
    
    stepTemplates: [
      {
        title: 'Préparation du sol',
        description: 'Ameublir la terre en profondeur',
        duration: '1 heure',
        relativeWeek: 0,
        icon: '/icons/tools/dig.svg',
        tools: ['Bêche', 'Râteau'],
        tips: ['Sol meuble sur 30cm', 'Enlever les cailloux']
      },
      {
        title: 'Semis en ligne',
        description: 'Semer les graines en lignes espacées',
        duration: '45 minutes',
        relativeWeek: 0,
        icon: '/icons/steps/seeding.svg',
        tools: ['Graines', 'Cordeau', 'Arrosoir'],
        tips: ['Lignes espacées de 25cm', 'Semer clair']
      }
    ]
  },
  
  {
    id: 'basil',
    name: 'Basilic',
    type: 'aromate',
    description: 'Herbe aromatique méditerranéenne, parfaite en cuisine',
    icon: '/icons/plants/basil.svg',
    difficulty: 'facile',
    
    soilTypes: ['Terre argilo-limoneuse', 'Terreau universel', 'Terre bien drainée'],
    sunExposure: ['Plein soleil - 6h/jour', 'Plein soleil - 7h/jour'],
    seasons: ['printemps', 'été'],
    spacing: '20-25cm entre plants',
    depth: '0.5cm de profondeur',
    
    seedingPeriod: ['Avril', 'Mai'],
    transplantPeriod: ['Mai', 'Juin'],
    harvestPeriod: ['Juin', 'Juillet', 'Août', 'Septembre'],
    growthDuration: '3-4 mois',
    
    stepTemplates: [
      {
        title: 'Semis sous abri',
        description: 'Semer en godets à l\'intérieur',
        duration: '30 minutes',
        relativeWeek: 0,
        icon: '/icons/steps/seeding.svg',
        tools: ['Godets', 'Terreau', 'Graines'],
        tips: ['Température 18-20°C', 'Maintenir humide']
      },
      {
        title: 'Plantation',
        description: 'Mettre en place après les gelées',
        duration: '30 minutes',
        relativeWeek: 6,
        icon: '/icons/tools/transplant.svg',
        tools: ['Transplantoir', 'Arrosoir'],
        tips: ['Attendre fin des gelées', 'Exposition chaude']
      }
    ]
  }
]

export const seasonInfo = [
  {
    id: 'printemps',
    name: 'Printemps',
    description: 'Saison de renaissance, idéale pour débuter les cultures',
    months: ['Mars', 'Avril', 'Mai'],
    icon: '🌱',
    color: '#22c55e'
  },
  {
    id: 'été',
    name: 'Été',
    description: 'Saison chaude, parfaite pour les légumes-fruits',
    months: ['Juin', 'Juillet', 'Août'],
    icon: '☀️',
    color: '#f59e0b'
  },
  {
    id: 'automne',
    name: 'Automne',
    description: 'Saison des récoltes et des plantations d\'hiver',
    months: ['Septembre', 'Octobre', 'Novembre'],
    icon: '🍂',
    color: '#ea580c'
  },
  {
    id: 'hiver',
    name: 'Hiver',
    description: 'Saison de repos, cultures sous abri possibles',
    months: ['Décembre', 'Janvier', 'Février'],
    icon: '❄️',
    color: '#3b82f6'
  }
] 