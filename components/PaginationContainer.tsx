"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Pagination } from "@mantine/core";
import { useEffect, useState } from "react";

interface PaginationContainerProps {
  total: number;
  value: number;
}

const PaginationContainer = ({ total, value }: PaginationContainerProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [activePage, setActivePage] = useState(value);

  useEffect(() => {
    const page = searchParams.get("page");

    if (page) {
      const num = parseInt(page);
      setActivePage(num);
    }
  }, []);

  const handleChange = (page: number) => {
    setActivePage(page);
    //Reason is searchParams are readonly so we need to create an instance
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Pagination total={total} onChange={handleChange} value={activePage} />
  );
};

export default PaginationContainer;
