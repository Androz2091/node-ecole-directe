class Note {
  constructor(
    devoir,
    codePeriode,
    codeMatiere,
    libelleMatiere,
    codeSousMatiere,
    typeDevoir,
    enLettre,
    coef,
    noteSur,
    valeur,
    nonSignificatif,
    date,
    dateSaisie,
    valeurisee,
    moyenneClasse,
    minClasse,
    maxClasse,
    elementsProgramme
  ) {}

  static from(json) {
    return Object.assign(new Note(), json);
  }
}

module.exports = Note;
