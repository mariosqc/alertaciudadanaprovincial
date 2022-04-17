declare module "@alerta-ciudadana/entity" {
  interface District<Polygon = google.maps.LatLngAltitude[]> {
    createdAt: string;
    id: string;
    name: string;
    area: number;
    polygon: Polygon;
    user: DistrictUser;
  }

  interface DistrictUser {
    name: string;
    credentials: Credentials;
  }

  interface Credentials {
    username: string;
    password: string;
  }
}
