"use client";

import { IconType } from "react-icons";

interface MenuItemProps {
  onClick: () => void;
  label: string;
  icon?: IconType;
}

const MenuItem: React.FC<MenuItemProps> = ({ onClick, label, icon: Icon }) => {
  return (
    <div
      onClick={onClick}
      className="
        flex
        items-center
        px-4
        py-3
        hover:bg-neutral-100
        transition
        font-semibold
        cursor-pointer
      "
    >
      {Icon && <Icon className="mr-2" />} {/* Render the icon if it exists */}
      {label}
    </div>
  );
};

export default MenuItem;
