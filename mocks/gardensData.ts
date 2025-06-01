import type { Garden, Zone, ZoneItinerary, ItineraryStep } from '@/types'

export type { Garden, Zone, ZoneItinerary, ItineraryStep }

export const mockGardens: Garden[] = [
  {
    id: 'garden-1',
    name: 'Jardin Principal',
    description: 'Le jardin principal de la maison avec potager et verger',
    icon: '/icons/greenhouse.svg',
    createdAt: '2024-01-15',
    location: 'Arrière-cour',
    zones: [
      {
        id: 'zone-1-1',
        name: 'Potager Bio',
        description: 'Zone dédiée aux légumes biologiques de saison',
        image: '/images/zone1.jpeg',
        icon: '/icons/plot.svg',
        surface: '30m²',
        soilType: 'Terre argilo-limoneuse',
        sunExposure: 'Plein soleil - 7h/jour',
        irrigationType: 'Arrosage manuel + paillage',
        color: '#10b981',
        gardenId: 'garden-1',
        itineraries: [
          {
            id: 'itinerary-1-1-1',
            name: 'Culture de Tomates cerises',
            description: 'Itinéraire complet pour cultiver des tomates cerises biologiques',
            icon: '/icons/plants/tomatoes.svg',
            difficulty: 'moyen',
            totalDuration: '4-5 mois',
            plantType: 'légume-fruit',
            season: 'printemps',
            progress: 65,
            startedDate: '15/03/2024',
            expectedHarvestDate: '15/07/2024',
            zoneId: 'zone-1-1',
            zoneName: 'Potager Bio',
            
            // Images de démonstration
            images: [
              '/images/tomatoes/seedlings.jpg',
              '/images/tomatoes/flowering.jpg',
              '/images/tomatoes/harvest.jpg',
              '/images/tomatoes/support.jpg'
            ],
            
            // Variétés recommandées
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
            
            // Plantes compagnes
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
              },
              {
                plant: 'Persil',
                benefit: 'Attire les insectes bénéfiques',
                distance: '20cm',
                icon: '/icons/plants/parsley.svg'
              }
            ],
            
            // Ravageurs
            pests: [
              {
                name: 'Pucerons',
                description: 'Petits insectes verts ou noirs qui sucent la sève des feuilles',
                prevention: 'Plantations de basilic et œillets d\'Inde, jets d\'eau réguliers',
                treatment: 'Savon noir dilué ou purin d\'ortie'
              },
              {
                name: 'Aleurodes',
                description: 'Petites mouches blanches sous les feuilles',
                prevention: 'Bonne aération, éviter l\'excès d\'humidité',
                treatment: 'Pièges jaunes englués, savon noir'
              }
            ],
            
            // Maladies
            diseases: [
              {
                name: 'Mildiou',
                symptoms: 'Taches brunes sur les feuilles, pourriture des fruits',
                prevention: 'Éviter l\'arrosage sur le feuillage, bonne aération',
                treatment: 'Bouillie bordelaise en préventif, suppression des parties atteintes'
              },
              {
                name: 'Oïdium',
                symptoms: 'Poudre blanche sur les feuilles',
                prevention: 'Espacement suffisant entre plants, éviter l\'excès d\'azote',
                treatment: 'Bicarbonate de soude dilué, soufre'
              }
            ],
            
            // Bénéfices nutritionnels
            nutritionalBenefits: [
              {
                nutrient: 'Lycopène',
                description: 'Antioxydant puissant, protection cardiovasculaire'
              },
              {
                nutrient: 'Vitamine C',
                description: 'Renforce le système immunitaire, 20mg pour 100g'
              },
              {
                nutrient: 'Potassium',
                description: 'Régulation de la pression artérielle, 300mg pour 100g'
              },
              {
                nutrient: 'Vitamine K',
                description: 'Coagulation sanguine et santé osseuse'
              }
            ],
            
            // Conseils de conservation
            storageAdvice: {
              method: 'Conservation à température ambiante pour le goût optimal, réfrigération pour prolonger',
              duration: '1 semaine à température ambiante, 2 semaines au réfrigérateur',
              tips: [
                'Ne pas laver avant stockage',
                'Conserver la tige pour une meilleure conservation',
                'Séparer les fruits mûrs des verts',
                'Éviter le réfrigérateur pour les tomates vertes'
              ]
            },
            
            // Ressources utiles
            resources: [
              {
                title: 'Guide complet de la culture des tomates',
                url: 'https://www.rustica.fr/legumes-et-potager/tomate',
                type: 'guide'
              },
              {
                title: 'Vidéo : Tailler les tomates cerises',
                url: 'https://www.youtube.com/watch?v=example',
                type: 'video'
              },
              {
                title: 'Forum : Problèmes courants des tomates',
                url: 'https://www.aujardin.org/forum-tomates',
                type: 'forum'
              }
            ],
            
            steps: [
              {
                id: 'step-1',
                title: 'Préparation des semis',
                description: 'Semis en godets dans un endroit chaud',
                duration: '2 heures',
                optimalPeriod: 'Mi-mars',
                completed: true,
                completedDate: '15/03/2024',
                icon: '/icons/steps/seeding.svg',
                tools: ['Godets', 'Terreau', 'Arrosoir'],
                tips: ['Maintenir la température à 20-22°C', 'Arroser avec précaution']
              },
              {
                id: 'step-2',
                title: 'Transplantation',
                description: 'Repiquer les plants en pleine terre',
                duration: '1 heure',
                optimalPeriod: 'Mi-mai',
                completed: true,
                completedDate: '18/05/2024',
                icon: '/icons/tools/transplant.svg',
                tools: ['Transplantoir', 'Seau d\'eau', 'Paillis'],
                tips: ['Transplanter en soirée', 'Arroser abondamment']
              },
              {
                id: 'step-3',
                title: 'Installation des tuteurs',
                description: 'Poser les tuteurs et attacher les plants',
                duration: '45 minutes',
                optimalPeriod: 'Fin mai',
                completed: true,
                completedDate: '25/05/2024',
                icon: '/icons/steps/support.svg',
                tools: ['Tuteurs bambou', 'Liens souples', 'Maillet'],
                tips: ['Planter en biais pour plus de stabilité', 'Laisser de l\'espace']
              },
              {
                id: 'step-4',
                title: 'Taille et entretien',
                description: 'Tailler les gourmands régulièrement',
                duration: '30 minutes/semaine',
                optimalPeriod: 'Juin-Juillet',
                completed: false,
                icon: '/icons/steps/pruning.svg',
                tools: ['Sécateur', 'Gants de jardinage'],
                tips: ['Tailler le matin', 'Éliminer les gourmands chaque semaine']
              },
              {
                id: 'step-5',
                title: 'Récolte',
                description: 'Récolter les tomates mûres',
                duration: '20 minutes',
                optimalPeriod: 'Juillet-Septembre',
                completed: false,
                icon: '/icons/tools/harvest.svg',
                tools: ['Panier de récolte', 'Sécateur'],
                tips: ['Récolter le matin de préférence', 'Laisser mûrir à l\'intérieur']
              }
            ]
          }
        ]
      },
      {
        id: 'zone-1-2',
        name: 'Serre Principale',
        description: 'Serre pour les cultures précoces et tardives',
        image: '/images/zone2.jpeg',
        icon: '/icons/greenhouse.svg',
        surface: '15m²',
        soilType: 'Terreau enrichi',
        sunExposure: 'Plein soleil - 8h/jour',
        irrigationType: 'Goutte à goutte automatique',
        color: '#3b82f6',
        gardenId: 'garden-1',
        itineraries: [
          {
            id: 'itinerary-1-2-1',
            name: 'Culture d\'Aubergines',
            description: 'Cultivation d\'aubergines en serre chauffée',
            icon: '/icons/plants/eggplant.svg',
            difficulty: 'difficile',
            totalDuration: '5-6 mois',
            plantType: 'légume-fruit',
            season: 'printemps',
            progress: 0,
            zoneId: 'zone-1-2',
            zoneName: 'Serre Principale',
            
            // Images de démonstration
            images: [
              '/images/eggplant/seedlings.jpg',
              '/images/eggplant/young-plant.jpg',
              '/images/eggplant/flowering.jpg',
              '/images/eggplant/harvest.jpg'
            ],
            
            // Variétés recommandées
            varieties: [
              {
                name: 'Black Beauty',
                characteristics: 'Variété classique, fruits violets foncés, très productive',
                difficulty: 'moyen',
                harvestTime: '80-90 jours'
              },
              {
                name: 'Blanche Ronde à Œuf',
                characteristics: 'Aubergines blanches rondes, chair douce et sans amertume',
                difficulty: 'difficile',
                harvestTime: '85-95 jours'
              },
              {
                name: 'Rosa Bianca',
                characteristics: 'Variété italienne bicolore, très savoureuse',
                difficulty: 'difficile',
                harvestTime: '75-85 jours'
              }
            ],
            
            // Plantes compagnes
            companions: [
              {
                plant: 'Tomates',
                benefit: 'Besoins similaires en chaleur et eau',
                distance: '60cm',
                icon: '/icons/plants/tomatoes.svg'
              },
              {
                plant: 'Poivrons',
                benefit: 'Même famille, conditions de culture identiques',
                distance: '50cm',
                icon: '/icons/plants/pepper.svg'
              },
              {
                plant: 'Basilic',
                benefit: 'Améliore le goût et repousse les insectes',
                distance: '30cm',
                icon: '/icons/plants/basil.svg'
              }
            ],
            
            // Ravageurs
            pests: [
              {
                name: 'Doryphore',
                description: 'Coléoptère rayé qui dévore les feuilles',
                prevention: 'Rotation des cultures, inspection régulière',
                treatment: 'Ramassage manuel, Bacillus thuringiensis'
              },
              {
                name: 'Pucerons',
                description: 'Petits insectes qui affaiblissent la plante',
                prevention: 'Pulvérisations d\'eau, prédateurs naturels',
                treatment: 'Savon noir, purin d\'ortie'
              },
              {
                name: 'Araignées rouges',
                description: 'Acariens en cas de forte chaleur et sécheresse',
                prevention: 'Maintenir l\'humidité, aération régulière',
                treatment: 'Bassinage, prédateurs naturels'
              }
            ],
            
            // Maladies
            diseases: [
              {
                name: 'Verticilliose',
                symptoms: 'Jaunissement des feuilles, flétrissement unilatéral',
                prevention: 'Rotation des cultures, désinfection du sol',
                treatment: 'Suppression des plants atteints, solarisation du sol'
              },
              {
                name: 'Pourriture des fruits',
                symptoms: 'Taches molles et brunes sur les fruits',
                prevention: 'Éviter l\'excès d\'humidité, bonne aération',
                treatment: 'Suppression des fruits atteints, fongicide cuivre'
              }
            ],
            
            // Bénéfices nutritionnels
            nutritionalBenefits: [
              {
                nutrient: 'Fibres',
                description: 'Excellente source de fibres pour la digestion'
              },
              {
                nutrient: 'Antioxydants',
                description: 'Anthocyanes dans la peau violette, anti-inflammatoires'
              },
              {
                nutrient: 'Potassium',
                description: 'Régulation de la pression artérielle'
              },
              {
                nutrient: 'Acide folique',
                description: 'Important pour la formation des globules rouges'
              }
            ],
            
            // Conseils de conservation
            storageAdvice: {
              method: 'Conservation au réfrigérateur dans le bac à légumes',
              duration: '1 semaine au réfrigérateur, 2-3 jours à température ambiante',
              tips: [
                'Ne pas laver avant stockage',
                'Consommer rapidement après récolte',
                'Éviter les chocs qui provoquent des taches brunes',
                'Possible congélation après blanchiment'
              ]
            },
            
            // Ressources utiles
            resources: [
              {
                title: 'Culture des aubergines en serre',
                url: 'https://www.gerbeaud.com/jardin/fiches/aubergine-culture-serre.php',
                type: 'guide'
              },
              {
                title: 'Vidéo : Semis d\'aubergines',
                url: 'https://www.youtube.com/watch?v=aubergine-example',
                type: 'video'
              },
              {
                title: 'Forum : Conseils aubergines',
                url: 'https://www.jardinage.net/forum/aubergines',
                type: 'forum'
              }
            ],
            
            steps: [
              {
                id: 'step-1',
                title: 'Semis en mini-serre',
                description: 'Semis en godets avec température contrôlée',
                duration: '1 heure',
                optimalPeriod: 'Février-Mars',
                completed: false,
                icon: '/icons/steps/seeding.svg',
                tools: ['Mini-serre', 'Godets', 'Thermomètre'],
                tips: ['Maintenir 25°C constant', 'Utiliser un terreau spécial semis']
              },
              {
                id: 'step-2',
                title: 'Repiquage en serre',
                description: 'Transplanter en serre chauffée',
                duration: '45 minutes',
                optimalPeriod: 'Avril',
                completed: false,
                icon: '/icons/tools/transplant.svg',
                tools: ['Bacs de culture', 'Terreau enrichi'],
                tips: ['Espacer de 50cm entre plants', 'Maintenir humidité constante']
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'garden-2',
    name: 'Potager Bio',
    description: 'Potager entièrement dédié à l\'agriculture biologique',
    icon: '/icons/plot.svg',
    createdAt: '2024-02-01',
    location: 'Côté sud',
    zones: [
      {
        id: 'zone-2-1',
        name: 'Carré de Légumes-racines',
        description: 'Zone spécialisée pour carottes, radis, navets',
        image: '/images/zone3.jpeg',
        icon: '/icons/carrot.svg',
        surface: '20m²',
        soilType: 'Sable limoneux',
        sunExposure: 'Mi-ombre - 5h/jour',
        irrigationType: 'Aspersion',
        color: '#f59e0b',
        gardenId: 'garden-2',
        itineraries: [
          {
            id: 'itinerary-2-1-1',
            name: 'Culture de Radis rapides',
            description: 'Itinéraire pour cultiver des radis en 30 jours, parfait pour débuter',
            icon: '/icons/plants/radish.svg',
            difficulty: 'facile',
            totalDuration: '30 jours',
            plantType: 'légume-racine',
            season: 'toute-saison',
            progress: 0,
            zoneId: 'zone-2-1',
            zoneName: 'Carré de Légumes-racines',
            
            // Images de démonstration
            images: [
              '/images/radish/seeds.jpg',
              '/images/radish/germination.jpg',
              '/images/radish/growing.jpg',
              '/images/radish/harvest.jpg'
            ],
            
            // Variétés recommandées
            varieties: [
              {
                name: 'Radis de 18 jours',
                characteristics: 'Croissance ultra-rapide, parfait pour les impatients',
                difficulty: 'facile',
                harvestTime: '18-20 jours'
              },
              {
                name: 'Cherry Belle',
                characteristics: 'Radis rond rouge, saveur douce, très fiable',
                difficulty: 'facile',
                harvestTime: '22-25 jours'
              },
              {
                name: 'French Breakfast',
                characteristics: 'Radis allongé bicolore, croquant et savoureux',
                difficulty: 'facile',
                harvestTime: '25-30 jours'
              }
            ],
            
            // Plantes compagnes
            companions: [
              {
                plant: 'Laitue',
                benefit: 'Optimise l\'espace, croissances complémentaires',
                distance: '5-10cm',
                icon: '/icons/plants/lettuce.svg'
              },
              {
                plant: 'Épinards',
                benefit: 'Même besoins en eau, protection mutuelle',
                distance: '8-12cm',
                icon: '/icons/plants/spinach.svg'
              },
              {
                plant: 'Carottes',
                benefit: 'Les radis marquent les rangs, récolte échelonnée',
                distance: '3-5cm',
                icon: '/icons/plants/carrot.svg'
              }
            ],
            
            // Ravageurs
            pests: [
              {
                name: 'Altises',
                description: 'Petites puces noires qui criblent les feuilles de trous',
                prevention: 'Arrosage régulier, voile anti-insectes, paillage',
                treatment: 'Cendre de bois, terre de diatomée, bassinage'
              },
              {
                name: 'Vers de terre blancs',
                description: 'Larves qui creusent des galeries dans les racines',
                prevention: 'Rotation des cultures, binage régulier',
                treatment: 'Ramassage manuel, nématodes auxiliaires'
              }
            ],
            
            // Maladies
            diseases: [
              {
                name: 'Fonte des semis',
                symptoms: 'Pourriture au collet, plantules qui tombent',
                prevention: 'Éviter l\'excès d\'humidité, aérer les semis',
                treatment: 'Suppression des plants malades, fongicide préventif'
              },
              {
                name: 'Clubroot (hernie)',
                symptoms: 'Grossissements anormaux des racines',
                prevention: 'pH neutre, rotation longue, drainage',
                treatment: 'Chaulage du sol, destruction des plants malades'
              }
            ],
            
            // Bénéfices nutritionnels
            nutritionalBenefits: [
              {
                nutrient: 'Vitamine C',
                description: 'Forte teneur, renforce les défenses immunitaires'
              },
              {
                nutrient: 'Fibres',
                description: 'Stimulent le transit intestinal'
              },
              {
                nutrient: 'Potassium',
                description: 'Bon pour la fonction cardiaque'
              },
              {
                nutrient: 'Antioxydants',
                description: 'Anthocyanes dans les variétés colorées'
              }
            ],
            
            // Conseils de conservation
            storageAdvice: {
              method: 'Conservation au réfrigérateur avec les fanes coupées',
              duration: '1 semaine au réfrigérateur, 2-3 jours à température ambiante',
              tips: [
                'Couper les fanes en laissant 2cm',
                'Laver juste avant consommation',
                'Conserver dans un sac perforé',
                'Les fanes se conservent séparément 2-3 jours'
              ]
            },
            
            // Ressources utiles
            resources: [
              {
                title: 'Guide du radis débutant',
                url: 'https://www.rustica.fr/legumes-et-potager/radis',
                type: 'guide'
              },
              {
                title: 'Vidéo : Semer des radis',
                url: 'https://www.youtube.com/watch?v=radish-example',
                type: 'video'
              },
              {
                title: 'Article : Radis toute l\'année',
                url: 'https://www.gerbeaud.com/jardin/fiches/radis-culture.php',
                type: 'article'
              }
            ],
            
            steps: [
              {
                id: 'step-1',
                title: 'Préparation du sol',
                description: 'Ameublir la terre et faire des sillons peu profonds',
                duration: '15 minutes',
                optimalPeriod: 'Toute l\'année sous abri',
                completed: false,
                icon: '/icons/steps/soil-prep.svg',
                tools: ['Râteau', 'Serfouette', 'Cordeau'],
                tips: ['Sol bien drainé', 'Éviter le fumier frais']
              },
              {
                id: 'step-2',
                title: 'Semis en ligne',
                description: 'Semer clair en lignes espacées de 15cm',
                duration: '10 minutes',
                optimalPeriod: 'Selon variété',
                completed: false,
                icon: '/icons/steps/seeding.svg',
                tools: ['Graines', 'Arrosoir avec pomme'],
                tips: ['Semer peu profond (1cm)', 'Arroser en pluie fine']
              },
              {
                id: 'step-3',
                title: 'Éclaircissage',
                description: 'Éclaircir si nécessaire pour éviter la concurrence',
                duration: '5 minutes',
                optimalPeriod: '10 jours après levée',
                completed: false,
                icon: '/icons/steps/thinning.svg',
                tools: ['Petits ciseaux'],
                tips: ['Conserver un plant tous les 3cm', 'Arroser après']
              },
              {
                id: 'step-4',
                title: 'Entretien et arrosage',
                description: 'Maintenir le sol frais par des arrosages réguliers',
                duration: '5 minutes/jour',
                optimalPeriod: 'Tout le cycle',
                completed: false,
                icon: '/icons/steps/watering.svg',
                tools: ['Arrosoir', 'Binage'],
                tips: ['Arrosage régulier et modéré', 'Biner délicatement']
              },
              {
                id: 'step-5',
                title: 'Récolte',
                description: 'Récolter quand les radis atteignent la bonne taille',
                duration: '10 minutes',
                optimalPeriod: '20-30 jours après semis',
                completed: false,
                icon: '/icons/tools/harvest.svg',
                tools: ['Panier', 'Sécateur'],
                tips: ['Récolter tôt le matin', 'Ne pas laisser trop grossir']
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'garden-3',
    name: 'Jardin d\'Herbes',
    description: 'Espace dédié aux herbes aromatiques et plantes médicinales',
    icon: '/icons/parcel.svg',
    createdAt: '2024-03-01',
    location: 'Près de la cuisine',
    zones: [
      {
        id: 'zone-3-1',
        name: 'Spirale d\'Aromates',
        description: 'Spirale d\'herbes avec différents microclimats',
        image: '/images/zone2.jpeg',
        icon: '/icons/spiral.svg',
        surface: '8m²',
        soilType: 'Terreau drainant',
        sunExposure: 'Variable selon position',
        irrigationType: 'Arrosage manuel',
        color: '#06b6d4',
        gardenId: 'garden-3',
        itineraries: []
      }
    ]
  }
]

// Fonction utilitaire pour récupérer un jardin par ID
export const getGardenById = (id: string): Garden | undefined => {
  return mockGardens.find(garden => garden.id === id)
}

// Fonction utilitaire pour récupérer une zone par ID
export const getZoneById = (zoneId: string): Zone | undefined => {
  for (const garden of mockGardens) {
    const zone = garden.zones.find(z => z.id === zoneId)
    if (zone) return zone
  }
  return undefined
}

// Fonction utilitaire pour récupérer un itinéraire par ID
export const getItineraryById = (itineraryId: string): ZoneItinerary | undefined => {
  for (const garden of mockGardens) {
    for (const zone of garden.zones) {
      const itinerary = zone.itineraries.find(i => i.id === itineraryId)
      if (itinerary) return itinerary
    }
  }
  return undefined
}

// Export du jardin par défaut (le premier)
export const defaultGarden = mockGardens[0] 