const fetch = require("node-fetch");
const Eleve = require("./Eleve");

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
            const account = data.data.accounts[0];
            if (account.typeCompte !== 'E') return reject('Account type not supported');
            const eleve = new Eleve(this, account);
            this.token = data.token;
            resolve(eleve);
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
