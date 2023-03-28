import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Image,
  Button,
  background,
} from "@chakra-ui/react";
import { LogoutIcon, UserCircleIcon } from "@heroicons/react/solid";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";

export default function MenuComponent() {
  const router = useRouter();
  return (
    <>
      <Menu>
        <MenuButton as={Button} color="white" background="#80b500" >
          <p className="flex  gap-2  ">
            <UserCircleIcon className="h-5 w-5 " />
            <span>Profile</span>
          </p>
        </MenuButton>
        <MenuList>
          <MenuItem minH="20px" className="flex justify-between">
            <span className="text-lg">Admin</span>
            <span className="text-white mr-[12px] bg-[#80b500] w-8 h-8 flex justify-center items-center rounded-full">
              A
            </span>
          </MenuItem>
       
        </MenuList>
      </Menu>
    </>
  );
}
