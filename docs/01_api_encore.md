# 01 - Développement de l'API Encore.ts

**Objectif :** Créer une API backend en TypeScript en utilisant Encore.dev pour servir les données de l'application Dashboard Garden et remplacer les données mockées actuelles. L'API utilisera SQLite comme base de données pour le prototypage et bénéficiera des avantages de performance et de type-safety d'Encore.

## Pourquoi Encore.ts ?

- **Performance exceptionnelle** : 9x plus rapide qu'Express.js grâce au moteur Rust
- **Type-safety native** : Validation automatique des requêtes et sécurité de type à l'exécution
- **Infrastructure as Code** : Base de données, pub/sub intégrés directement dans le code
- **Developer Experience** : Dashboard de développement local avec tracing, logging, hot reload
- **Documentation automatique** : Génération automatique des clients API et documentation
- **AI-Ready** : Optimisé pour Cursor et autres outils IA

## 📊 **État Actuel du Projet - MISE À JOUR**

### ✅ **SERVICES TERMINÉS**

1. **Service Plants** → 100% ✅
   - 16+ plantes migrées avec données complètes
   - Endpoints pour Assistant et Wiki
   - Migration automatisée réussie
   
2. **Service Gardens & Zones** → 100% ✅
   - 3 jardins avec zones et itinéraires
   - CRUD complet pour jardins, zones, itinéraires
   - Gestion des plantes actuelles et historique
   - Notes et journal intégrés

### 🚧 **PROCHAINES ÉTAPES PRIORITAIRES**

## Tâches Principales (Priorisées selon l'analyse des mocks)

### ⚠️ CLARIFICATION : Types de Tâches dans les Mocks

Le fichier `/mocks/data.ts` contient **deux types différents** de tâches :

1. **`mockCalendarTasks`** : Tâches **spécifiques de jardinage** (arrosage, plantation, récolte) liées aux zones et plantes → **Priorité Haute**
2. **`mockTasks`** : Tâches **générales de projet/équipe** avec assignation d'utilisateurs (ex: "Installation système irrigation") → **Priorité Basse/Optionnelle**

### 1. Configuration Initiale du Projet Encore.ts
   - **Description :** Initialiser le projet Encore.ts et configurer la structure de base.
   - **Sous-tâches :**
     - [ ] Installer Encore CLI : `brew install encoredev/tap/encore`
     - [ ] Créer le projet : `encore app create --example=ts/hello-world dashboard-garden-api`
     - [ ] Configurer la structure des services (plants, gardens, zones, wiki, itineraries, calendar)
     - [ ] Mettre en place la configuration de base avec SQLite
   - **Estimation :** ~2 heures

### 2. Service Base de Données et Modèles TypeScript
   - **Description :** Définir les schémas de base de données et modèles TypeScript basés sur les mocks analysés.
   - **Sous-tâches :**
     - [ ] Configurer SQLite avec Encore
     - [ ] Créer les interfaces TypeScript pour tous les modèles :
       - **Plants** : `PlantDatabase`, `PlantVariety`, `PlantCompanion`, `StepTemplate`
       - **Gardens & Zones** : `Garden`, `Zone`, `ZoneDetail`, `Plant` (current plants)
       - **Itineraries** : `ZoneItinerary`, `ItineraryStep`, `NutritionalBenefits`, `StorageAdvice`
       - **Wiki** : `Plant` (wiki), `PlantPest`, `PlantDisease`, `NutritionalValue`, `CulturalTip`
       - **Calendar** : `CalendarTask`, `Task`, `EnvironmentalCondition`
       - **Users** : `User`, `PlantHistory`, `Note`, `JournalEntry`
     - [ ] Créer les migrations de base de données
   - **Estimation :** ~5 heures

### 3. Service Plants Unifié (Remplace `/mocks/plantsDatabase.ts` + `/mocks/plantsWiki.ts`) ✅ **TERMINÉ**
   - **Description :** Service central pour toutes les données des plantes, avec des vues spécialisées selon le contexte d'usage.
   - **Philosophie** : Une seule source de vérité avec des endpoints optimisés par cas d'usage
   - **Sous-tâches :**
     - [x] **Modèle unifié** : Interface `FullPlant` combinant données pratiques + éducatives
     - [x] **Vue Assistant** : `GET /plants/assistant` et `GET /plants/:id/assistant` (stepTemplates, companions, varieties)
     - [x] **Vue Wiki** : `GET /plants/wiki` et `GET /plants/:slug/wiki` (contenu éducatif, nutritional, pests, diseases)
     - [x] **CRUD complet** : `GET /plants`, `GET /plants/:id`, `POST /plants`, `PUT /plants/:id`, `DELETE /plants/:id`
     - [x] **Recherche contextuelle** : `GET /plants/search?context=assistant|wiki&type=&difficulty=&season=`
     - [x] **Endpoints spécialisés** :
       - `GET /plants/seasonal/:season` (pour l'assistant)
       - `GET /plants/popular` (pour le wiki)
       - `GET /plants/categories` (organisation wiki)
     - [x] **Health check** : `GET /plants/health`
     - [x] **Validation des données** avec les schémas Drizzle PostgreSQL
     - [x] **Migration complète** des mocks avec script automatisé
     - [x] **16+ plantes** migrées avec variétés, compagnons, étapes
   - **Estimation :** ~10 heures (+ 2h pour la fusion des données)

### 4. Service Wiki Content & Search (Nouveau - contenu non-plantes)
   - **Description :** Service pour le contenu wiki général (articles, guides, tutoriels) distinct des données plantes.
   - **Sous-tâches :**
     - [ ] **Articles généraux** : `GET /wiki/articles`, `GET /wiki/articles/:slug`
     - [ ] **Guides et tutoriels** : `GET /wiki/guides`, techniques de jardinage
     - [ ] **Glossaire** : `GET /wiki/glossary`, termes de jardinage
     - [ ] **Recherche globale** : `GET /wiki/search?q=&type=plants|articles|guides`
     - [ ] **Navigation** : catégories, tags, suggestions
   - **Estimation :** ~4 heures

### 5. Service Gardens & Zones (Remplace `/mocks/gardensData.ts` et `/mocks/zoneDetails.ts`) ✅ **TERMINÉ**
   - **Description :** Gestion complète des jardins, zones et leurs détails pour chaque utilisateur.
   - **Sous-tâches :**
     - [x] **CRUD Jardins** : `GET /gardens`, `POST /gardens`, `GET /gardens/:id`, `PUT /gardens/:id`, `DELETE /gardens/:id`
     - [x] **CRUD Zones** : `GET /gardens/:gardenId/zones`, `POST /gardens/:gardenId/zones`, `GET /zones/:zoneId`, `PUT /zones/:zoneId`
     - [x] **Détails de zones** : `GET /zones/:zoneId` (plantes actuelles, historique, conditions environnementales, notes, journal)
     - [x] **Plantes en cours** : `POST /zones/:zoneId/plants`, `PUT /zones/:zoneId/plants/:plantId`
     - [x] **Historique des plantations** : `POST /zones/:zoneId/history`
     - [x] **Notes et journal** : `POST /zones/:zoneId/notes`, `POST /zones/:zoneId/journal`
     - [x] **Health check** : `GET /gardens/health`
     - [x] **Schema complet** : 8 tables (gardens, zones, itineraries, steps, plants, history, notes, journal, conditions)
     - [x] **Migration de données** : 3 jardins avec zones et itinéraires complets
   - **Estimation :** ~10 heures → **RÉALISÉ**

### 6. Service Itineraries (Logique des itinéraires de culture) ✅ **INTÉGRÉ DANS GARDENS**
   - **Description :** Gestion des itinéraires de culture avec étapes détaillées et suivi de progression.
   - **Note :** Intégré directement dans le service Gardens pour la cohérence des données
   - **Sous-tâches :**
     - [x] **CRUD Itinéraires** : `GET /itineraries/:id`, `PUT /itineraries/:id`
     - [x] **Itinéraires par zone** : `GET /zones/:zoneId/itineraries`, `POST /zones/:zoneId/itineraries`
     - [x] **Gestion des étapes** : `PUT /itineraries/:itineraryId/steps/:stepId/complete`
     - [x] **Données enrichies** : variétés, compagnons, ravageurs, maladies, conseils nutritionnels (JSON)
     - [x] **Suivi de progression** : champ progress, dates de début/fin
     - [ ] **Génération automatique** : endpoint pour l'assistant IA `POST /itineraries/generate` (futur)
     - [x] **Ressources et conseils** : liens, guides, conseils de stockage (JSON)
   - **Estimation :** ~9 heures → **RÉALISÉ dans Gardens**

### 7. Service Calendar & Gardening Tasks (Remplace `/mocks/data.ts` - mockCalendarTasks)
   - **Description :** Système de tâches de jardinage et calendrier pour planifier et suivre les activités quotidiennes (arrosage, plantation, taille, etc.)
   - **Sous-tâches :**
     - [ ] **CRUD Tâches Jardinage** : `GET /calendar/tasks`, `POST /calendar/tasks`, `PUT /calendar/tasks/:id`, `DELETE /calendar/tasks/:id`
     - [ ] **Tâches par période** : `GET /calendar/tasks?from=&to=`, `GET /calendar/tasks/today`, `GET /calendar/tasks/week`
     - [ ] **Tâches par zone** : `GET /zones/:zoneId/tasks`, `GET /gardens/:gardenId/tasks`
     - [ ] **Tâches par type** : `GET /calendar/tasks?type=arrosage|plantation|taille|fertilisation|traitement|récolte|observation`
     - [ ] **Statistiques** : `GET /calendar/stats` (aujourd'hui, en cours, terminées)
     - [ ] **Planification automatique** : génération de tâches basées sur les itinéraires
     - [ ] **Notifications et rappels** : système de rappels pour les tâches à venir
   - **Estimation :** ~6 heures

### 8. Authentication Integration (Better Auth + Encore)
   - **Description :** Intégration de l'authentification avec Better Auth côté Nuxt et sécurisation de l'API Encore.
   - **Sous-tâches :**
     - [ ] **Better Auth Setup** : Configuration de Better Auth dans l'app Nuxt (providers, sessions)
     - [ ] **Encore Auth Middleware** : Validation des tokens JWT/sessions dans les endpoints API
     - [ ] **User Service** : `GET /users/profile`, `PUT /users/profile` (données utilisateur de base)
     - [ ] **Permissions & Ownership** : Middleware pour vérifier les droits d'accès aux jardins/zones
     - [ ] **User Preferences** : notifications, zones favorites, paramètres d'affichage
   - **Estimation :** ~5 heures

### ~~9. Service General Tasks & Team Management~~ ❌ **NON NÉCESSAIRE**
   - **Raison :** L'application est B2C pour utilisateur final individuel, pas besoin de gestion d'équipe
   - **Mockdata concernée :** `mockTasks` + `mockUsers` dans `/mocks/data.ts` → **À IGNORER**

### 9. Service Assistant IA & Recommendations
   - **Description :** Endpoints pour l'assistant IA avec génération de recommandations et itinéraires.
   - **Sous-tâches :**
     - [ ] **Génération d'itinéraires** : `POST /assistant/generate-itinerary`
     - [ ] **Recommandations de plantes** : `GET /assistant/plant-recommendations?zone=&season=&experience=`
     - [ ] **Conseils personnalisés** : basés sur l'historique utilisateur et conditions locales
     - [ ] **Diagnostics** : `POST /assistant/diagnose` pour identifier problèmes (ravageurs, maladies)
     - [ ] **Planification saisonnière** : `GET /assistant/seasonal-plan?garden=&season=`
   - **Estimation :** ~8 heures

### 10. Documentation et Tests avec Encore
    - **Description :** Profiter des outils Encore pour la documentation automatique et les tests.
    - **Sous-tâches :**
      - [ ] Configuration des tests unitaires avec Encore
      - [ ] Tests d'intégration pour chaque service
      - [ ] Documentation automatique via les types TypeScript
      - [ ] Configuration du dashboard de développement local
      - [ ] Tests de performance et monitoring
    - **Estimation :** ~6 heures

---

## Modèles de Données Principaux (basés sur l'analyse des mocks)

### FullPlant (Modèle unifié)
```typescript
interface FullPlant {
  // Identifiant et base
  id: string
  slug: string  // pour les URLs wiki
  name: string
  scientificName: string
  icon: string
  images: string[]
  
  // Classification et difficulté
  type: 'légume-fruit' | 'légume-feuille' | 'légume-racine' | 'aromate'
  category: string
  family: string
  difficulty: 'facile' | 'moyen' | 'difficile'
  origin: string
  
  // Données de culture (pour l'assistant)
  soilTypes: string[]
  sunExposure: string[]
  seasons: string[]
  spacing: string
  depth: string
  seedingPeriod: string[]
  transplantPeriod: string[]
  harvestPeriod: string[]
  growthDuration: string
  temperature: TemperatureRange
  watering: string
  
  // Contenu éducatif (pour le wiki)
  description: string
  characteristics: string[]
  nutritionalValues: NutritionalValue[]
  healthBenefits: string[]
  
  // Relations et données associées
  varieties: PlantVariety[]
  companions: PlantCompanion[]
  stepTemplates: StepTemplate[]
  pests: PlantPest[]
  diseases: PlantDisease[]
  culturalTips: CulturalTip[]
  
  // Métadonnées wiki
  tags: string[]
  averageRating: number
  ratingsCount: number
  popularity: number
  relatedItineraries: string[]
  resources: Resource[]
}

// Vues spécialisées
interface PlantAssistantData {
  id: string
  name: string
  icon: string
  type: string
  difficulty: string
  soilTypes: string[]
  sunExposure: string[]
  seasons: string[]
  spacing: string
  depth: string
  seedingPeriod: string[]
  transplantPeriod: string[]
  harvestPeriod: string[]
  growthDuration: string
  varieties: PlantVariety[]
  companions: PlantCompanion[]
  stepTemplates: StepTemplate[]
}

interface PlantWikiData {
  id: string
  slug: string
  name: string
  scientificName: string
  icon: string
  images: string[]
  category: string
  family: string
  difficulty: string
  origin: string
  description: string
  characteristics: string[]
  nutritionalValues: NutritionalValue[]
  pests: PlantPest[]
  diseases: PlantDisease[]
  culturalTips: CulturalTip[]
  tags: string[]
  averageRating: number
  popularity: number
  resources: Resource[]
}
```

### Garden & Zone
```typescript
interface Garden {
  id: string
  name: string
  description: string
  icon: string
  createdAt: string
  location: string
  zones: Zone[]
}

interface Zone {
  id: string
  name: string
  description: string
  image: string
  icon: string
  surface: string
  soilType: string
  sunExposure: string
  irrigationType: string
  color: string
  gardenId: string
  itineraries: ZoneItinerary[]
}
```

### ZoneItinerary
```typescript
interface ZoneItinerary {
  id: string
  name: string
  description: string
  icon: string
  difficulty: 'facile' | 'moyen' | 'difficile'
  totalDuration: string
  plantType: string
  season: string
  progress: number
  startedDate?: string
  expectedHarvestDate?: string
  zoneId: string
  zoneName: string
  steps: ItineraryStep[]
  varieties?: PlantVariety[]
  companions?: PlantCompanion[]
  pests?: PlantPest[]
  diseases?: PlantDisease[]
  nutritionalBenefits?: NutritionalBenefit[]
  storageAdvice?: StorageAdvice
  resources?: Resource[]
}
```

## Migration depuis les Mocks

### **Phase 1 : Fusion et Service Plants Unifié**
1. **Analyse des données** : Fusion des structures `plantsDatabase.ts` + `plantsWiki.ts`
2. **Création du modèle `FullPlant`** : Interface complète combinant les deux sources
3. **Script de migration** : Fusion automatique des données avec résolution des conflits
4. **Service Plants Encore.ts** : Implémentation avec vues spécialisées

### **Phase 2 : Services Contextuels**
1. **Gardens & Zones** : Remplace `gardensData.ts` et `zoneDetails.ts`
2. **Calendar & Tasks** : Remplace partie calendrier de `data.ts`
3. **Wiki Content** : Articles et guides généraux (non-plantes)

### **Phase 3 : Services Avancés**
1. **Itineraries** : Logique complexe des itinéraires
2. **Assistant IA** : Génération et recommandations
3. **Users & Auth** : Profils et permissions

### **Phase 4 : Intégration Frontend**
1. **Remplacement progressif** : Un mock à la fois
2. **Composables Nuxt** : `usePlants()`, `useGardens()`, etc.
3. **Tests d'intégration** : Validation cohérence frontend/backend

## Stratégie de Migration des Données Plants

```typescript
// Script de fusion des données
interface MigrationStrategy {
  // 1. Identifier les plantes communes (par nom/id)
  findCommonPlants(): PlantMatch[]
  
  // 2. Fusionner les données (priorité aux données les plus complètes)
  mergePlantData(dbPlant: PlantDatabase, wikiPlant: Plant): FullPlant
  
  // 3. Résoudre les conflits (ex: difficulty différente)
  resolveConflicts(conflicts: DataConflict[]): Resolution[]
  
  // 4. Valider la cohérence
  validateMergedData(plant: FullPlant): ValidationResult
}

## Avantages Encore.ts pour ce Projet

- **Performance** : Validation Rust vs validation JavaScript classique
- **Type Safety** : Cohérence garantie entre frontend Nuxt et backend Encore
- **Infrastructure intégrée** : Base de données, caching, pub/sub sans configuration externe
- **Developer Experience** : Dashboard local avec tracing des requêtes, logs structurés
- **Documentation automatique** : API explorer généré automatiquement
- **AI-Ready** : Excellent support pour Cursor et génération de code IA 