const fetch = require("node-fetch");
const request = require("request");
const Eleve = require("./Eleve");
const Famille = require("./Famille");

module.exports = class Session {
  constructor() {}

  async connexion(identifiant, motdepasse) {
    await request(
      {
        method: "POST",
        url: "https://api.ecoledirecte.com/v3/login.awp",
        headers: {
          "user-agent":
            "Mozilla/5.0 (X11; Linux x86_64; rv:77.0) Gecko/20100101 Firefox/77.0",
        },
        body:
          "data=" +
          encodeURI(
            JSON.stringify({
              identifiant,
              motdepasse,
            })
          ),
      },
      (err, httpResponse, body) => {
        if (err) {
          return console.error("error:", err);
        }
      }
    );
    // new Promise(async (resolve, reject) => {
    //     XMLHttpRequest
    //   console.log("test");
    //   fetch("https://api.ecoledirecte.com/v3/login.awp", {
    //     method: "POST",
    //     body:
    //       "data=" +
    //       encodeURI(
    //         JSON.stringify({
    //           identifiant,
    //           motdepasse,
    //         })
    //       ),
    //   }).then(function(data) {
    //     console.log(data);
    //     // const data = await dataJSON.json();
    //     if (!data.token) return reject("Invalid Credentials.");
    //     const compte = data.data.accounts[0];
    //     this.typeCompte =
    //       compte.typeCompte === "1" || compte.typeCompte === "2"
    //         ? "Famille"
    //         : compte.typeCompte === "E"
    //         ? "Élève"
    //         : null;
    //     switch (this.typeCompte) {
    //       case "Famille":
    //         const famille = new Famille(this, data.data);
    //         famille.fetch(data.token);
    //         resolve(famille);
    //         break;
    //       case "Élève":
    //         const eleve = new Eleve(this, compte);
    //         this.token = data.token;
    //         resolve(eleve);
    //         break;
    //       default:
    //         reject("This type of account isn't supported");
    //         break;
    //     }
    //   });
    // });
  }

  async request(url, token, payload = {}) {
    return new Promise(async (resolve) => {
      const finalPayload = {
        ...payload,
        ...{ token: token || this.token },
      };
      const res = await fetch(url, {
        method: "POST",
        body: "data=" + encodeURI(JSON.stringify(finalPayload)),
      });
      const data = await res.json();
      resolve(data);
    });
  }
};
