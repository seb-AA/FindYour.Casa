"use client";

import Container from "../Container";

import { TbBeach, TbMountain } from "react-icons/tb";
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
  GiAtom,
  GiFarmTractor,
} from "react-icons/gi";
import { FaSkiing } from "react-icons/fa";
import { BsSnow } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";
import { MdOutlineVilla, MdOutlineApartment } from "react-icons/md";
import CategoryBox from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";

import styles from "./Categories.module.css";

export const categories = [
  {
    label: "Beach",
    icon: <TbBeach />,
    description: "This property is close to the beach!",
  },
  {
    label: "Windmills",
    icon: <GiWindmill />,
    description: "This property has windmills!",
  },
  {
    label: "Modern",
    icon: <MdOutlineVilla />,
    description: "This property is modern!",
  },
  {
    label: "Countryside",
    icon: <TbMountain />,
    description: "This property is in the countryside!",
  },
  {
    label: "Islands",
    icon: <GiIsland />,
    description: "This property is on an island!",
  },
  {
    label: "Lake",
    icon: <GiBoatFishing />,
    description: "This property is near a lake!",
  },
  {
    label: "Skiing",
    icon: <FaSkiing />,
    description: "This property has skiing activities!",
  },
  {
    label: "Castles",
    icon: <GiCastle />,
    description: "This property is an ancient castle!",
  },
  {
    label: "Caves",
    icon: <GiCaveEntrance />,
    description: "This property is in a spooky cave!",
  },
  {
    label: "Camping",
    icon: <GiForestCamp />,
    description: "This property offers camping activities!",
  },
  {
    label: "Arctic",
    icon: <BsSnow />,
    description: "This property is in an arctic environment!",
  },
  {
    label: "Desert",
    icon: <GiCactus />,
    description: "This property is in the desert!",
  },
  {
    label: "Barns",
    icon: <GiBarn />,
    description: "This property is in a barn!",
  },
  {
    label: "Lux",
    icon: <IoDiamond />,
    description: "This property is brand new and luxurious!",
  },
  {
    label: "Apartment",
    icon: <MdOutlineApartment />,
    description: "This property is an apartment!",
  },
  {
    label: "Farm",
    icon: <GiFarmTractor />,
    description: "This property is a farm!",
  },
  {
    label: "Has it All",
    icon: <GiAtom  />,
    description: "This property has it all!",
  },
];

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();

  const isMainPage = pathname === "/";

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div
        className={`
        pt-4
        flex
        flex-row
        items-center
        justify-between
        overflow-x-auto
        ${styles.categories}
        `}
      >
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            icon={item.icon}
            selected={item.label === category}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
