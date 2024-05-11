namespace core {
  type Role = ["ADMIN", "DRIVER", "SHIPPER", "DISPATCHER"];

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
}
