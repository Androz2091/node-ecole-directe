# Node Ecole Directe

[![downloadsBadge](https://img.shields.io/npm/dt/node-ecole-directe?style=for-the-badge)](https://npmjs.com/node-ecole-directe)
[![versionBadge](https://img.shields.io/npm/v/node-ecole-directe?style=for-the-badge)](https://npmjs.com/node-ecole-directe)
[![patreonBadge](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Fshieldsio-patreon.vercel.app%2Fapi%3Fusername%3DAndroz2091%26type%3Dpledges&style=for-the-badge)](https://patreon.com/Androz2091)

## Fonctionnalités

🔐 Authentification pour les comptes **Élèves**  
📑 Récupération des **notes**  
📚 Récupération des **devoirs**  
📅 Récupération des **emplois du temps**  
🏃🏽 Récupération des éléments de **vie scolaire** (retards, absences, sanctions, etc...)

## Exemples

```js
const EcoleDirecte = require("node-ecole-directe");
const session = new EcoleDirecte.Session();
const account = await session.connexion("identifiant", "mot-de-passe");
// Vous êtes maintenant connecté à école directe !

console.log(account);
/*
[
    {
        type: "Élève",
        prenom: "Clotilde",
        nom: "Fernandez",
        sexe: "F",
        classe: "Cinquième D"
    }
]
*/
```

## Liste des méthodes


```js
const EcoleDirecte = require("node-ecole-directe");
const session = new EcoleDirecte.Session();
const account = await session.connexion("identifiant", "mot-de-passe");
// Vous êtes maintenant connecté à école directe !

// Récupération des notes
const notes = await account.fetchNotes();

// Récupération de l'emploi du temps
const emploiDuTemps = await account.fetchEmploiDuTemps(); // Sans date spécifiée
const emploiDuTempsDu18Au22 = await account.fetchEmploiDuTemps(
  "2020-03-18",
  "2020-03-22"
); // Avec une date de début et une date de fin

// Récupération du cahier de texte
const cahierDeTexte = await account.fetchCahierDeTexte();
const cahierDeTexteJourSpecifique = await account.fetchCahierDeTexteJour("2020-11-01");

// Récupération des éléments de vie scolaire (retards, absences, etc...)
const vieScolaire = await account.fetchVieScolaire();
```

## Crédits

Merci à [Max_steel91.js#8659](https://github.com/Maxsteel91Dev) et [Enertix Le Vrai#0001](https://github.com/Christian-Martins) pour le prêt de leurs identifiants pour effectuer la totalité des tests!
