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
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  userType: 'ADMIN' | 'COLLECTOR' | 'HOUSEHOLD';  
  token: string;                                  
  tokenType: string;
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
