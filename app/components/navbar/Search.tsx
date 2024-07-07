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
        py-1
        px-2
        rounded-full
        shadow-md
        hover:shadow-xl
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
        "
      >
        Find your happy place[s]
      </div>
      <div
        className="
          p-2
          bg-slate-800
          rounded-full
          text-white
          ml-2
        "
      >
        <BiSearch size={18} />
      </div>
    </div>
  );
};

export default Search;
