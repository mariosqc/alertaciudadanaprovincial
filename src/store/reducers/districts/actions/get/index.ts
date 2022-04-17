import { adminDistrictRef } from "@/firebase";
import { District } from "@alerta-ciudadana/entity";
import { FnReducer } from "@alerta-ciudadana/redux";
import { createAsyncThunk } from "@reduxjs/toolkit";
import moment from "moment";
import { InitialState } from "../../districts.reducer";

export const getDistricts = createAsyncThunk("districts/getDistricts", async () => {
  adminDistrictRef.on("value", (snapshot) => {
    let districts = snapshot.val();

    districts = Object.keys(districts || {})
      .map((key: any) => ({
        id: key,
        ...districts[key],
        polygon: districts[key].polygon.map((path: string) =>
          /* Hacemos un split en el string para obtener las coordenadas y luego lo convertimos en un objecto */
          path.split(",").reduce((a, v, i) => ({ ...a, [i === 0 ? "lat" : "lng"]: Number(v) }), {})
        ),
      }))
      .sort((a: District, b: District) => moment(b.createdAt).diff(moment(a.createdAt)));

    console.log(districts);
  });
});

export const districtsReducers: FnReducer<InitialState, District[]> = {};
