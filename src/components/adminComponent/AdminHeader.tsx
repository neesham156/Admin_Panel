import dynamic from "next/dynamic";
import React from "react";

const MenuComponent = dynamic(
  () => {
    return import("components/MenuComponent");
  },
  { ssr: false }
);

const AdminSidebar = dynamic(
  () => {
    return import("./AdminSidebar");
  },
  { ssr: false }
);

export default function AdminHeader() {
  return (
    <div>
      <nav className="w-full flex bg-gray-100 shadow-lg">
        <ul className=" w-3/4 flex  items-center">
          <li>
            <div className="px-5 ">
              <AdminSidebar />
            </div>
          </li>
          <li>
            <p className="text-2xl  tracking-wide text-[#80b500] px-5 py-5 font-bold">
              TASK-2
            </p>
          </li>
        </ul>
        <div className=" w-1/4 flex justify-end items-center">
          <p className="text-2xl text-black px-5 py-5 font-semibold ">
            <MenuComponent />
          </p>
        </div>
      </nav>
    </div>
  );
}
