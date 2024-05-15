import UpdateProduct from "@/app/components/UpdateProduct";
import startDb from "@/app/lib/db";
import ProductModel from "@/app/models/productModel";
import { isValidObjectId } from "mongoose";
import { redirect } from "next/navigation";
import React from "react";
import { ProductResponse } from "@/app/types";

interface Props {
  params: {
    productId: string;
  };
}

const fetchProductInfo = async (productId: string): Promise<string> => {
  if (!isValidObjectId(productId)) return redirect("/404");

  await startDb();
  const product = await ProductModel.findById(productId);
  if (!product) return redirect("/404");

  const finalProduct: ProductResponse = {
    id: product._id.toString(),
    marca: product.marca,
    modelo: product.modelo,
    description: product.description,
    bulletPoints: product.bulletPoints,
    images: product.images?.map(({ url, id }) => ({ url, id })),
    thumbnail: product.thumbnail,
    category: product.category,
    color: product.color,
    kilometros: product.kilometros,
    fuel: product.fuel,
    transmition: product.transmition,
    doors: product.doors,
    engine: product.engine,
    year: product.year,
  };

  return JSON.stringify(finalProduct);
};

export default async function UpdatePage(props: Props) {
  const { productId } = props.params;
  const product = await JSON.parse(await fetchProductInfo(productId));

  // const productInfo = JSON.parse(await fetchProduct(productId));

  return <UpdateProduct product={product} />;
}
