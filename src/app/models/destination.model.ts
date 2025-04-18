import { Activite } from "./activite.model";
export interface Destination {
    id: number;
    name: string;
    description: string;
    pays: string;
    imageUrl: string;
    activite: Activite;
  }
  