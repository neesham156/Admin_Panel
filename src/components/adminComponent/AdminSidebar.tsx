import {
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Input,
  Divider,
} from "@chakra-ui/react";
import {
  MenuIcon,
  HomeIcon,
  UserIcon,
  UsersIcon,
  ShoppingBagIcon,
} from "@heroicons/react/solid";
import { useRouter } from "next/router";
import React from "react";

export default function AdminSidebar() {
  const router = useRouter();
  const { isOpen, onOpen, onClose }: any = useDisclosure();
  const btnRef: any = React.useRef();
  return (
    <>
      <p className="text-3xl" ref={btnRef} onClick={onOpen}>
        <MenuIcon className="h-12 w-12 cursor-pointer " />
      </p>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton css={{background:"#80b500" ,color:"white" ,outline:"none"}} />
          <DrawerHeader>

            <p className="text-3xl text-[#80b500]   px-5  font-semibold">
        Task-2
            </p>
          </DrawerHeader>
          <Divider />

          <DrawerBody className="cursor-pointer  ">
            <p
              className={`flex items-center hover:font-semibold  ${
                router.pathname == "/admin/dashboard" &&
                "border-b-[3px] border-[#80b500] text-[#80b500]"
              }`}
              onClick={() => {
                router.push("/admin/dashboard");
                onClose(false);
              }}
            >

             <span className="rounded-full bg-[#80b500] text-white p-1"> <HomeIcon className="h-5 w-5" /></span>
              <span className="text-lg py-3 px-4">DashBoard</span>
            </p>
            <Divider />
            <p
              className={`flex items-center hover:font-semibold  ${
                router.pathname.includes("/admin/customer") &&
                "border-b-[3px] border-[#80b500] text-[#80b500]"
              }`}
              onClick={() => {
                router.push("/admin/customer");
                onClose(false);
              }}
            >
            <span className="rounded-full bg-[#80b500] text-white p-1">   <UserIcon className="h-5 w-5" /></span>
              <span className="text-lg py-3 px-4">Customer</span>
            </p>
            <Divider />
            <p
              className={`flex items-center hover:font-semibold  ${
                router.pathname.includes("/admin/booking") &&
                "border-b-[3px] border-[#80b500] text-[#80b500]"
              }`}
              onClick={() => {
                router.push("/admin/booking");
                onClose(false);
              }}
            >
           <span className="rounded-full bg-[#80b500] text-white p-1">    <UsersIcon className="h-5 w-5" /></span>
              <span className="text-xl py-3 px-4">Booking</span>
            </p>
            <Divider />
                    </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
