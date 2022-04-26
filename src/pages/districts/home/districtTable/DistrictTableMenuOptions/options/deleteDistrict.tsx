import { AlertDialog } from "@/components";
import { MenuItem } from "@chakra-ui/react";
import React, { FC, useState } from "react";
import { database } from "@/firebase";
import { District } from "@alerta-ciudadana/entity";

interface DeleteDistrictProps {
  district: District;
}

export const DeleteDistrict: FC<DeleteDistrictProps> = ({ district }) => {
  const [isOpen, setIsOpen] = useState(false);

  async function handleDelete() {
    await database.ref(`admin/districts/${district.id}`).remove();
    setIsOpen(false);
  }

  return (
    <div>
      <MenuItem onClick={() => setIsOpen(true)}>Eliminar</MenuItem>
      <AlertDialog
        isOpen={isOpen}
        title="Eliminar Distrito"
        btnPri={{
          colorSchema: "red",
          label: "Sí, Eliminar",
          onClick: handleDelete,
        }}
        btnSec={{
          label: "Cancelar",
          onClick: () => setIsOpen(false),
        }}
      />
    </div>
  );
};
