export interface Collection {
  id: number;
  createdAt: Date;
  status: 'PENDING' | 'ACCEPTED' | 'COMPLETED' | 'CANCELLED';
  collectionAddress: string;
  city: string;
  notes?: string;
  weightInGrams: number;
  points?: number;
  wasteTypes: string[];
  photos?: string[];
  collectorId?: number;
  householdId: number;
}

export interface CollectionState {
  collections: Collection[];
  loading: boolean;
  error: string | null;
  selectedCollection: Collection | null;
}
