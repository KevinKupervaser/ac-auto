import ProductTable from "@/app/components/ProductTable";
import startDb from "@/app/lib/db";
import ProductModel from "@/app/models/productModel";
import React from "react";

interface Props {
  searchParams: { query: string };
}

const searchProducts = async (query: string) => {
  await startDb();
  const products = await ProductModel.find({
    $or: [
      { marca: { $regex: query, $options: "i" } },
      { modelo: { $regex: query, $options: "i" } },
    ],
  });

  const results = products.map((product) => {
    return {
      id: product._id.toString(),
      marca: product.marca,
      modelo: product.modelo,
      thumbnail: product.thumbnail.url,
      description: product.description,
      category: product.category,
      color: product.color,
      kilometros: product.kilometros,
      fuel: product.fuel,
      transmition: product.transmition,
      doors: product.doors,
      engine: product.engine,
      year: product.year,
    };
  });

  return JSON.stringify(results);
};

const AdminSearch = async ({ searchParams }: Props) => {
  const { query } = searchParams;
  const results = JSON.parse(await searchProducts(query));

  return (
    <div>
      <ProductTable
        products={results}
        showPageNavigator={false}
        currentPageNo={0}
        rest={{}}
      />
    </div>
  );
};

export default AdminSearch;
