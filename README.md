# Node Ecole Directe

[![downloadsBadge](https://img.shields.io/npm/dt/node-ecole-directe?style=for-the-badge)](https://npmjs.com/node-ecole-directe)
[![versionBadge](https://img.shields.io/npm/v/node-ecole-directe?style=for-the-badge)](https://npmjs.com/node-ecole-directe)
[![patreonBadge](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Fshieldsio-patreon.herokuapp.com%2FAndroz2091%2Fpledges&style=for-the-badge)](https://patreon.com/Androz2091)

## Fonctionnalités

🔐 Authentification pour les comptes **Élèves** et **Familles**  
📑 Récupération des **notes**  
📚 Récupération des **devoirs**  
📅 Récupération des **emplois du temps**  
🏃🏽 Récupération des éléments de **vie scolaire** (retards, absences, sanctions, etc...)

## Exemples

### Compte Famille

```js
const EcoleDirecte = require("node-ecole-directe");
const session = new EcoleDirecte.Session();
const account = session.connexion("identifiant", "mot-de-passe");
// Vous êtes maintenant connecté à école directe !

console.log(account.type); // Famille
console.log(account.members);
/*
[
    {
        prenom: "Clotilde",
        nom: "Fernandez",
        sexe: "F",
        classe: "Cinquième D"
    },
    {
        prenom: "Antoine",
        nom: "Martinez",
        sexe: "M",
        classe: "Sixième C"
    }
]
*/

// Récupération des notes de Clotilde
const notesDeClotilde = await account.members[0].fetchNotes();
console.log(notesDeClotilde.notes.length); // 23

// Récupération du bilan du premier trimestre de Clotilde
const notesDeClotideTrimestre1 = notesDeClotilde.periodes.find(p =>
  p.dateDebut.startsWith("2019")
);
console.log(notesDeClotideTrimestre1.ensembleMatieres.moyenneGenerale); // 18

// Récupération du cahier de texte d'Antoine
const cahierDeTexteAntoine = await account.members[1].fetchCahierDeTexte();
console.log(cahierDeTexteAntoine[0].day); // 2020-03-09
console.log(cahierDeTexteAntoine[0].devoirs);
/*
[
    {
        matiere: 'MATHEMATIQUES',
        codeMatiere: 'MATHS',
        aFaire: true,
        idDevoir: 10966,
        documentsAFaire: false,
        donneLe: '2020-02-20',
        effectue: false,
        interrogation: false,
        rendreEnLigne: false
    }
]
*/
```

### Compte Élève

```js
const EcoleDirecte = require("node-ecole-directe");
const session = new EcoleDirecte.Session();
const account = session.connexion("identifiant", "mot-de-passe");
// Vous êtes maintenant connecté à école directe !

console.log(account.type); // Élève
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

// Récupération des notes de Clotilde
const notesDeClotilde = await account.fetchNotes();
console.log(notesDeClotilde.notes.length); // 23

// Récupération du bilan du premier trimestre de Clotilde
const notesDeClotideTrimestre1 = notesDeClotilde.periodes.find(p =>
  p.dateDebut.startsWith("2019")
);
console.log(notesDeClotideTrimestre1.ensembleMatieres.moyenneGenerale); // 18

// Récupération du cahier de texte de Clotilde
const cahierDeTexteClotilde = await account.fetchCahierDeTexte();
console.log(cahierDeTexteClotilde[0].day); // 2020-03-09
console.log(cahierDeTexteClotilde[0].devoirs);
/*
[
    {
        matiere: 'MATHEMATIQUES',
        codeMatiere: 'MATHS',
        aFaire: true,
        idDevoir: 10966,
        documentsAFaire: false,
        donneLe: '2020-02-20',
        effectue: false,
        interrogation: false,
        rendreEnLigne: false
    }
]
*/
```

## Liste des méthodes

### Compte Famille

```js
const EcoleDirecte = require("node-ecole-directe");
const session = new EcoleDirecte.Session();
const account = session.connexion("identifiant", "mot-de-passe");
// Vous êtes maintenant connecté à école directe !

console.log(account.type); // Famille

// Récupération des notes
const notes = await account.members[0].fetchNotes();

// Récupération de l'emploi du temps
const emploiDuTemps = await account.members[0].fetchEmploiDuTemps(); // Sans date spécifiée
const emploiDuTempsDu18Au22 = await account.members[0].fetchEmploiDuTemps(
  "2020-03-18",
  "2020-03-22"
); // Avec une date de début et une date de fin

// Récupération du cahier de texte
const cahierDeTexte = await account.members[0].fetchCahierDeTexte();

// Récupération des éléments de vie scolaire (retards, absences, etc...)
const vieScolaire = await account.members[0].fetchVieScolaire();
```

### Compte Élève

```js
const EcoleDirecte = require("node-ecole-directe");
const session = new EcoleDirecte.Session();
const account = session.connexion("identifiant", "mot-de-passe");
// Vous êtes maintenant connecté à école directe !

console.log(account.type); // Élève

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

// Récupération des éléments de vie scolaire (retards, absences, etc...)
const vieScolaire = await account.fetchVieScolaire();
```

## Crédits

Merci à [Max_steel91.js#8659](https://github.com/Maxsteel91Dev) pour son aide ainsi [Enertix Le Vrai#0001](https://github.com/Christian-Martins) pour m'avoir prêté ses identifiants pour que effectuer la totalité des tests!
