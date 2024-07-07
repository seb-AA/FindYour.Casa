"use client";

import useSearchModal from "@/app/hooks/useSearchModal";
import { BiSearch } from "react-icons/bi";

const Search = () => {
  const searchModal = useSearchModal();

  return (
    <div
      onClick={searchModal.onOpen}
      className="
        border-[1px]
        w-full
        md:w-auto
        py-2  
        rounded-full
        shadow-sm
        hover:shadow-md
        transition
        cursor-pointer
        flex
        items-center
        justify-center
      "
    >
      <div
        className="
          text-sm
          font-semibold
          flex
          items-center
          justify-center
          p-6
        "
      >
        Find your happy place..(s)...
      </div>
      <div
        className="
          p-6
          bg-slate-500
          rounded-full
          text-white
          ml-4
        "
      >
        <BiSearch size={18} />
      </div>
    </div>
  );
};

export default Search;
