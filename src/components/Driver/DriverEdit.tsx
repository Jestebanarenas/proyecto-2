import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDriver, updateDriver } from "../../api/driver.api";
import DriverForm from "./DriverForm";
import { DriverData } from "../../types/driver.type";

const DriverEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [defaultValues, setDefaultValues] = useState<Partial<DriverData>>();

  useEffect(() => {
    if (id) {
      getDriver(Number(id)).then(driver => setDefaultValues(driver));
    }
  }, [id]);

  return (
    <DriverForm
      defaultValues={defaultValues}
      onSubmit={async (data) => {
        if (id) {
          await updateDriver(Number(id), data);
          navigate("/drivers");
        }
      }}
    />
  );
};

export default DriverEditPage;