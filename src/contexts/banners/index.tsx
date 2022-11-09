import { FC, useState, useContext, useEffect, useMemo } from "react";

import Cookies from "universal-cookie";
import { v4 as uuidv4 } from "uuid";

import { Banner } from "@alerta-ciudadana/entity";
import { database, storage } from "@/firebase";
import { createContext } from "@/utils";

const cookies = new Cookies();

interface BannerContext {
  banners: Banner[];
  getBanners(): void;
  deleteBanner(banner: Banner): void;
  createBanner(banner: { title: string; file: File }): Promise<void>;
  updateBanner(banner: Banner): Promise<void>;
}

const BannerContext = createContext<BannerContext>();

const BannersProvider: FC = ({ children }) => {
  const [banners, setBanners] = useState<Banner[]>([]);

  const districtId = useMemo(() => cookies.get("district_id"), []);

  function getBanners() {
    database.ref(`district/${districtId}/slider`).on("value", (snapshot) => {
      let bannerSnapshot = snapshot.val();

      if (!bannerSnapshot) {
        return;
      }

      const banners = Object.entries(bannerSnapshot || {}).map(([key, value]: any) => ({
        id: key,
        url: value.url,
        title: value.title,
      }));
      setBanners(banners);
    });
  }

  async function createBanner({ title, file }: { title: string; file: File }) {
    const response = await storage.ref(`Banner/${uuidv4()}`).put(file);

    const url = `https://firebasestorage.googleapis.com/v0/b/alerta-ciudadana-provincial.appspot.com/o/${response.metadata.fullPath.replace(
      /\//,
      "%2F"
    )}?alt=media`;

    await database.ref(`district/${districtId}/slider`).push({ url, title });
  }

  async function updateBanner(banner: Banner) {
    const { id, ...rest } = banner;
    await database.ref(`district/${districtId}/slider/${banner.url}`).update(rest);
  }

  async function deleteBanner(banner: Banner) {
    await storage.ref(banner.url).delete();
    await database.ref(`district/${districtId}/slider/${banner.id}`).remove();
  }

  return (
    <BannerContext.Provider value={{ banners, getBanners, createBanner, updateBanner, deleteBanner }}>
      {children}
    </BannerContext.Provider>
  );
};

export const useBannerContext = () => useContext(BannerContext);

export default BannersProvider;
