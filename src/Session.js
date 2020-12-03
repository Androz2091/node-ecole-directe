const fetch = require("node-fetch");
const Eleve = require("./Eleve");
const Family = require("./Famille");

module.exports = class Session {
    constructor() {}

    connexion(identifiant, motdepasse) {
        return new Promise(async (resolve, reject) => {
            const res = await fetch(
                "https://api.ecoledirecte.com/v3/login.awp",
                {
                    method: "POST",
                    headers: this.headers,
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
            if (data.message === "Identifiant et/ou mot de passe invalide !") return reject("Invalid credentials");
            const compte = data.data.accounts[0];
            this.typeCompte =
                compte.typeCompte === "1"
                    ? "Famille"
                    : compte.typeCompte === "E"
                    ? "Élève"
                    : null;
            switch (typeCompte) {
                case 'Famille':
                    const famille = new Famille(this, data.data);
                    await famille.fetch(data.token);
                    resolve(famille);
                    break;
                case 'Élève':
                    const eleve = new Eleve(this, account);
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
                headers: this.headers,
                body: "data=" + encodeURI(JSON.stringify(finalPayload))
            });
            const data = await res.json();
            resolve(data);
        });
    }
};
