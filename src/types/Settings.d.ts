interface Settings {
  app: AppSettings;
  map: MapSettings;
}

interface AppSettings {
  version: string;
  phone: string;
}

interface MapSettings {
  center: google.maps.LatLngAltitude;
  key: string;
}
