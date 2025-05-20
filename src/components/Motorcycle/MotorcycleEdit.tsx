import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMotorcycle, updateMotorcycle } from "../../api/motorcycle.api";
import MotorcycleForm from "./MotorcycleForm";
import { MotorcycleData } from "../../types/Motorcycle.type";

const MotorcycleEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [defaultValues, setDefaultValues] = useState<Partial<MotorcycleData>>();

  useEffect(() => {
    if (id) {
      getMotorcycle(Number(id)).then(setDefaultValues);
    }
  }, [id]);

  return (
    <MotorcycleForm
      defaultValues={defaultValues}
      onSubmit={async (data) => {
        if (id) {
          await updateMotorcycle(Number(id), data);
          navigate("/motorcycles");
        }
      }}
    />
  );
};

export default MotorcycleEditPage;