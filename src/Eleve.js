module.exports = class Eleve {
    constructor(session, data, family) {
        this.type = "Élève";
        // Default values
        this.session = session;
        this.id = data.id;
        this.prenom = data.prenom;
        this.nom = data.nom;
        this.sexe = data.sexe;
        this.classe = data.classe
            ? data.classe.libelle
            : data.profile.classe.libelle;
        if (family) this.family = family;
    }

    // Fetch des notes de l'élève
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

    // Fetch du cahier de texte de l'élève
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
            this.emploiDuTemps = data.data;
            resolve(this.emploiDuTemps);
        });
    }

    async fetchVieScolaire() {
        return new Promise(async resolve => {
            const data = await this.session.request(
                "https://api.ecoledirecte.com/v3/eleves/" +
                    this.id +
                    "/viescolaire.awp?verbe=get&"
            );
            this.vieScolaire = data.data;
            resolve(this.vieScolaire);
        });
    }

    async fetchMessagerie() {
        return new Promise(async resolve => {
            const data = await this.session.request(
                "https://api.ecoledirecte.com/v3/eleves/" +
                    this.id +
                    "/messages.awp?verbe=getall&typeRecuperation=received&orderBy=date&order=desc&page=0&itemsPerPage=20&onlyRead=&query=&idClasseur=0"
            );
            this.messagerie = data.data;
            resolve(this.messagerie);
        });
    }
};
