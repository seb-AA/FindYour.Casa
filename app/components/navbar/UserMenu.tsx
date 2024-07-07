"use client";

import { AiOutlineMenu, AiOutlinePlus } from "react-icons/ai";
import { useCallback, useState } from "react";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRentModal from "@/app/hooks/useRentModal";
import { useRouter } from "next/navigation";

interface UserMenuProps {
  currentUser?: User | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const toggleOpen = useCallback(() => setIsOpen((prev) => !prev), []);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    rentModal.onOpen();
  }, [currentUser, loginModal, rentModal]);

  return (
    <div>
      <div className="relative">
        <div className="flex flex-row items-center gap-3">
          <div
            onClick={onRent}
            className="
              hidden
              md:flex
              flex-row
              items-center
              text-sm
              font-semibold
              py-2
              px-4
              rounded-full
              hover:bg-neutral-100
              transition
              cursor-pointer
            "
          >
            <AiOutlinePlus className="mr-1" />
            Add a Property
          </div>
          <div
            onClick={toggleOpen}
            className="
              p-2
              md:py-2
              md:px-3
              border-[1px]
              border-neutral-200
              flex
              flex-row
              items-center
              gap-3
              rounded-md
              cursor-pointer
              hover:shadow-xl
              shadow-md
              transition
            "
          >
            <AiOutlineMenu />
          </div>
        </div>
        {isOpen && (
          <div
            className="
            absolute
            rounded-xl
            shadow-md
            w-[80vw]
            md:w-3/4
            bg-white
            overflow-hidden
            right-0
            top-12
            text-sm
          "
          >
            <div className="flex flex-col cursor-pointer">
              {currentUser ? (
                <>
                  <MenuItem
                    onClick={() => router.push("/trips")}
                    label="Explorer"
                  />
                  <MenuItem
                    onClick={() => router.push("/favorites")}
                    label="My Favorites"
                  />
                  {/*<MenuItem
                    onClick={() => router.push("/reservations")}
                    label="My reservations"
                  />*/}
                  <MenuItem
                    onClick={() => router.push("/properties")}
                    label="Properties"
                  />
                  <MenuItem onClick={rentModal.onOpen} label="Add a Property" />
                  <hr />
                  <MenuItem onClick={() => signOut()} label="Logout" />
                </>
              ) : (
                <>
                  <MenuItem onClick={loginModal.onOpen} label="Login" />
                  <MenuItem onClick={registerModal.onOpen} label="Sign up" />
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserMenu;
