declare module 'node-ecole-directe' {
    export type TypeCompte = 'Elève' | 'Famille';
    export type Sexe = 'M' | 'F';
    export const version: string;
    export class Session {
        constructor();

        public typeCompte: TypeCompte;
        private token: string;

        public connexion(identifiant: string, motdepasse: string): Promise<Eleve|Famille>;
    }
    class Eleve {
        constructor(session: Session, data: any, family?: Famille);

        public session: Session;
        public data: any;
        public family?: Famille;

        public prenom: string;
        public nom: string;
        public sexe: Sexe;
        public etablissement: string;

        public fetchNotes (): Promise<unknown[]>;
        public fetchCahierDeTexte (): Promise<unknown[]>;
        public fetchCahierDeTexteJour (jour: string): Promise<unknown[]>;
        public fetchEmploiDuTemps (dateDebut: string, dateFin: string): Promise<unknown[]>;
        public fetchVieScolaire (): Promise<unknown[]>;
        public fetchMessagerie (): Promise<unknown[]>;
    }
    class Famille {
        constructor(session: Session, data: any);

        public session: Session;
        public data: any;
    }
}
