module.exports = class Eleve {
    constructor(session, data, family) {
        // Default values
        this.session = session;
        this.data = data;
        if (family) this.family = family;

        this._patch(data);
    }

    _patch (data) {
        this.prenom = 'prenom' in data ? data.prenom : null;
        this.nom = 'nom' in data ? data.nom : null;
        this.sexe = 'profile' in data ? data.profile.sexe : 'sexe' in data ? data.sexe : null;
        this.etablissement = 'nomEtablissement' in data ? data.nomEtablissement : null;
        this.classe = 'profile' in data ? data.profile.classe.libelle : 'classe' in data ? data.classe.libelle : null;
    }

    async fetchNotes() {
        return new Promise(async resolve => {
            const data = await this.session.request(
                "https://api.ecoledirecte.com/v3/eleves/" +
                    this.id +
                    "/notes.awp?verbe=get&"
            );
            resolve(data.data);
        });
    }

    async fetchCahierDeTexte() {
        return new Promise(async resolve => {
            const data = await this.session.request(
                "https://api.ecoledirecte.com/v3/Eleves/" +
                    this.id +
                    "/cahierdetexte.awp?verbe=get&"
            );
            this.cahierDeTexte = [];
            Object.keys(data.data).forEach(day => {
                this.cahierDeTexte.push({
                    day,
                    devoirs: data.data[day]
                });
            });
            resolve(this.cahierDeTexte);
        });
    }

    async fetchCahierDeTexteJour (jour) {
        return new Promise(async resolve => {
            const data = await this.session.request(
                "https://api.ecoledirecte.com/v3/Eleves/" +
                    this.id +
                    "/cahierdetexte/" + jour + ".awp?verbe=get&"
            );
            const cahierDeTexte = [];
            Object.keys(data.data.matieres).forEach(matiere => {
                cahierDeTexte.push({
                    matiere: data.data.matieres[matiere]
                })
            })
            resolve(cahierDeTexte)
        })
    }

    async fetchEmploiDuTemps(dateDebut, dateFin) {
        return new Promise(async resolve => {
            const data = await this.session.request(
                "https://api.ecoledirecte.com/v3/E/" +
                    this.id +
                    "/emploidutemps.awp?verbe=get&",
                null,
                {
                    dateDebut: dateDebut,
                    dateFin: dateFin
                }
            );
            resolve(data.data);
        });
    }

    async fetchVieScolaire() {
        return new Promise(async resolve => {
            const data = await this.session.request(
                "https://api.ecoledirecte.com/v3/eleves/" +
                    this.id +
                    "/viescolaire.awp?verbe=get&"
            );
            resolve(data.data);
        });
    }

    async fetchMessagerie() {
        return new Promise(async resolve => {
            const data = await this.session.request(
                "https://api.ecoledirecte.com/v3/eleves/" +
                    this.id +
                    "/messages.awp?verbe=getall&typeRecuperation=received&orderBy=date&order=desc&page=0&itemsPerPage=20&onlyRead=&query=&idClasseur=0"
            );
            resolve(data.data);
        });
    }
};
