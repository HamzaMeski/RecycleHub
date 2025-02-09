import { WasteType } from '../enums/waste-type.enum';

export interface CollectionRequestDTO {
  id?: number;
  wasteTypes: WasteType[];
  photos?: string[];
  weightInGrams: number;
  collectionAddress: string;
  city: string;
  notes?: string;
  status?: string;
  householdId?: number;
  collectorId?: number;
  actualWeightInGrams?: number;
  collectionPhotos?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}
