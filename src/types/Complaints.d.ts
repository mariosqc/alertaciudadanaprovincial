declare module "@alerta-ciudadana/entity" {
  interface Complaint {
    id: string;
    userId: string;
    avatarUrl: string;
    coordinates: [number, number];
    date: string;
    message: string;
    phone: string;
    place: string;
    status: string;
    timestamp: string;
    token: string;
    user: string;
    description: string;
    type: string;
  }
}
