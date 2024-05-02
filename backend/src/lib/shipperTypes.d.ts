interface TripType {
  title: string;
  startLocation: string;
  endLocation: string;
  placedAt: string;
}

interface TripClassType {
  createTrip(): void;
  getTrip(id: string): TripType;
  updateTrip(id: string): void;
  deleteTrip(id: string): void;
}
