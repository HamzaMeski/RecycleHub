import { WasteType } from './enums';

export interface CollectionRequestDTO {
  collectionAddress: string;
  city: string;
  wasteTypes: WasteType[];
  weightInGrams: number;
  notes?: string;
}

export interface Collection extends CollectionRequestDTO {
  id: number;
  status: string;
  points?: number;
  createdAt: string;
  updatedAt: string;
  householdId: number;
  collectorId?: number;
}

// Auth related interfaces
export interface AuthRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  userType: string;  // ADMIN, COLLECTOR, or HOUSEHOLD
  userId: number;
  email: string;
  firstName: string;
  lastName: string;
}

export interface HouseHoldRegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  city: string;
}
