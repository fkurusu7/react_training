export interface CabinResponse {
  success: boolean;
  data: Cabin[] | undefined;
  message: string;
}

export interface CabinFormData {
  name: string;
  description: string;
  image: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
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

/* 
{
  "_id": "68534333027ac8c642329b2e",
  "name": "113",
  "description": "luxory cabin113",
  "image": "url to image 113",
  "maxCapacity": 12,
  "regularPrice": 1100,
  "discount": 15,
  "createdAt": "2025-06-18T22:52:35.031Z",
  "updatedAt": "2025-06-18T22:52:35.031Z",
  "__v": 0
} */
