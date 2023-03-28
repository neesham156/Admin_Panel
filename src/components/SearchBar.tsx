import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { SearchIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";

export default function SearchBar({
  setFilterData,
  filterData,
  data,
  link,
  page,
}: any) {
  const router = useRouter();

  const handlefilter = (value: any) => {
    value = value.toLowerCase();
    if (value.length > 0) {
      let arr = filterData.filter(
        (item: any) =>
          item?.title?.toLowerCase().includes(value) ||
          item?.product_code?.toLowerCase().includes(value) ||
          item?.name?.toLowerCase().includes(value) ||
          item?.firstName?.toLowerCase().includes(value) ||
          item?.email?.toLowerCase().includes(value) ||
          item?.phone?.toLowerCase().includes(value)
      );
      setFilterData(arr);
    } else {
      setFilterData(data);
    }
  };
  return (
    <>
      <div className="flex justify-between w-full bg-gray-500 p-5">
        <div className="shadow-sm w-9/12">
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<SearchIcon className="w-4 h-4  " />}
            />
            <Input
              className=" w-full"
              borderColor="black"
              backgroundColor="white"
   focusBorderColor="black"
              onChange={({ target }) => handlefilter(target.value)}
            />
          </InputGroup>
        </div>
        {link && (
          <div className="w-2/12">
            <button
              onClick={() => {
                router.push(link);
              }}
              className=" bg-white font-semibold outline-none text-xl py-2 px-4 transition-all duration-700 shadow-lg float-right text-black rounded-md  hover:bg-[#80b500] hover:text-white"
            >
              Add {page}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
