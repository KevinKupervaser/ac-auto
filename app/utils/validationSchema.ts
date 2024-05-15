import * as Yup from "yup";
import categories from "./categories";
import fuel from "./fuels";
import transmition from "./transmitions";

// Custom validator function for file size (1MB limit)
const fileValidator = (file: File) => {
  if (!file) return true; // Optional field, so it's valid if not provided
  return file.size <= 1024 * 1024;
};

const commonSchema = {
  marca: Yup.string().required("Ingresa la Marca"),
  modelo: Yup.string().required("Ingresa el Modelo"),
  description: Yup.string().required("Ingresa una Descripción"),
  bulletPoints: Yup.array().of(Yup.string()),
  category: Yup.string()
    .required("Ingresa una Categoria")
    .oneOf(categories, "Categoria no valida"),
  images: Yup.array().of(
    Yup.mixed().test("fileSize", "La imagen debe pesar menos de 1MB", (file) =>
      fileValidator(file as File)
    )
  ),
  color: Yup.string().required("Ingresa un Color"),
  kilometros: Yup.number().required("Ingresa los Kilometros"),
  fuel: Yup.string()
    .required("Ingresa un Combustible")
    .oneOf(fuel, "Combustible no valida"),
  transmition: Yup.string()
    .required("Ingresa una Transmisión")
    .oneOf(transmition, "Transmisión no valida"),
  doors: Yup.number().required("Ingresa la Cantidad de Puertas"),
  engine: Yup.number().required("Ingresa el Cilindraje"),
  year: Yup.number().required("Ingresa el Año"),
};

// Define the validation schema
export const newProductInfoSchema = Yup.object().shape({
  ...commonSchema,
  thumbnail: Yup.mixed()
    .required("Ingresa una Imagen")
    .test("fileSize", "La imagen debe pesar menos de 1MB", (file) =>
      fileValidator(file as File)
    ),
});

export const updateProductInfoSchema = Yup.object().shape({
  ...commonSchema,
});
