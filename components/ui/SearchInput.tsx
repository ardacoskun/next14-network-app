import { ChangeEvent, KeyboardEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

const SearchInput = () => {
  const [query, setQuery] = useState("");
  const { push } = useRouter();

  const handleSearch = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      const params = new URLSearchParams();
      params.set("query", query);
      push(`/dashboard/search?${params.toString()}`);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <TextInput
      rightSection={<IconSearch width={20} />}
      placeholder="Search"
      onKeyDown={handleSearch}
      value={query}
      onChange={handleChange}
    />
  );
};

export default SearchInput;
