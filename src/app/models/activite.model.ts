import { Destination } from "./destination.model";

export interface Activite {
    id: number;
    name: string;
    description:string;
    imageUrl: string;
    destination: Destination [];
  }
  