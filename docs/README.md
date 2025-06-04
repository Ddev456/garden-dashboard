# Devbook: Évolution Majeure du développement de Carnet Potager

Ce document sert de guide pour la prochaine phase de développement majeure de l'application Dashboard Garden. Il détaille les étapes pour la construction de l'API backend, l'implémentation d'un système de feature flags, l'intégration de l'authentification, et la refactorisation du frontend.

## Objectifs Généraux

1.  **Backend Robuste :** Mettre en place une API en Go pour gérer les données de l'application de manière persistante et évolutive.
2.  **Flexibilité :** Implémenter un système de feature flags pour contrôler le déploiement progressif des fonctionnalités.
3.  **Sécurité :** Intégrer un système d'authentification moderne et sécurisé avec `better-auth`.
4.  **Maintenabilité :** Refactoriser le frontend Nuxt pour améliorer sa structure, sa maintenabilité et sa scalabilité en appliquant les principes SOLID et DRY.

## Sections du Devbook

*   [01 - API Golang](./01_api_golang.md)
*   [02 - Système de Feature Flags](./02_feature_flags.md)
*   [03 - Authentification](./03_authentification.md)
*   [04 - Refactorisation Frontend](./04_refactorisation_frontend.md)
*   (Optionnel) [Architectural Decision Records (ADR)](./adr/README.md)

## Ordre de Priorité des Développements

1.  Développement de l'API Golang.
2.  Implémentation du système de Feature Flags.
3.  Intégration de l'authentification.
4.  Refactorisation du frontend. 