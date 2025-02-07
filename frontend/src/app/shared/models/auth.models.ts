export interface AuthRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  userType: 'ADMIN' | 'COLLECTOR' | 'INDIVIDUAL';
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
  phone: string;
  dateOfBirth: Date;
  street: string;
  city: string;
  country: string;
  zipCode: string;
}
