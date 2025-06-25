export interface Courrier {
  id: number;                 // "id": 1
  objet: string;              // "objet": "Demande congé"
  annotation: string;         // "annotation": "À traiter urgemment"
  date: string;               // "date": "2024-06-01"
  destinataire: string;       // "destinataire": "DRH"
  destinateurSource: string;  // "destinateurSource": "Employé"
  type: string;               // "type": "Interne"
  status: string;             // "status": "En attente"
  emmeteur: string;           // "emmeteur": "Maroua"
  fichier: string;            // "fichier": "conge.pdf"
  modifiedAt: string;         // "modifiedAt": "2025-06-23T18:37:15"
  createdAt: string;          // "createdAt": "2025-06-23T18:37:15"
  modiedBy: number;           // "modiedBy": 1
}
