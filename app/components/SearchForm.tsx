import { Input } from "@material-tailwind/react";
import React, { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

interface Props {
  rest: any;
}

export default function SearchForm({ rest }: Props) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!query) return;
        router.push(`/products/search?query=${query}`);
      }}
      className="w-full md:w-72"
    >
      <Input
        label="Buscar"
        icon={
          <button>
            <MagnifyingGlassIcon className="h-5 w-5" />
          </button>
        }
        value={query}
        onChange={({ target }) => setQuery(target.value)}
        {...rest}
      />
    </form>
  );
}
