# Microservices - Projet GL 2025

## Description
Ce projet illustre une architecture **microservices** réalisée sous la direction de **M. C. Malack**.  
Il met en œuvre des **web services** développés en **Java Spring Boot** avec une interface front-end en **Angular**.  
Les communications inter-services utilisent **REST** et **gRPC**.  
Les données sont stockées dans **MongoDB**.

## Technologies utilisées
- **Backend** : Spring Boot (Java)
- **Frontend** : Angular
- **Base de données** : MongoDB
- **API** : REST + gRPC
- **Gestion des dépendances** : Maven
- **Contrôle de version** : Git

## Fonctionnalités principales
- Communication inter-services via **API REST** et **gRPC**
- Persistance des données dans **MongoDB**
- Interface utilisateur responsive en Angular
- Sécurité et authentification avec Spring Security (JWT)

## Structure du projet
- `api-user` : Gestion des utilisateurs
- `api-serviceX` : Autres services métier
- `frontend-angular` : Interface web

## Prérequis
- Java 17+
- Node.js 18+
- Maven 3+
- MongoDB installé localement
- Git

## Installation et exécution

### 1. Cloner le projet
```bash
git clone https://github.com/ton-compte/microservices-projet-gl-2025.git
cd microservices-projet-gl-2025
