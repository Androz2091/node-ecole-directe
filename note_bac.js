const dotenv = require("dotenv");
const { forever } = require("request");
dotenv.config();

const EcoleDirecte = require("./");
const session = new EcoleDirecte.Session();
const Classe = require("./src/models/Classe.js");

getAllElements();

async function getAllElements() {
  const account = await session.connexion(
    process.env.ID_ELEVE,
    process.env.MDP_ELEVE
  );

  // const notes = await account.fetchNotes();

  // for (var p in notes.periodes) {
  //   for (var i in notes.periodes[p].ensembleMatieres) {
  //     console.log(notes.periodes[p].ensembleMatieres[i]);
  //   }
  // }

  const edt = await account.fetchEmploiDuTemps(
    "2022-01-10 07:00",
    "2022-01-10 18:00"
  );

  var classesInDay = [];

  console.log(edt[0]);

  for (var i in edt) {
    var classe = Classe.from(edt[i]);
    classesInDay[i] = classe;
  }

  classesInDay.forEach((classe) => console.log(classe.matiere));
}
