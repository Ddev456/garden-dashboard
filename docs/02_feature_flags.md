# 02 - Système de Feature Flags

**Objectif :** Implémenter un système de feature flags simple basé sur des variables d'environnement pour activer ou désactiver des fonctionnalités spécifiques à la fois dans le backend Go et le frontend Nuxt. Cela permettra de contrôler le déploiement des fonctionnalités comme le Calendrier, les Zones, tout en gardant le Wiki, l'Assistant et les Itinéraires actifs pour le prototype.

## Tâches Principales

### 1. Définition des Variables d'Environnement pour les Flags
   - **Description :** Identifier les fonctionnalités à placer derrière des flags et définir les noms des variables d'environnement correspondantes.
   - **Sous-tâches :**
     - [ ] Lister les fonctionnalités à flagger initialement : `CALENDRIER_ENABLED`, `ZONES_ENABLED`.
     - [ ] Définir une convention de nommage (ex: `FEATURE_MA_FONCTIONNALITE_ENABLED=true`).
     - [ ] Documenter ces variables (par exemple, dans un `.env.example`).
   - **Estimation :** ~1 heure

### 2. Implémentation Côté Backend (Go)
   - **Description :** Permettre à l'API Go de lire les variables d'environnement au démarrage et de rendre les endpoints ou fonctionnalités conditionnels.
   - **Sous-tâches :**
     - [ ] Créer un package/module de configuration en Go pour lire et parser les variables d'environnement liées aux features flags.
     - [ ] Modifier les routeurs ou handlers pour vérifier l'état des flags avant d'exposer/exécuter certaines logiques (ex: les endpoints du Calendrier et des Zones).
     - [ ] Renvoyer des erreurs appropriées (ex: 404 ou 503) si une fonctionnalité flaggée comme désactivée est accédée.
   - **Estimation :** ~3 heures

### 3. Implémentation Côté Frontend (Nuxt)
   - **Description :** Permettre à l'application Nuxt de connaître l'état des feature flags pour afficher ou masquer conditionnellement des parties de l'interface utilisateur.
   - **Sous-tâches (choisir une approche ou combiner) :**
     - **Approche 1 (Build time) :**
       - [ ] Utiliser les `runtimeConfig` de Nuxt 3 pour exposer les variables d'environnement au frontend.
       - [ ] Lire ces variables dans les composants ou les layouts pour afficher/masquer des éléments (ex: liens de navigation, sections de page pour Calendrier et Zones).
     - **Approche 2 (Runtime via API) :**
       - [ ] Créer un endpoint sur l'API Go (ex: `/api/features`) qui renvoie l'état des flags pertinents pour le frontend.
       - [ ] Appeler ce endpoint au démarrage de l'application Nuxt (ex: dans un plugin ou le `app.vue`) et stocker l'état (ex: dans Pinia ou un `useState`).
       - [ ] Utiliser cet état pour contrôler l'affichage.
     - [ ] Décider de l'approche (la configuration au build time est plus simple pour commencer).
     - [ ] Implémenter la logique dans les composants Nuxt concernés.
   - **Estimation :** ~4 heures

### 4. Documentation pour l'Utilisation des Flags
   - **Description :** Documenter comment activer/désactiver les fonctionnalités pour les développeurs ou les administrateurs système.
   - **Sous-tâches :**
     - [ ] Mettre à jour le `README.md` du projet ou un guide de déploiement.
   - **Estimation :** ~1 heure

## Fonctionnalités Initiales à Flagger

*   **Calendrier :** `FEATURE_CALENDAR_ENABLED` (pourrait contrôler l'accès à la page du calendrier et les API associées).
*   **Zones :** `FEATURE_ZONES_ENABLED` (pourrait contrôler l'accès à la page des zones et les API associées).

## Considérations
*   Commencer avec des variables d'environnement est simple. Si la complexité augmente, envisager un fichier de configuration centralisé ou une interface de gestion.
*   Assurer que l'application se comporte de manière gracieuse lorsqu'une fonctionnalité est désactivée (pas de liens cassés visibles, messages clairs si un accès direct est tenté). 