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

  console.log(
    "etsedjfnqesjiobqehifvqeoluhfbqseojhfbaQohjfbApubohaegbpfihaqebfpv"
  );
  //   const notes = await account.fetchNotes();

  //   const notesPremierSemestre = notes.periodes.find(
  //     (periode) => periode.periode === "1er Semestre"
  //   ).ensembleMatieres;

  //   const moyenneGenerale = notesPremierSemestre.moyenneGenerale;
  //   const moyenneClasse = notesPremierSemestre.moyenneClasse;
  //   const rang = notesPremierSemestre.rang;

  //   console.log(moyenneGenerale);
  //   console.log(moyenneClasse);
  //   console.log(rang);

  //   const obtenirMoyenneMatiere = (nomMatiere) =>
  //     notesPremierSemestre.disciplines.find(
  //       (dis) => dis.discipline === nomMatiere
  //     ).moyenne;
}
