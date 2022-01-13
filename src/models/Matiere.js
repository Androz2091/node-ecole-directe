class Matiere {
  constructor(
    id,
    codeMatiere,
    codeSousMatiere,
    discipline,
    moyenne,
    moyenneClasse,
    moyenneMin,
    moyenneMax,
    coef,
    effectif,
    rang,
    groupeMatiere,
    idGroupeMatiere,
    option,
    sousMatiere,
    saisieAppreciationSSMat,
    professeurs,
    appreciations
  ) {}

  static from(json) {
    return Object.assign(new Matiere(), json);
  }
}

module.exports = Matiere;
