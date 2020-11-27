module.exports = class Eleve {
    constructor(session, data, family) {
        console.log(data)
        this.type = "Élève";
        // Default values
        this.session = session;
        this.id = data.id;
        this.prenom = data.prenom;
        this.nom = data.nom;
        this.sexe = data.profile.sexe;
        this.classe = data.classe
            ? data.classe.libelle
            : data.profile.classe.libelle;
    }

    async fetchNotes() {
        return new Promise(async resolve => {
            const data = await this.session.request(
                "https://api.ecoledirecte.com/v3/eleves/" +
                    this.id +
                    "/notes.awp?verbe=get&"
            );
            this.notes = data.data;
            resolve(this.notes);
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
