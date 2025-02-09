import { CollectionRequestDTO } from './collection.model';

export interface Collection extends CollectionRequestDTO {
  points?: number;
}

export interface CollectionState {
  collections: Collection[];
  loading: boolean;
  error: string | null;
  selectedCollection: Collection | null;
}
