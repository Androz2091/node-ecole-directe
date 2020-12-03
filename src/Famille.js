const fetch = require("node-fetch");
const Eleve = require("./Eleve");
const Session = require("./Session");

module.exports = class Family {
    constructor(session, data) {
        this.session = session;
        this.data = data;
    }

    // Fetch les élèves
    fetch(token) {
        const elevesData = this.data.accounts[0].profile.eleves;
        this.eleves = elevesData.map(
            eleveData => new Eleve(this.session, eleveData, this)
        );
        return new Promise(async resolve => {
            const data = await this.session.request(
                "https://api.ecoledirecte.com/v3/contactetablissement.awp?verbe=get&",
                token
            );
            this.session.token = data.token;
            this.etablissement = data.data[0];
            resolve();
        });
    }
};
