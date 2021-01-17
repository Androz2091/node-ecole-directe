const Eleve = require("./Eleve");

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
            resolve();
        });
    }
};
