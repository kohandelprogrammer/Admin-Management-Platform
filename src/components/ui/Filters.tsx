import React, { useEffect, useState, type ReactNode } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { useSearchParams } from "react-router-dom";

type Props<T> = {
  filterItems?: T[];
  inputPlaceholder?: string;
  filterName: string;
  category?: string;
  sort?: string;
  order?: string;
};

const sortItems = [
  {
    id: "1",
    name: "title",
  },
  {
    id: "2",
    name: "price",
  },
  {
    id: "3",
    name: "rating",
  },
  {
    id: "4",
    name: "stock",
  },
  {
    id: "5",
    name: "brand",
  },
];

export default function Filters<T>({
  inputPlaceholder,
  filterItems,
  filterName,
  category,
  sort,
  order,
}: Props<T>) {
  console.log(order, category, sort);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    category,
  );
  const [selectedOrder, setSelectedOrder] = useState<string | undefined>(order);
  const [selectedSort, setSelectedSort] = useState<string | undefined>(sort);

  const [, setSearchParams] = useSearchParams();
  const debouncedQuery = useDebounce(searchTerm);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const onSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.currentTarget.value;

    setSelectedSort(value);

    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);

      params.set("sortBy", value);
      params.set("page", "1");

      return params;
    });
  };

  const onOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.currentTarget.value;

    setSelectedOrder(value);

    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);

      params.set("order", value);
      params.set("page", "1");

      return params;
    });
  };

  const onFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.currentTarget.value;

    setSelectedCategory(value);

    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);

      params.set("category", value);
      params.set("page", "1");

      return params;
    });
  };

  useEffect(() => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      if (debouncedQuery) {
        params.set("search", debouncedQuery);
      } else {
        params.delete("search");
      }

      params.set("page", "1");

      return params;
    });
  }, [debouncedQuery]);

  return (
    <div className="filter">
      <div className="filter-box">
        <label htmlFor="search">Search</label>
        <input
          type="text"
          id="search"
          value={searchTerm}
          placeholder={inputPlaceholder ?? "search here ..."}
          onChange={handleChange}
        />
      </div>

      <div className="filter-box">
        <label htmlFor={filterName}>{filterName}</label>
        <select
          id={filterName}
          value={selectedCategory}
          onChange={onFilterChange}
        >
          <option value="all">ؤll</option>

          {filterItems?.map((category: T, index: number) => (
            <option
              key={`${category} index-${index}`}
              value={category as string}
            >
              {category as ReactNode}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-box">
        <label htmlFor="sortBy">sort by</label>
        <select id="sortBy" value={selectedSort} onChange={onSortChange}>
          <option value="">Sort by...</option>

          {sortItems?.map((sortItem) => (
            <option key={sortItem.id} value={sortItem.name}>
              {sortItem.name}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-box">
        <label htmlFor="order">order</label>
        <select id="order" value={selectedOrder} onChange={onOrderChange}>
          <option value="asc">asc</option>
          <option value="desc">desc</option>
        </select>
      </div>
    </div>
  );
}
