export interface NewUserRequest {
  name: string;
  email: string;
  password: string;
}

export interface SessionUserProfile {
  id: string;
  email: string;
  name: string;
  role: "admin" | "user";
}

export interface SignInCredentials {
  email: string;
  password: string;
}

export interface NewProductInfo {
  marca: string;
  modelo: string;
  description: string;
  bulletPoints: string[];
  category: string;
  thumbnail?: File;
  images: File[];
  color: string;
  kilometros: number;
  fuel: string;
  transmition: string;
  doors: number;
  engine: string;
  year: number;
}

export interface ProductToUpdate {
  marca: string;
  modelo: string;
  description: string;
  bulletPoints: string[];
  category: string;
  thumbnail?: {
    url: string;
    id: string;
  };
  images?: {
    url: string;
    id: string;
  }[];
  color: string;
  kilometros: number;
  fuel: string;
  transmition: string;
  doors: number;
  engine: string;
  year: number;
}

export interface ProductResponse {
  id: string;
  marca: string;
  modelo: string;
  thumbnail: {
    url: string;
    id: string;
  };
  description: string;
  category: string;
  bulletPoints?: string[];
  images?: {
    url: string;
    id: string;
  }[];
  color: string;
  kilometros: number;
  fuel: string;
  transmition: string;
  doors: number;
  engine: string;
  year: number;
}
