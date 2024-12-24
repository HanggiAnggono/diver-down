export interface Brand {
  id: string; // Consider using UUID for unique IDs
  name: string;
  description?: string; // Optional description
  imageUrl?: string; // Optional base image URL for the brand image
}

export interface Model {
  id: string; // Consider using UUID for unique IDs
  name: string;
  brandId: string; // Foreign key referencing Brand.id
  brand: Brand;
  description?: string; // Optional description
  imageUrl?: string; // Optional base image URL for the model image
  specs: {
    engineType: string;
    engineCapacity: number;
    transmissionType: string;
    driveType: string;
    fuelType: string;
    seats: number;
    doors: number;
    length: number;
    width: number;
    height: number;
    wheelbase: number;
    curbWeight: number;
    grossWeight: number;
    fuelCapacity: number;
    topSpeed: number;
    acceleration: string;
    torque: string;
    horsepower: string;
  };
}

export interface Unit {
  id: string; // Consider using UUID for unique IDs
  unitNumber: string; // Unique identifier within a model
  modelId: string; // Foreign key referencing Model.id
  model: Model;
  year: number;
  availability: boolean; // Indicates if the unit is available for booking
  imageUrl?: string; // Optional URL for the unit image
  location: string; // Foreign key referencing Location.id
  color?: string;
}

export interface User {
  id: string; // Consider using UUID for unique IDs
  name: string;
  // Add other relevant user information like email, phone number, etc.
}

export interface TestDrive {
  id: string; // Consider using UUID for unique IDs
  unitId: string; // Foreign key referencing Unit.id
  userId: string; // Foreign key referencing User.id
  dateFrom: Date;
  dateTo: Date;
  status: TestDriveStatus;
  testDriveTypeId: string; // Foreign key referencing TestDriveType.id
  locationId: string; // Foreign key referencing Location.id
  notes?: string; // Optional additional notes
  salesRepId?: string; // Optional foreign key referencing SalesRep.id
}

export enum TestDriveStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  NO_SHOW = 'NO_SHOW',
}

export interface SalesRep {
  id: string; // Consider using UUID for unique IDs
  name: string;
  // Add other relevant sales rep information
}
