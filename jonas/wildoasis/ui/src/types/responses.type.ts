interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface Cabin {
  _id: string;
  name: string;
  description: string;
  image: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
}

export interface Settings {
  _id: string;
  minBookingLength: number;
  maxBookingLength: number;
  maxGuestsPerBooking: number;
  breakfastPrice: number;
}

// API Requests
// Form data (data without _id for creation)
export type CabinFormData = Omit<Cabin, '_id'>;
export type SettingUpdateData = Partial<Omit<Settings, '_id'>>;

export interface UpdateSettingRequest {
  setting: keyof Omit<Settings, '_id'>;
  value: number;
}

// API Responses
export type CabinResponse = ApiResponse<Cabin[]>;
export type CabinSingleResponse = ApiResponse<Cabin>;
export type SettingResponse = ApiResponse<Settings>;
