declare module "@alerta-ciudadana/entity" {
  interface Emergency {
    date: string;
    emergency: string;
    phone: string;
    place: string;
    status: string;
    timestamp: string;
    token: string;
    user: string;
    video: string;
    coor: [number, number];
  }
}
