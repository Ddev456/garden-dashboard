import { format, subDays } from 'date-fns';
import { fr } from 'date-fns/locale';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done';
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
}

export interface PlantHistory {
  id: string;
  plantName: string;
  plantIcon: string;
  plantedDate: string;
  harvestedDate?: string;
  yield?: string;
  notes?: string;
}

export interface Note {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  author: string;
}

export interface EnvironmentalCondition {
  date: string;
  temperature: number;
  humidity: number;
  soilMoisture: number;
  lightLevel: number;
}

export interface Plant {
  id: string;
  name: string;
  icon: string;
  plantedDate: string;
  status: 'healthy' | 'warning' | 'danger';
  nextWateringDate: string;
  notes: string;
}

export interface ItineraryStep {
  id: string;
  title: string;
  description: string;
  duration: string;
  tools: string[];
  tips: string[];
  optimalPeriod: string;
  icon: string;
  completed: boolean;
  completedDate?: string;
  detailedInstructions?: string;
  images?: string[];
  video?: string;
  commonMistakes?: string[];
  scientificExplanation?: string;
  difficulty?: 'facile' | 'moyen' | 'difficile';
  weatherRecommendations?: {
    ideal: string;
    avoid: string;
  };
  soilRequirements?: {
    type: string;
    ph: string;
    nutrients: string[];
  };
}

export interface Itinerary {
  id: string;
  name: string;
  icon: string;
  description: string;
  difficulty: 'facile' | 'moyen' | 'difficile';
  totalDuration: string;
  plantType: 'légume-fruit' | 'légume-feuille' | 'légume-racine' | 'aromate';
  season: 'printemps' | 'été' | 'automne' | 'hiver' | 'toute-saison';
  steps: ItineraryStep[];
  progress: number;
  startedDate?: string;
  expectedHarvestDate?: string;
  images?: string[];
  varieties?: Array<{
    name: string;
    characteristics: string;
    difficulty: 'facile' | 'moyen' | 'difficile';
    harvestTime: string;
  }>;
  companions?: Array<{
    plant: string;
    icon: string;
    benefit: string;
    distance: string;
  }>;
  pests?: Array<{
    name: string;
    description: string;
    prevention: string;
    treatment: string;
  }>;
  diseases?: Array<{
    name: string;
    symptoms: string;
    prevention: string;
    treatment: string;
  }>;
  nutritionalBenefits?: Array<{
    nutrient: string;
    description: string;
  }>;
  storageAdvice?: {
    method: string;
    duration: string;
    tips: string[];
  };
  resources?: Array<{
    title: string;
    url: string;
    type: 'article' | 'video' | 'guide' | 'forum';
  }>;
}

export interface JournalEntry {
  id: string;
  content: string;
  createdAt: string;
  author: string;
  photos?: string[];
}

export interface ZoneDetail {
  id: string;
  name: string;
  image: string;
  description: string;
  tags: string[];
  favorite: boolean;
  surface: string;
  soilType: string;
  sunExposure: string;
  irrigationType: string;
  createdAt: string;
  currentPlants: Plant[];
  plantingHistory: PlantHistory[];
  tasks: Task[];
  notes: Note[];
  environmentalConditions: EnvironmentalCondition[];
  itineraries?: Itinerary[];
  journal?: JournalEntry[];
}

const today = new Date();

export const mockZoneDetail: ZoneDetail = {
  id: '1',
  name: 'Zone de culture 1',
  image: '/images/zone1.jpeg',
  description: 'Parcelle dans la serre avec la vigne type "muscat". Cette zone est idéale pour les cultures précoces et bénéficie d\'un microclimat favorable.',
  tags: ['Serre', 'Bio', 'Irrigation automatique', 'Sol fertile'],
  favorite: true,
  surface: '25m²',
  soilType: 'Terreau enrichi',
  sunExposure: 'Plein soleil - 6-8h/jour',
  irrigationType: 'Goutte à goutte automatique',
  createdAt: format(subDays(today, 180), 'dd MMMM yyyy', { locale: fr }),
  currentPlants: [
    {
      id: 'p1',
      name: 'Tomates Roma',
      icon: '/icons/plants/tomatoes.svg',
      plantedDate: format(subDays(today, 45), 'dd/MM/yyyy'),
      status: 'healthy',
      nextWateringDate: format(subDays(today, -1), 'dd/MM/yyyy'),
      notes: 'Croissance excellente, premiers fruits en formation'
    },
    {
      id: 'p2',
      name: 'Courgettes',
      icon: '/icons/plants/zucchini.svg',
      plantedDate: format(subDays(today, 30), 'dd/MM/yyyy'),
      status: 'warning',
      nextWateringDate: format(today, 'dd/MM/yyyy'),
      notes: 'Quelques signes de mildiou sur les feuilles basses'
    },
    {
      id: 'p3',
      name: 'Haricots verts',
      icon: '/icons/plants/beans.svg',
      plantedDate: format(subDays(today, 20), 'dd/MM/yyyy'),
      status: 'healthy',
      nextWateringDate: format(subDays(today, -2), 'dd/MM/yyyy'),
      notes: 'Début de la formation des gousses'
    }
  ],
  plantingHistory: [
    {
      id: 'ph1',
      plantName: 'Laitues',
      plantIcon: '/icons/plants/lettuce.svg',
      plantedDate: format(subDays(today, 90), 'dd/MM/yyyy'),
      harvestedDate: format(subDays(today, 45), 'dd/MM/yyyy'),
      yield: '15 têtes',
      notes: 'Récolte excellente, variété bien adaptée'
    },
    {
      id: 'ph2',
      plantName: 'Navets',
      plantIcon: '/icons/plants/radish.png',
      plantedDate: format(subDays(today, 120), 'dd/MM/yyyy'),
      harvestedDate: format(subDays(today, 90), 'dd/MM/yyyy'),
      yield: '3kg',
      notes: 'Croissance rapide, saveur excellente'
    }
  ],
  tasks: [
    {
      id: 't1',
      title: 'Taille des tomates',
      description: 'Retirer les gourmands et attacher les nouvelles pousses',
      status: 'todo',
      dueDate: format(subDays(today, -3), 'dd/MM/yyyy'),
      priority: 'high'
    },
    {
      id: 't2',
      title: 'Traitement préventif bio',
      description: 'Pulvérisation de purin d\'ortie sur les courgettes',
      status: 'todo',
      dueDate: format(subDays(today, -1), 'dd/MM/yyyy'),
      priority: 'medium'
    },
    {
      id: 't3',
      title: 'Installation support haricots',
      description: 'Mettre en place les tuteurs supplémentaires',
      status: 'done',
      dueDate: format(subDays(today, 2), 'dd/MM/yyyy'),
      priority: 'low'
    }
  ],
  notes: [
    {
      id: 'n1',
      content: 'La production est excellente cette année. Le système d\'irrigation automatique a vraiment fait ses preuves.',
      createdAt: format(subDays(today, 5), 'dd/MM/yyyy HH:mm'),
      updatedAt: format(subDays(today, 5), 'dd/MM/yyyy HH:mm'),
      author: 'Dylan'
    },
    {
      id: 'n2',
      content: 'Attention à surveiller l\'apparition de mildiou sur les courgettes. Traitement préventif à prévoir.',
      createdAt: format(subDays(today, 2), 'dd/MM/yyyy HH:mm'),
      updatedAt: format(subDays(today, 2), 'dd/MM/yyyy HH:mm'),
      author: 'Sophie'
    }
  ],
  environmentalConditions: [
    {
      date: format(subDays(today, 0), 'dd/MM/yyyy'),
      temperature: 24,
      humidity: 65,
      soilMoisture: 75,
      lightLevel: 85
    },
    {
      date: format(subDays(today, 1), 'dd/MM/yyyy'),
      temperature: 23,
      humidity: 68,
      soilMoisture: 72,
      lightLevel: 80
    },
    {
      date: format(subDays(today, 2), 'dd/MM/yyyy'),
      temperature: 25,
      humidity: 62,
      soilMoisture: 70,
      lightLevel: 90
    }
  ],
  itineraries: [
    {
      id: 'tomates-cerises',
      name: 'Tomates cerises',
      description: 'Culture de tomates cerises sucrées et productives, parfaites pour les débutants',
      icon: '/icons/plants/tomato.svg',
      difficulty: 'moyen',
      totalDuration: '120 jours',
      plantType: 'légume-fruit',
      season: 'printemps',
      progress: 56,
      startedDate: '15/03/2024',
      expectedHarvestDate: '15/07/2024',
      images: [
        '/images/itineraries/tomatoes/germination.jpg',
        '/images/itineraries/tomatoes/seedlings.jpg',
        '/images/itineraries/tomatoes/flowering.jpg',
        '/images/itineraries/tomatoes/harvest.jpg'
      ],
      varieties: [
        {
          name: 'Cherry Rouge',
          characteristics: 'Petites tomates très sucrées, production abondante',
          difficulty: 'facile',
          harvestTime: '70-80 jours'
        },
        {
          name: 'Cherry Jaune',
          characteristics: 'Saveur douce et acidulée, très décorative',
          difficulty: 'facile',
          harvestTime: '75-85 jours'
        },
        {
          name: 'Cherry Noire',
          characteristics: 'Saveur complexe et intense, variété originale',
          difficulty: 'moyen',
          harvestTime: '80-90 jours'
        }
      ],
      companions: [
        {
          plant: 'Basilic',
          benefit: 'Repousse les insectes nuisibles et améliore le goût',
          distance: '20-30 cm',
          icon: '/icons/plants/basil.svg'
        },
        {
          plant: 'Œillets d\'Inde',
          benefit: 'Protection contre les nématodes et pucerons',
          distance: '30-40 cm',
          icon: '/icons/plants/flower.png'
        },
        {
          plant: 'Persil',
          benefit: 'Améliore la croissance et repousse certains parasites',
          distance: '15-25 cm',
          icon: "/icons/plants/parsley.png"
        }
      ],
      pests: [
        {
          name: 'Pucerons',
          description: 'Petits insectes qui se nourrissent de la sève',
          prevention: 'Pulvérisation d\'eau savonneuse régulière',
          treatment: 'Coccinelles ou traitement au savon noir'
        },
        {
          name: 'Aleurodes',
          description: 'Mouches blanches qui affaiblissent la plante',
          prevention: 'Pièges jaunes collants, aération adequated',
          treatment: 'Traitement au savon noir ou huile de neem'
        }
      ],
      diseases: [
        {
          name: 'Mildiou',
          symptoms: 'Taches brunes sur les feuilles, pourriture des fruits',
          prevention: 'Éviter l\'arrosage sur le feuillage, bonne aération',
          treatment: 'Bouillie bordelaise en prévention, retirer parties atteintes'
        },
        {
          name: 'Cul noir',
          symptoms: 'Tache noire à la base des fruits',
          prevention: 'Arrosage régulier, paillis pour conserver l\'humidité',
          treatment: 'Améliorer l\'arrosage et apporter du calcium'
        }
      ],
      nutritionalBenefits: [
        {
          nutrient: 'Lycopène',
          description: 'Antioxydant puissant, protège contre certains cancers'
        },
        {
          nutrient: 'Vitamine C',
          description: 'Renforce le système immunitaire'
        },
        {
          nutrient: 'Potassium',
          description: 'Régule la pression artérielle'
        }
      ],
      storageAdvice: {
        method: 'Conservation à température ambiante ou réfrigérateur',
        duration: '5-7 jours à température ambiante, 10-14 jours au frigo',
        tips: [
          'Ne pas laver avant consommation',
          'Conserver la queue pour prolonger la fraîcheur',
          'Laisser mûrir les tomates vertes à température ambiante'
        ]
      },
      resources: [
        {
          title: 'Guide complet de la culture des tomates',
          url: 'https://example.com/guide-tomates',
          type: 'guide'
        },
        {
          title: 'Vidéo : Tailler les tomates cerises',
          url: 'https://example.com/video-taille',
          type: 'video'
        },
        {
          title: 'Forum : Problèmes courants des tomates',
          url: 'https://example.com/forum-tomates',
          type: 'forum'
        }
      ],
      steps: [
        {
          id: 'semis',
          title: 'Semis en intérieur',
          description: 'Semer les graines dans des godets avec un terreau spécial semis',
          duration: '15-30 min',
          tools: ['Godets', 'Terreau semis', 'Graines', 'Pulvérisateur'],
          tips: [
            'Température idéale : 20-25°C',
            'Maintenir le terreau humide mais pas détrempé',
            'Placer près d\'une fenêtre lumineuse'
          ],
          optimalPeriod: 'Février-Mars',
          icon: '/icons/tools/seed.svg',
          completed: true,
          completedDate: '15/03/2024',
          detailedInstructions: 'Remplissez des godets de 8cm avec du terreau spécial semis. Placez 2-3 graines par godet à 1cm de profondeur. Tassez légèrement et arrosez en pluie fine. Recouvrez d\'un film plastique pour maintenir l\'humidité.',
          images: [
            '/images/steps/tomato-seeds.jpg',
            '/images/steps/seeding-process.jpg'
          ],
          video: '/videos/tomato-seeding.mp4',
          commonMistakes: [
            'Semer trop profondément (max 1cm)',
            'Arroser trop fort et déplacer les graines',
            'Oublier de percer des trous de drainage'
          ],
          scientificExplanation: 'La germination des graines de tomate nécessite une température constante entre 20-25°C. L\'embryon utilise les réserves nutritives du cotylédon pour développer ses premières racines et feuilles.',
          difficulty: 'facile',
          weatherRecommendations: {
            ideal: 'Température stable, luminosité importante',
            avoid: 'Courants d\'air froids, soleil direct trop intense'
          },
          soilRequirements: {
            type: 'Terreau léger et drainant',
            ph: '6.0-6.8',
            nutrients: ['Matière organique', 'Phosphore pour l\'enracinement']
          }
    },
    {
          id: 'repiquage',
          title: 'Repiquage des plantules',
          description: 'Repiquer les jeunes plants dans des pots plus grands',
          duration: '30-45 min',
          tools: ['Pots 10cm', 'Terreau', 'Transplantoir', 'Arrosoir'],
          tips: [
            'Attendre que les plantules aient 2-3 vraies feuilles',
            'Manipuler délicatement les racines',
            'Enterrer jusqu\'aux premières feuilles'
          ],
          optimalPeriod: 'Mars-Avril',
          icon: '/icons/tools/transplant.svg',
          completed: true,
          completedDate: '01/04/2024',
          detailedInstructions: 'Préparez des pots de 10cm avec du terreau universel. Démoulez délicatement les plantules en gardant la motte de terre. Placez dans le nouveau pot en enterrant jusqu\'aux cotylédons. Tassez légèrement et arrosez.',
          difficulty: 'moyen',
          commonMistakes: [
            'Repiquer trop tôt (plantules fragiles)',
            'Casser les racines lors du démoulage',
            'Ne pas assez enterrer la tige'
          ]
        },
        {
          id: 'plantation',
          title: 'Plantation en pleine terre',
          description: 'Planter les jeunes plants en pleine terre après les dernières gelées. Espacer de 60-80 cm.',
          duration: '1 heure',
          tools: ['Transplantoir', 'Arrosoir', 'Paillis'],
          tips: [
            'Attendre que le sol soit réchauffé (>15°C)',
            'Planter par temps nuageux ou en fin de journée',
            'Arroser copieusement après plantation'
          ],
          optimalPeriod: 'Mai',
          icon: '/icons/steps/planting.svg',
          completed: true,
          completedDate: format(subDays(today, 60), 'dd/MM/yyyy')
        },
        {
          id: 'installation-tuteurs',
          title: 'Installation des tuteurs',
          description: 'Installer des tuteurs solides (1,5-2m) pour soutenir la croissance des plants.',
          duration: '30 minutes',
          tools: ['Tuteurs', 'Liens souples', 'Marteau'],
          tips: [
            'Planter les tuteurs à 10 cm du pied',
            'Utiliser des liens souples pour éviter les blessures',
            'Prévoir la hauteur finale du plant (1,5-2m)'
          ],
          optimalPeriod: 'Mai',
          icon: '/icons/steps/tutoring.svg',
          completed: true,
          completedDate: format(subDays(today, 55), 'dd/MM/yyyy')
        },
        {
          id: 'taille-bourgeonnage',
          title: 'Taille et ébourgeonnage',
          description: 'Supprimer régulièrement les gourmands et tailler pour favoriser la fructification.',
          duration: '15 minutes/semaine',
          tools: ['Sécateur', 'Gants'],
          tips: [
            'Supprimer les gourmands chaque semaine',
            'Éliminer les feuilles du bas touchant le sol',
            'Tailler tôt le matin par temps sec'
          ],
          optimalPeriod: 'Juin-Septembre',
          icon: '/icons/steps/pruning.svg',
          completed: false
        },
        {
          id: 'arrosage-fertilisation',
          title: 'Arrosage et fertilisation',
          description: 'Arroser régulièrement au pied et apporter de l\'engrais toutes les 2 semaines.',
          duration: '10 minutes/jour',
          tools: ['Arrosoir', 'Engrais liquide'],
          tips: [
            'Arroser le matin de préférence',
            'Éviter de mouiller le feuillage',
            'Pailler pour conserver l\'humidité'
          ],
          optimalPeriod: 'Mai-Septembre',
          icon: '/icons/steps/watering.svg',
          completed: false
        },
        {
          id: 'surveillance-traitements',
          title: 'Surveillance et traitements',
          description: 'Surveiller l\'apparition de maladies (mildiou, oïdium) et de ravageurs.',
          duration: '5 minutes/jour',
          tools: ['Pulvérisateur', 'Produits bio'],
          tips: [
            'Inspecter régulièrement le dessous des feuilles',
            'Traiter préventivement avec de la bouillie bordelaise',
            'Éliminer rapidement les parties malades'
          ],
          optimalPeriod: 'Juin-Septembre',
          icon: '/icons/steps/treatment.svg',
          completed: false
        },
        {
          id: 'step9',
          title: 'Récolte des tomates',
          description: 'Récolter les tomates cerises au fur et à mesure de leur maturité, plusieurs fois par semaine.',
          duration: '15 minutes/3x semaine',
          tools: ['Panier', 'Sécateur'],
          tips: [
            'Récolter quand les fruits sont bien colorés',
            'Cueillir régulièrement pour stimuler la production',
            'Conserver à température ambiante pour le goût'
          ],
          optimalPeriod: 'Juillet-Octobre',
          icon: '/icons/tools/harvest.svg',
          completed: false
        }
      ],
    },
    {
      id: 'radis',
      name: 'Radis',
      description: 'Culture rapide et facile de radis croquants, idéale pour débuter',
      icon: '/icons/plants/radish.png',
      difficulty: 'facile',
      totalDuration: '30 jours',
      plantType: 'légume-racine',
      season: 'toute-saison',
      progress: 0,
      varieties: [
        {
          name: 'Radis de 18 jours',
          characteristics: 'Croissance ultra-rapide, parfait pour les impatients',
          difficulty: 'facile',
          harvestTime: '18-20 jours'
        },
        {
          name: 'Radis rond rouge',
          characteristics: 'Classique, saveur piquante équilibrée',
          difficulty: 'facile',
          harvestTime: '25-30 jours'
        },
        {
          name: 'Radis blanc géant',
          characteristics: 'Gros radis à chair douce, conservation longue',
          difficulty: 'moyen',
          harvestTime: '40-50 jours'
        }
      ],
      companions: [
        {
          plant: 'Laitue',
          benefit: 'Optimise l\'espace, les radis ameublissent le sol',
          distance: '5-10 cm',
          icon: '/icons/plants/lettuce.svg'
        },
        {
          plant: 'Carottes',
          benefit: 'Les radis marquent les rangs de carottes',
          distance: '2-3 cm',
          icon: '/icons/plants/carrot.svg'
        }
      ],
      pests: [
        {
          name: 'Altises',
          description: 'Petites puces qui criblent les feuilles de trous',
          prevention: 'Voile anti-insectes, arrosage régulier',
          treatment: 'Poudrage de cendre ou terre de diatomée'
        }
      ],
      nutritionalBenefits: [
        {
          nutrient: 'Vitamine C',
          description: 'Renforce les défenses immunitaires'
        },
        {
          nutrient: 'Fibres',
          description: 'Facilitent la digestion'
        },
        {
          nutrient: 'Potassium',
          description: 'Bon pour le système cardiovasculaire'
        }
      ],
      storageAdvice: {
        method: 'Réfrigérateur dans un sac perforé',
        duration: '1 semaine maximum',
        tips: [
          'Couper les fanes pour éviter le flétrissement',
          'Conserver dans le bac à légumes',
          'Consommer rapidement pour garder le croquant'
        ]
      },
      steps: [
        {
          id: 'semis-direct',
          title: 'Semis direct en terre',
          description: 'Semer directement les graines dans le potager',
          duration: '10-15 min',
          tools: ['Graines', 'Serfouette', 'Râteau', 'Arrosoir'],
          tips: [
            'Sol bien ameubli et émietté',
            'Semer en ligne pour faciliter l\'entretien',
            'Éclaircir si nécessaire'
          ],
          optimalPeriod: 'Mars à Octobre',
          icon: '/icons/tools/direct-sowing.svg',
          completed: false,
          detailedInstructions: 'Préparez un sol finement émietté. Tracez des sillons de 1cm de profondeur espacés de 15cm. Semez les graines tous les 2-3cm. Recouvrez légèrement et tassez. Arrosez en pluie fine.',
          difficulty: 'facile',
          scientificExplanation: 'Les radis préfèrent un semis direct car ils supportent mal le repiquage. Leur système racinaire pivot se développe mieux sans perturbation.',
          weatherRecommendations: {
            ideal: 'Temps frais et humide, température 15-20°C',
            avoid: 'Forte chaleur qui rend les radis piquants et fibreux'
          }
        },
        {
          id: 'arrosage-regulier',
          title: 'Arrosage régulier',
          description: 'Maintenir le sol frais par des arrosages légers et réguliers',
          duration: '5 minutes/jour',
          tools: ['Arrosoir avec pomme fine'],
          tips: [
            'Arroser en pluie fine pour ne pas déterrer les graines',
            'Maintenir le sol humide mais pas détrempé',
            'Arroser de préférence le soir'
          ],
          optimalPeriod: 'Tout le cycle',
          icon: '/icons/tools/watering.svg',
          completed: false,
          difficulty: 'facile'
        },
        {
          id: 'eclaircissage',
          title: 'Éclaircissage (si nécessaire)',
          description: 'Éclaircir les jeunes plants si le semis est trop dense',
          duration: '10 minutes',
          tools: ['Petits ciseaux'],
          tips: [
            'Éclaircir quand les plants ont 2-3 cm',
            'Couper au ras du sol plutôt qu\'arracher',
            'Arroser après l\'éclaircissage'
          ],
          optimalPeriod: '10 jours après semis',
          icon: '/icons/tools/thinning.svg',
          completed: false,
          difficulty: 'facile'
        },
        {
          id: 'surveillance-binage',
          title: 'Surveillance et binage',
          description: 'Biner légèrement entre les rangs pour aérer le sol',
          duration: '10 minutes/semaine',
          tools: ['Binette', 'Sarcloir'],
          tips: [
            'Biner très superficiellement',
            'Éliminer les mauvaises herbes rapidement',
            'Butter légèrement le collet si nécessaire'
          ],
          optimalPeriod: 'Tout le cycle',
          icon: '/icons/tools/hoeing.svg',
          completed: false,
          difficulty: 'facile'
        },
        {
          id: 'recolte-radis',
          title: 'Récolte',
          description: 'Récolter les radis quand ils atteignent 2-3 cm de diamètre',
          duration: '10 minutes',
          tools: ['Panier'],
          tips: [
            'Récolter par temps frais de préférence',
            'Ne pas laisser les radis trop longtemps en terre',
            'Couper les fanes en laissant 2-3 cm'
          ],
          optimalPeriod: '25-30 jours après semis',
          icon: '/icons/tools/harvest.svg',
          completed: false,
          difficulty: 'facile'
        }
      ]
    }
  ],
  journal: [
    {
      id: 'j1',
      content: 'Première note du carnet de bord, météo idéale aujourd\'hui.',
      createdAt: format(subDays(today, 1), 'dd/MM/yyyy HH:mm'),
      author: 'Dylan',
      photos: ['/images/zone1.jpeg']
    },
    {
      id: 'j2',
      content: 'Ajout de compost ce matin, à surveiller l\'humidité.',
      createdAt: format(today, 'dd/MM/yyyy HH:mm'),
      author: 'Sophie'
    }
  ]
}; 