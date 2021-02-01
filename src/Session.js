const fetch = require("node-fetch");
const Eleve = require("./Eleve");
const Famille = require("./Famille");

module.exports = class Session {
    constructor() {}

    connexion(identifiant, motdepasse) {
        return new Promise(async (resolve, reject) => {
            const res = await fetch(
                "https://api.ecoledirecte.com/v3/login.awp",
                {
                    method: "POST",
                    body:
                        "data=" +
                        encodeURI(
                            JSON.stringify({
                                identifiant,
                                motdepasse
                            })
                        )
                }
            );
            const data = await res.json();
            if (!data.token) return reject("Invalid credentials");
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
        });
    }

    async request(url, token, payload = {}) {
        return new Promise(async resolve => {
            const finalPayload = {
                ...payload,
                ...{ token: token || this.token }
            };
            const res = await fetch(url, {
                method: "POST",
                body: "data=" + encodeURI(JSON.stringify(finalPayload))
            });
            const data = await res.json();
            resolve(data);
        });
    }
};
