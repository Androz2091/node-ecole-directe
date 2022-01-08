const dotenv = require("dotenv");
dotenv.config();

const EcoleDirecte = require("./");
const session = new EcoleDirecte.Session();

console.log("test");

testAllFunctions();

async function testAllFunctions() {
  const account = await session.connexion(
    process.env.ID_ELEVE,
    process.env.MDP_ELEVE
  );

  console.log(account);

  console.log("Account fetch");

  const notes = await account.fetchNotes();

  const notesPremierSemestre = notes.periodes.find(
    (periode) => periode.periode === "1er Trimestre"
  ).ensembleMatieres;

  console.log(notesPremierSemestre);

  const moyenneGenerale = notesPremierSemestre.moyenneGenerale;
  const moyenneClasse = notesPremierSemestre.moyenneClasse;
  const appreciationPP = notesPremierSemestre.appreciationPP;

  console.log(moyenneGenerale);
  console.log(moyenneClasse);
  console.log(appreciationPP);

  const obtenirMoyenneMatiere = (nomMatiere) =>
    notesPremierSemestre.disciplines.find(
      (dis) => dis.discipline === nomMatiere
    ).moyenne;

  console.log(obtenirMoyenneMatiere("HISTOIRE-GEOGRAPHIE"));
}
