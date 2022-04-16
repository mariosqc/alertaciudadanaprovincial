interface District<Polygon = google.maps.LatLngAltitude[]> {
  createdAt: string;
  id: string;
  name: string;
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
