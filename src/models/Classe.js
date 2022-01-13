class Classe {
  constructor(
    id,
    text,
    matiere,
    codeMatiere,
    typeCours,
    start_date,
    end_date,
    color,
    dispensable,
    dispense,
    prof,
    salle,
    classe,
    classeId,
    classeCode,
    groupe,
    groupeCode,
    isFlexible,
    groupeId,
    icone,
    isModifie,
    contenuDeSeance,
    devoirAFaire,
    isAnnule
  ) {}

  static from(json) {
    return Object.assign(new Classe(), json);
  }
}

module.exports = Classe;
