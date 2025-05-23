# 🌱 Wiki des Plantes - Gestion de Projet

## Vue d'ensemble
Développement d'un wiki des plantes intégré au dashboard-garden avec recherche, filtres, et intégration avec les itinéraires de culture existants.

## Objectifs
- ✅ Centraliser les informations sur les plantes cultivables
- ✅ Faciliter la recherche et découverte de nouvelles plantes
- ✅ Intégrer avec les zones de culture et itinéraires existants
- ✅ Fournir des conseils contextuels et saisonniers

---

## 📋 Tâches par priorité

### 🔥 Priorité 1 - Structure de base
- [x] **Créer les données mockées** (`mocks/plantsWiki.ts`)
  - [x] Interface TypeScript pour les plantes
  - [x] 6 plantes de base avec données complètes
  - [x] Catégorisation et metadata
- [x] **Page principale Wiki** (`pages/wiki/index.vue`)
  - [x] Layout de base avec filtres
  - [x] Grille de cartes de plantes
  - [x] Vue compacte/détaillée
- [x] **Page détail plante** (`pages/wiki/[slug].vue`)
  - [x] Structure avec onglets
  - [x] Composants réutilisables

### 🚀 Priorité 2 - Fonctionnalités core
- [ ] **Système de filtres** 
  - [x] Par catégorie (légume-fruit, légume-feuille, etc.)
  - [x] Par saison de culture
  - [x] Par difficulté
  - [ ] Par caractéristiques spéciales
- [ ] **Intégration avec l'existant**
  - [ ] Liens vers itinéraires correspondants
  - [ ] Bouton "Ajouter à ma zone"
  - [ ] Historique des plantes cultivées
- [ ] **Amélioration du Header**
  - [ ] Recherche globale fonctionnelle
  - [ ] Autocomplete avec suggestions
  - [ ] Navigation rapide

### ⚡ Priorité 3 - Enrichissement
- [ ] **Interactions utilisateur**
  - [ ] Système de notation (1-5 étoiles)
  - [ ] Notes personnelles sur les plantes
  - [ ] Badges "Déjà cultivé"
- [ ] **Fonctionnalités avancées**
  - [ ] Recherche par caractéristiques
  - [ ] Conseils contextuels selon la saison
  - [ ] Comparaison de plantes
- [ ] **Optimisations**
  - [ ] Animations et transitions
  - [ ] Loading states
  - [ ] Responsive design

---

## 🏗️ Structure des données

### Interface Plant
```typescript
interface Plant {
  id: string
  slug: string
  name: string
  scientificName: string
  icon: string
  images?: string[]
  category: 'légume-fruit' | 'légume-feuille' | 'légume-racine' | 'aromate'
  difficulty: 'facile' | 'moyen' | 'difficile'
  seasons: ('printemps' | 'été' | 'automne' | 'hiver')[]
  
  // Infos de base
  description: string
  characteristics: string[]
  
  // Culture
  sowingPeriod: string
  harvestPeriod: string
  growthDuration: string
  spacing: string
  exposure: string
  soil: string
  watering: string
  
  // Enrichi
  varieties?: PlantVariety[]
  companions?: PlantCompanion[]
  pests?: PlantPest[]
  diseases?: PlantDisease[]
  nutritionalValues?: NutritionalValue[]
  
  // Metadata
  tags: string[]
  relatedItineraries?: string[]
  averageRating?: number
  userNotes?: UserNote[]
}
```

## 📁 Structure des fichiers

```
pages/
  wiki/
    index.vue          # ✅ Page principale du wiki
    [slug].vue         # ⏳ Page détail d'une plante

components/
  wiki/
    PlantCard.vue      # ✅ Carte de plante (compacte/détaillée)
    PlantFilters.vue   # ⏳ Système de filtres
    PlantGrid.vue      # ⏳ Grille de plantes avec pagination
    PlantDetail/
      PlantHeader.vue      # ⏳ En-tête avec infos principales
      PlantOverview.vue    # ⏳ Onglet aperçu
      PlantCulture.vue     # ⏳ Onglet culture
      PlantHealth.vue      # ⏳ Onglet santé
      PlantVarieties.vue   # ⏳ Onglet variétés

mocks/
  plantsWiki.ts      # ✅ Données mockées des plantes

types/
  wiki.ts           # ✅ Types TypeScript pour le wiki
```

## 🎯 Plantes de départ (6)
1. **Tomate** - Légume-fruit, moyen, printemps-été ✅
2. **Laitue** - Légume-feuille, facile, toute-saison ✅
3. **Carotte** - Légume-racine, facile, printemps-automne ✅
4. **Basilic** - Aromate, facile, printemps-été ✅
5. **Courgette** - Légume-fruit, moyen, printemps-été ✅
6. **Navet** - Légume-racine, facile, automne-hiver ✅

---

## 📝 Notes de développement

### Intégrations prévues
- **Avec les itinéraires** : Lien bidirectionnel entre plantes et itinéraires
- **Avec les zones** : Ajout rapide de plantes aux zones de culture
- **Avec l'historique** : Affichage de l'expérience utilisateur

### Fonctionnalités futures
- **API Directus** : Migration des données mockées vers CMS
- **Système de contribution** : Permettre aux utilisateurs d'enrichir les fiches
- **Recommandations IA** : Suggestions basées sur les zones et préférences

---

## 🎉 Réalisations récentes

### Données mockées complètes (✅)
- 6 plantes avec informations détaillées : tomate, laitue, carotte, basilic, courgette, navet
- Structure riche : variétés, compagnons, ravageurs, maladies, valeurs nutritionnelles
- Fonctions utilitaires de recherche et filtrage

### Page principale du Wiki (✅)
- Interface utilisateur moderne avec recherche et filtres
- Vue grille et liste adaptatives
- Statistiques de la collection
- Suggestions de recherche rapide

### Composant PlantCard (✅)
- Vue carte pour la grille
- Vue liste détaillée
- Actions intégrées (voir détails, ajouter à zone)
- Badges et indicateurs visuels

### Page détail plante (✅)
- Interface complète avec en-tête informatif
- Système d'onglets : Aperçu, Variétés, Compagnons, Santé
- Navigation fluide et responsive
- Actions contextuelles (ajouter à zone, voir itinéraire)
- Gestion des cas d'erreur (plante non trouvée)

---

## ✅ Progression

**Phase 1 - Structure de base** : ✅ Terminée (100%)
- [x] Fichier de gestion créé
- [x] Données mockées
- [x] Page principale du wiki
- [x] Composant PlantCard
- [x] Page détail plante

**Phase 2 - Fonctionnalités** : ⏳ En attente

**Phase 3 - Enrichissement** : ⏳ En attente

---

## 🎯 Prochaines étapes prioritaires

**🎉 Phase 1 Terminée avec succès !**

Le wiki des plantes est maintenant opérationnel avec :
- **6 plantes complètement documentées** avec plus de 20 propriétés chacune
- **Interface utilisateur moderne** avec recherche en temps réel et filtres
- **Navigation intuitive** entre liste et détails
- **Données riches** : variétés, compagnons, ravageurs, maladies
- **Design responsive** et accessible

**Prochaines priorités (Phase 2) :**

1. **Améliorer la recherche globale** dans le header (intégration avec le wiki)
2. **Implémenter "Ajouter à ma zone"** avec sélecteur de zones
3. **Créer les liens bidirectionnels** avec les itinéraires existants
4. **Ajouter le système de notation** utilisateur (1-5 étoiles)
5. **Développer les notes personnelles** sur les plantes 