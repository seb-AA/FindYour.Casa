"use client";

import { ReactNode } from "react";

interface CategoryInputProps {
  icon: ReactNode;
  label: string;
  selected: boolean;
  onClick: (value: string) => void;
}

const CategoryInput: React.FC<CategoryInputProps> = ({
  icon,
  label,
  selected,
  onClick,
}) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={`
        rounded-xl
        border-2
        p-4
        flex
        flex-col
        gap-3
        hover:border-neutral-500
        transition
        cursor-pointer
        ${selected ? "border-neutral-500" : "border-neutral-200"}
      `}
    >
      <div className="icon-container">{icon}</div>
      <div className="text-sm font-semibold">{label}</div>
    </div>
  );
};

export default CategoryInput;
