interface Settings {
  app: AppSettings;
  map: MapSettings;
  phone: string;
}

interface AppSettings {
  version: number;
}

interface MapSettings {
  center: google.maps.LatLngAltitude;
  key: string;
}
