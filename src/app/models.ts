
export interface Trip {
  tripId: string;
  driverId: string;
  driverName: string;
}

export interface Submission {
  tripId: string;
  rating: number;
  onTime: boolean;
  comment?: string;
  cabClean?: boolean;
}

export interface DriverStats {
  driverId: string;
  driverName: string;
  tripCount: number;
  ratingCount: number;
  averageRating: number | null;
}