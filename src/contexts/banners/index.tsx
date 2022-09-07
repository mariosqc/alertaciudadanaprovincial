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
  deleteBanner(id: string): void;
  createBanner(directory: { title: string; file: File }): Promise<void>;
  updateBanner(directory: Banner): Promise<void>;
}

const BannerContext = createContext<BannerContext>();

const BannersProvider: FC = ({ children }) => {
  const [banners, setBanners] = useState<Banner[]>([]);

  const districtId = useMemo(() => cookies.get("district_id"), []);

  function getBanners() {
    database.ref(`district/${districtId}/banner`).on("value", (snapshot) => {
      let bannerSnapshot = snapshot.val();

      if (!bannerSnapshot) {
        return;
      }

      const banners = Object.entries(bannerSnapshot || {}).map(([key, value]: any) => ({
        id: key,
        url: value.fullPath,
        title: value.title,
      }));
      setBanners(banners);
    });
  }

  async function createBanner({ title, file }: { title: string; file: File }) {
    const response = await storage.ref(`banners/${uuidv4()}`).put(file);

    await database.ref(`district/${districtId}/banner`).push({
      fullPath: response.metadata.fullPath,
      title,
    });
  }

  async function updateBanner(directory: Banner) {
    const { id, ...rest } = directory;
    await database.ref(`district/${districtId}/directory/${id}`).update(rest);
  }

  async function deleteBanner(id: string) {
    await database.ref(`district/${districtId}/directory/${id}`).remove();
  }

  return (
    <BannerContext.Provider value={{ banners, getBanners, createBanner, updateBanner, deleteBanner }}>
      {children}
    </BannerContext.Provider>
  );
};

export const useBannerContext = () => useContext(BannerContext);

export default BannersProvider;
