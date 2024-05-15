import ProductView from "@/app/components/ProductView";
import startDb from "@/app/lib/db";
import ProductModel from "@/app/models/productModel";
import { isValidObjectId } from "mongoose";
import { redirect } from "next/navigation";
import React from "react";

interface Props {
  params: {
    product: string[];
  };
}

const fetchProduct = async (productId: string) => {
  if (!isValidObjectId(productId)) return redirect("/404");

  await startDb();
  const product = await ProductModel.findById(productId);
  if (!product) return redirect("/404");

  return JSON.stringify({
    id: product._id.toString(),
    marca: product.marca,
    modelo: product.modelo,
    description: product.description,
    thumbnail: product.thumbnail.url,
    images: product.images?.map(({ url }) => url),
    bulletpoints: product.bulletPoints,
    category: product.category,
    color: product.color,
    kilometros: product.kilometros,
    fuel: product.fuel,
    transmition: product.transmition,
    doors: product.doors,
    engine: product.engine,
    year: product.year,
  });
};

const Product = async ({ params }: Props) => {
  const { product } = params;
  const productId = product[product.length - 1];
  const productInfo = JSON.parse(await fetchProduct(productId));

  let productImages = [productInfo.thumbnail];
  if (productImages) {
    productImages = productImages.concat(productInfo.images);
  }

  return (
    <div className="p-4">
      <ProductView
        marca={productInfo.marca}
        description={productInfo.description}
        images={productImages}
        points={productInfo.bulletpoints}
        category={productInfo.category}
        modelo={productInfo.modelo}
      />
    </div>
  );
};

export default Product;
