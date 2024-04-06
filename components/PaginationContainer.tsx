"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Pagination } from "@mantine/core";

const PaginationContainer = ({ total }: { total: number }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleChange = (page: number) => {
    //Reason is searchParams are readonly so we need to create an instance
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());

    replace(`${pathname}?${params.toString()}`);
  };

  return <Pagination total={total} onChange={handleChange} />;
};

export default PaginationContainer;
