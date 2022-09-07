import React, { useEffect } from "react";

import { Card } from "@/layout";
import { WrapperPage } from "@/templates";

import { BannerModal } from "./BannerModal";
import { useBannerContext } from "@/contexts";

export const BannersPage = () => {
  const { getBanners, banners } = useBannerContext();
  useEffect(() => {
    getBanners();
  }, []);

  return (
    <div>
      <WrapperPage title="Banners" breadcrumb={{ routes: ["directories"] }}>
        <Card.Wrapper colSpan={12}>
          <Card.Header
            title="Listado de banners"
            subtitle={`${10} Resultados encontrados`}
            optionsRight={[<BannerModal key="0" />]}
          />
          <Card.Container>dsad</Card.Container>
        </Card.Wrapper>
      </WrapperPage>
    </div>
  );
};
