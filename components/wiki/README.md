# Composants Wiki

Cette section contient tous les composants dédiés au wiki des plantes, organisés de manière modulaire pour une meilleure maintenabilité.

## Structure des composants

### Page principale du wiki (`/wiki`)

- **`WikiHeader.vue`** - En-tête avec titre et description du wiki
- **`WikiSearchBar.vue`** - Barre de recherche avec suggestions
- **`WikiFilters.vue`** - Filtres de recherche et options d'affichage
- **`WikiStats.vue`** - Statistiques de la collection
- **`WikiEmptyState.vue`** - État vide personnalisable
- **`PlantCard.vue`** - Carte de plante (vue grille et liste)

### Page de détail d'une plante (`/wiki/[slug]`)

- **`PlantHeader.vue`** - En-tête de la plante avec informations principales
- **`PlantOverview.vue`** - Onglet aperçu (caractéristiques, culture, tags)
- **`PlantVarieties.vue`** - Onglet variétés disponibles
- **`PlantCompanions.vue`** - Onglet associations de plantes
- **`PlantHealth.vue`** - Onglet santé (ravageurs et maladies)

## Améliorations apportées

### Modularité
- Code divisé en composants logiques réutilisables
- Séparation claire des responsabilités
- Facilite la maintenance et les tests

### Sécurité des données
- Protection contre les propriétés `undefined`
- Gestion des tableaux vides avec `|| []`
- Valeurs par défaut appropriées

### UX améliorée
- Meilleurs messages d'état vide
- Conseils et informations contextuelles
- Interactions plus fluides

### Design
- Utilisation cohérente des icônes Lucide
- Codes couleur significatifs pour les statuts
- Animations et transitions subtiles

## Utilisation

### Composants réactifs
Tous les composants utilisent des props et émettent des événements pour la communication parent-enfant :

```vue
<WikiSearchBar 
  v-model:search-query="searchQuery"
  :suggestions="suggestions"
  @search="handleSearch"
  @clear="clearSearch"
/>
```

### Gestion d'état
Les composants sont stateless quand c'est possible, la logique métier reste dans les pages parentes.

### Type Safety
Tous les composants utilisent TypeScript avec des interfaces strictes pour les props et events.

## Performance

- Lazy loading naturel avec la structure par onglets
- Pas de watchers inutiles
- Optimisation des re-rendus avec des computed appropriés

## Extensibilité

La structure modulaire permet d'ajouter facilement :
- Nouveaux onglets dans la page de détail
- Nouveaux filtres dans la recherche
- Nouvelles vues pour les cartes de plantes
- Nouveaux états vides personnalisés 