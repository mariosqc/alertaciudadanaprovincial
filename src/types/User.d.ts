declare module "@alerta-ciudadana/entity" {
  interface User {
    access: boolean;
    avatarUrl: string;
    date: string;
    email: string;
    imei: string;
    name: string;
    phone: string;
    points: number;
    sex: string;
    timestamp: number;
    token: string;
    uid: string;
  }
}
