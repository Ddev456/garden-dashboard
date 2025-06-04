# 03 - Implémentation de l'Authentification avec Better Auth

**Objectif :** Intégrer `better-auth` dans l'application Nuxt pour gérer l'authentification des utilisateurs, en commençant par une connexion OAuth avec Google. Prévoir également les flux d'inscription, de mise à jour de profil et potentiellement de récupération de compte (si applicable avec OAuth).

**Référence principale :** [Documentation Nuxt pour Better Auth](https://www.better-auth.com/docs/integrations/nuxt)

## Tâches Principales

### 1. Configuration de `better-auth`
   - **Description :** Mettre en place et configurer une instance de `better-auth` pour le projet.
   - **Sous-tâches :**
     - [ ] Suivre les instructions d'installation de `better-auth` (potentiellement installation d'un CLI, configuration d'un projet sur leur plateforme).
     - [ ] Configurer le fournisseur OAuth Google (créer un projet sur Google Cloud Console, obtenir les identifiants client ID et secret).
     - [ ] Définir les variables d'environnement nécessaires pour `better-auth` (clés API, secrets, URL de callback).
   - **Estimation :** ~4 heures

### 2. Création de la Route API pour `better-auth` dans Nuxt
   - **Description :** Mettre en place la route API Nuxt qui gérera les callbacks et les interactions avec `better-auth`, comme décrit dans leur documentation.
   - **Sous-tâches :**
     - [ ] Créer le fichier `server/api/auth/[...all].ts`.
     - [ ] Importer et configurer le handler `auth.handler` de `better-auth`.
     - [ ] Configurer votre instance `auth` (probablement dans `~/lib/auth.ts` ou similaire).
   - **Estimation :** ~2 heures

### 3. Migration de la Base de Données (si nécessaire par `better-auth`)
   - **Description :** Exécuter les migrations de base de données requises par `better-auth` pour créer les tables nécessaires (utilisateurs, sessions, etc.).
   - **Sous-tâches :**
     - [ ] Exécuter la commande `npx @better-auth/cli migrate` (ou équivalent).
     - [ ] Vérifier que les tables sont correctement créées dans votre base de données SQLite (ou celle configurée pour `better-auth`).
   - **Estimation :** ~1 heure

### 4. Création du Client `better-auth` dans Nuxt
   - **Description :** Mettre en place le client `better-auth` côté frontend pour interagir avec le système d'authentification.
   - **Sous-tâches :**
     - [ ] Créer le fichier `lib/client.ts` (ou `lib/auth-client.ts`).
     - [ ] Importer et configurer `createAuthClient` depuis `better-auth/vue`.
   - **Estimation :** ~1 heure

### 5. Implémentation des Flux d'Authentification
   - **Description :** Intégrer les fonctionnalités de connexion, déconnexion, et gestion de session dans l'interface utilisateur Nuxt.
   - **Sous-tâches :**
     - [ ] **Connexion :**
       - [ ] Ajouter un bouton "Se connecter avec Google".
       - [ ] Utiliser `authClient.signIn.social({ provider: 'google' })`.
       - [ ] Gérer les redirections et l'état de la session (`authClient.useSession()`).
     - [ ] **Déconnexion :**
       - [ ] Ajouter un bouton de déconnexion.
       - [ ] Utiliser `authClient.signOut()`.
     - [ ] **Affichage de l'état de la session :**
       - [ ] Afficher des informations utilisateur ou des contrôles différents en fonction de l'état de connexion.
       - [ ] Utiliser `authClient.useSession()` (avec `useFetch` pour SSR si besoin).
   - **Estimation :** ~6 heures

### 6. Protection des Routes et Middleware
   - **Description :** Mettre en place un middleware Nuxt pour protéger certaines routes et rediriger les utilisateurs non authentifiés.
   - **Sous-tâches :**
     - [ ] Créer un fichier middleware (ex: `middleware/auth.global.ts`).
     - [ ] Utiliser `authClient.useSession(useFetch)` pour vérifier l'état de la session.
     - [ ] Rediriger vers une page de connexion ou la page d'accueil si l'utilisateur n'est pas authentifié et tente d'accéder à une route protégée.
     - [ ] Définir quelles routes nécessitent une authentification (ex: `/dashboard`, `/itineraires`, page de profil).
   - **Estimation :** ~3 heures

### 7. Gestion du Profil Utilisateur (via `better-auth`)
   - **Description :** Permettre aux utilisateurs de voir et potentiellement mettre à jour les informations de leur profil gérées par `better-auth`.
   - **Sous-tâches :**
     - [ ] Créer une page de profil utilisateur.
     - [ ] Explorer les fonctionnalités de `better-auth` pour la récupération et la mise à jour des données de profil.
     - [ ] Intégrer les formulaires et appels API nécessaires.
   - **Estimation :** ~4 heures (peut dépendre des capacités de `better-auth`)

### 8. Flux d'Inscription et Récupération de Compte
   - **Description :** Assurer que le flux d'inscription via OAuth est fluide. Pour la récupération de compte avec OAuth pur, c'est généralement géré par le fournisseur (Google). Clarifier si des étapes supplémentaires sont nécessaires pour les "mises à jour de profil" qui pourraient s'apparenter à une gestion de compte.
   - **Sous-tâches :**
     - [ ] Tester le processus d'inscription pour un nouvel utilisateur via Google.
     - [ ] Vérifier comment `better-auth` gère les informations utilisateur et si des compléments de profil sont nécessaires après l'inscription.
   - **Estimation :** ~2 heures

## Considérations
*   La sécurité des clés API et des secrets est primordiale. Utiliser des variables d'environnement et ne jamais les commiter dans le dépôt Git.
*   Tester minutieusement tous les flux d'authentification, y compris les cas d'erreur et les redirections.
*   Comprendre comment `better-auth` stocke et gère les données utilisateur, et comment cela s'intègre avec votre API Go pour les données de profil non liées à l'authentification. 