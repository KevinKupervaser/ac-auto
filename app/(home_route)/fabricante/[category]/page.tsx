import BannerSlider from "@/app/components/BannerSlider";
import FilterProductBar from "@/app/components/FilterProductBar";
import GridView from "@/app/components/GridView";
import MasonryGridGallery from "@/app/components/MasonryGridGallery";
import ProductCard from "@/app/components/ProductCard";
// import ProductList from "@/app/components/ProductList";
import startDb from "@/app/lib/db";
import ProductModel from "@/app/models/productModel";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { CircleLoader } from "react-spinners";

// deployment
export const dynamic = "force-dynamic";

interface LatestProduct {
  id: string;
  marca: string;
  modelo: string;
  description: string;
  category: string;
  thumbnail: string;
  year: number;
  engine: string;
  doors: number;
  transmition: string;
  fuel: string;
  kilometros: number;
}

const fetchByCategory = async (category: string) => {
  try {
    await startDb();
    const products = await ProductModel.find({ category })
      // .sort("-createdAt")
      .limit(20)
      .maxTimeMS(30000);

    if (!products || products.length === 0) {
      // If no products found, redirect to 404 page
      return redirect("/404");
    }

    const productList = products.map((product) => {
      // Check if product.thumbnail exists and has a url property
      const thumbnailUrl =
        product.thumbnail && product.thumbnail.url
          ? product.thumbnail.url
          : null;

      return {
        id: product._id.toString(),
        marca: product.marca,
        description: product.description,
        category: product.category,
        thumbnail: thumbnailUrl, // Assign thumbnailUrl or an empty string if thumbnail is not available
        year: product.year,
        fuel: product.fuel,
        transmition: product.transmition,
        doors: product.doors,
        engine: product.engine,
        modelo: product.modelo,
        kilometros: product.kilometros,
      };
    });

    return JSON.stringify(productList);
  } catch (error) {
    // Handle the error gracefully, for example, returning an error message
    return JSON.stringify({ error: "Failed to fetch latest products" });
  }
};

interface Props {
  params: {
    category: string;
  };
}

export default async function ProductByCategory({ params }: Props) {
  const product = await fetchByCategory(decodeURIComponent(params.category));
  const parsedProducts = JSON.parse(product) as LatestProduct[];

  //   console.log(decodeURIComponent(params.category));

  const products = Object.values(parsedProducts);

  return (
    <div>
      <FilterProductBar rest={{}} />
      <Suspense
        fallback={
          <div className="flex justify-center">
            <CircleLoader color="#36d7b7" />
          </div>
        }
      >
        <div className="py-4 space-y-4">
          {parsedProducts.length ? (
            <GridView>
              {products.map((product) => {
                return (
                  <ProductCard key={product.id} product={product} rest={{}} />
                );
              })}
            </GridView>
          ) : (
            <h1 className="text-center">No hay autos de esta marca</h1>
          )}
        </div>
      </Suspense>
    </div>
  );
}
