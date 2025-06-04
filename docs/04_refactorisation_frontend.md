# 04 - Refactorisation du Frontend Nuxt

**Objectif :** Améliorer la structure, la maintenabilité et la scalabilité du code frontend Nuxt en appliquant les principes SOLID et DRY. Cette étape interviendra principalement après la mise en place de l'API Go et de l'authentification, car les interactions avec ces systèmes influenceront la structure du frontend.

## Principes Directeurs

*   **SOLID :**
    *   **S (Single Responsibility Principle) :** Chaque composant, page ou service devrait avoir une seule responsabilité.
    *   **O (Open/Closed Principle) :** Les entités logicielles (composants, modules) devraient être ouvertes à l'extension, mais fermées à la modification.
    *   **L (Liskov Substitution Principle) :** Les sous-types doivent être substituables à leurs types de base (pertinent pour la composition de composants et l'héritage de types TypeScript).
    *   **I (Interface Segregation Principle) :** Préférer plusieurs interfaces spécifiques client plutôt qu'une seule interface générale (pertinent pour les props des composants et les types de données).
    *   **D (Dependency Inversion Principle) :** Dépendre des abstractions, pas des concrétions (ex: utiliser des composables pour la logique réutilisable, injecter des dépendances).
*   **DRY (Don't Repeat Yourself) :** Éviter la duplication de code en extrayant la logique commune dans des composables, des utilitaires ou des composants de base.

## Tâches Principales

### 1. Analyse de l'Existant et Identification des Zones à Refactoriser
   - **Description :** Une fois l'API et l'authentification en place, passer en revue le code frontend pour identifier les points d'amélioration.
   - **Sous-tâches :**
     - [ ] Analyser la complexité des composants (props, logique interne).
     - [ ] Repérer les duplications de code.
     - [ ] Évaluer l'organisation des stores Pinia (si utilisés) ou des `useState`.
     - [ ] Vérifier la cohérence dans la gestion des appels API.
     - [ ] Identifier les composants qui pourraient être plus génériques ou décomposés.
   - **Estimation :** ~4 heures (phase d'analyse)

### 2. Refactorisation des Composants
   - **Description :** Modifier les composants pour adhérer aux principes SOLID et DRY.
   - **Sous-tâches :**
     - [ ] Décomposer les gros composants en plus petits, plus spécialisés.
     - [ ] Extraire la logique réutilisable dans des composables (`useFetch` pour les appels API, gestion d'état local complexe, etc.).
     - [ ] Clarifier les props et les événements émis.
     - [ ] Améliorer la lisibilité et la testabilité.
   - **Estimation :** ~12-16 heures (variable selon l'état initial)

### 3. Optimisation de la Gestion de l'État
   - **Description :** S'assurer que la gestion de l'état (Pinia, `useState`, etc.) est claire, efficace et évite les effets de bord indésirables.
   - **Sous-tâches :**
     - [ ] Structurer les stores Pinia de manière logique (par fonctionnalité, par domaine).
     - [ ] Utiliser les `useState` pour l'état local des composants et les composables pour l'état partagé plus complexe.
     - [ ] S'assurer de la réactivité et de la synchronisation correcte de l'état.
   - **Estimation :** ~6 heures

### 4. Amélioration de la Structure des Fichiers et Modules
   - **Description :** Organiser les fichiers et répertoires de manière intuitive et cohérente.
   - **Sous-tâches :**
     - [ ] Regrouper les fichiers par fonctionnalité ou par type (`components/featureA/`, `composables/featureA/`).
     - [ ] S'assurer que la nomenclature est claire et cohérente.
   - **Estimation :** ~3 heures

### 5. Typage TypeScript
   - **Description :** Renforcer l'utilisation de TypeScript pour améliorer la robustesse et la maintenabilité.
   - **Sous-tâches :**
     - [ ] S'assurer que tous les props, états, retours de fonction sont correctement typés.
     - [ ] Utiliser des types et interfaces partagés lorsque c'est pertinent.
     - [ ] Éviter l'utilisation de `any` autant que possible.
   - **Estimation :** ~5 heures (en continu avec les autres tâches de refactorisation)

### 6. Tests Frontend
   - **Description :** Ajouter ou améliorer les tests unitaires et d'intégration pour le frontend.
   - **Sous-tâches :**
     - [ ] Mettre en place Vitest ou un autre framework de test si ce n'est pas déjà fait.
     - [ ] Écrire des tests pour les composables critiques.
     - [ ] Écrire des tests pour les composants importants (vérifier le rendu, les interactions de base).
   - **Estimation :** ~8 heures

## Considérations
*   La refactorisation est un processus itératif. Il n'est pas nécessaire de tout refactoriser en une seule fois.
*   Prioriser les zones qui posent le plus de problèmes de maintenabilité ou qui sont les plus susceptibles d'évoluer.
*   S'appuyer sur les outils de linting et de formatage (ESLint, Prettier) pour maintenir la cohérence du code.
*   Chaque modification de refactorisation devrait être testée pour éviter les régressions. 