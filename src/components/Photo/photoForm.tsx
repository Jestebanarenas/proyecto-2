import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { PhotoData } from "../../types/photo.types";

interface Props {
  onSubmit: (data: PhotoData & { file?: File }) => void;
  loading?: boolean;
  defaultValues?: Partial<PhotoData>;
}

const PhotoForm: React.FC<Props> = ({ onSubmit, loading, defaultValues }) => {
  const { register, handleSubmit, setValue, formState: { errors }, watch } = useForm<PhotoData & { file?: File }>({
    defaultValues,
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Si el usuario selecciona un archivo, borra la URL
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("file", file);
      setValue("image_url", ""); // Borra la URL si hay archivo
    }
  };

  // Si el usuario escribe una URL, borra el archivo
  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue("image_url", e.target.value);
    setValue("file", undefined);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const file = watch("file");
  const imageUrl = watch("image_url");

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Imagen (URL):</label>
      <input
        {...register("image_url")}
        value={imageUrl || ""}
        onChange={handleUrlChange}
        placeholder="https://..."
        disabled={!!file}
      />

      <label>O selecciona una imagen:</label>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        disabled={!!imageUrl}
      />

      {(!imageUrl && !file) && <span>Debes ingresar una URL o seleccionar un archivo</span>}

      <label>Descripción:</label>
      <input {...register("caption")} />

      <label>ID de Incidencia:</label>
      <input type="number" {...register("issue_id", { required: true, valueAsNumber: true })} />
      {errors.issue_id && <span>El ID de incidencia es obligatorio</span>}

      <button type="submit" disabled={loading || (!imageUrl && !file)}>
        {loading ? "Guardando..." : "Guardar"}
      </button>
    </form>
  );
};

export default PhotoForm;