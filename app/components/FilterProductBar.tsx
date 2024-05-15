"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Option, Select } from "@material-tailwind/react";
import { getCategoriesFromDatabase } from "../(admin)/products/action";

interface Props {
  rest: any;
}

const FilterProductBar = ({ rest }: Props) => {
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesFromDB = await getCategoriesFromDatabase(); // Fetch categories from MongoDB
        setAvailableCategories(categoriesFromDB);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="max-w-[300px] mx-auto mt-8">
      <Select
        label="Fabricante"
        {...rest}
        selected={(element) =>
          element &&
          React.cloneElement(element, {
            disabled: true,
            className:
              "flex items-center opacity-100 px-0 gap-2 pointer-events-none",
          })
        }
      >
        <Link href={`/`}>
          <Option value="all" key="all" className="bg-white">
            Todos los Fabricantes
          </Option>
        </Link>
        {availableCategories.map((c) => (
          <div key={c} className="bg-white">
            <Link href={`/fabricante/${c}`} key={c}>
              <Option value={c} key={c} className="bg-white">
                {c}
              </Option>
            </Link>
          </div>
        ))}
      </Select>
    </div>
  );
};

export default FilterProductBar;
