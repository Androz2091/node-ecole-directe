const fetch = require("node-fetch");
const axios = require("axios");
const Eleve = require("./Eleve");
const Famille = require("./Famille");

module.exports = class Session {
    constructor() {}

    connexion(identifiant, motdepasse) {
        return new Promise(async (resolve, reject) => {
            const body = "data=" + JSON.stringify({identifiant,motdepasse})
            const res = await axios.post(
                "https://api.ecoledirecte.com/v3/login.awp", body
            );
            const data = await res.data
        try {
            if (!data.token) throw new Error(data.message);
        } catch (e) { console.error(e); return}
            const compte = data.data.accounts[0];
            this.typeCompte =
                (compte.typeCompte === "1" || compte.typeCompte === '2')
                    ? "Famille"
                    : compte.typeCompte === "E"
                    ? "Élève"
                    : null;
            switch (this.typeCompte) {
                case 'Famille':
                    const famille = new Famille(this, data.data);
                    await famille.fetch(data.token);
                    resolve(famille);
                    break;
                case 'Élève':
                    const eleve = new Eleve(this, compte);
                    this.token = data.token;
                    resolve(eleve);
                    break;
                default:
                    reject("This type of account isn't supported");
                    break;
            }
        })
    }

    async request(url, token, payload = {}) {
        return new Promise(async resolve => {
            const finalPayload = {
                ...payload,
                ...{ token: token || this.token }
            };
            const res = await axios.post(url, 
                "data=" + JSON.stringify(finalPayload));
            const data = await res.data
            resolve(data);
        });
    }
};
