import React, { useCallback, useMemo } from "react";

import { useDropzone } from "react-dropzone";

import { v4 as uuidv4 } from "uuid";

import { Button } from "@/components";
import { database, storage } from "@/firebase";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const UploadBanner = () => {
  const districtId = useMemo(() => cookies.get("district_id"), []);

  const onDrop = useCallback(([acceptedFile]) => {
    uploadToFirestore(acceptedFile);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpg", ".jpeg"] },
    multiple: false,
  });

  async function uploadToFirestore(file: File) {
    const response = await storage.ref(`banner/${uuidv4()}`).put(file);

    await database.ref(`district/${districtId}/banner`).push({
      fullPath: response.metadata.fullPath,
    });
  }

  return (
    <div>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <Button colorScheme="pri">Agregar</Button>
      </div>
    </div>
  );
};
