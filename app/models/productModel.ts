import mongoose, { Document, Model, Schema } from "mongoose";
import categories from "../utils/categories";
import fuels from "../utils/fuels";
import transmitions from "../utils/transmitions";

export interface NewProduct {
  marca: string;
  modelo: string;
  description: string;
  bulletPoints?: string[];
  thumbnail: { url: string; id: string };
  images?: { url: string; id: string }[];
  category: string;
  color: string;
  kilometros: number;
  fuel: string;
  transmition: string;
  doors: number;
  engine: string;
  year: number;
}

// Step 1: Define the interface for the document
export interface ProductDocument extends NewProduct, Document {}

// Step 2: Define the Mongoose schema
const productSchema = new Schema<ProductDocument>(
  {
    marca: { type: String, required: true },
    modelo: { type: String, required: true },
    description: { type: String, required: true },
    bulletPoints: { type: [String] },
    thumbnail: {
      type: {
        url: { type: String, required: true },
        id: { type: String, required: true },
      },
      required: true,
    },
    images: [
      {
        url: { type: String, required: true },
        id: { type: String, required: true },
      },
    ],
    category: { type: String, enum: [...categories], required: true },
    color: { type: String, required: true },
    kilometros: { type: Number, required: true },
    fuel: { type: String, enum: [...fuels], required: true },
    transmition: { type: String, enum: [...transmitions], required: true },
    doors: { type: Number, required: true },
    engine: { type: String, required: true },
    year: { type: Number, required: true },
  },
  { timestamps: true }
);

// Step 3: Check if the model already exists before exporting
const ProductModel =
  mongoose.models.Product ||
  mongoose.model<ProductDocument>("Product", productSchema);

export default ProductModel as Model<ProductDocument>;
