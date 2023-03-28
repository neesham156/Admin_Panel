import {
  ArrowNarrowRightIcon,
  ShoppingBagIcon,
  UserIcon,
  UsersIcon,
} from "@heroicons/react/solid";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import BreadCrumbComponent from "components/BreadCrumb";
import AdminDashboardCard from "components/adminComponent/AdminDashboardCard";


export default function AdminDashboard() {
  const router = useRouter();

  return (
    <>
      <BreadCrumbComponent
        one={"dashboard"}
        // two={"distributors"}
        // three={"add"}
      />
      <div className="w-full md:flex  px-5 pt-5">
        <div className="transition-all md:w-1/2 rounded-lg shadow-lg border-gray-100 border-[2px] hover:shadow-lime-50 hover:border-[2px] hover:border-[#80B500] mb-3 md:mr-5 hover:-translate-y-1">
          <AdminDashboardCard name={"customer"} icon={<UserIcon />} />
        </div>

        <div className="transition-all md:w-1/2 rounded-lg bg-white shadow-lg border-gray-100 border-[2px] hover:shadow-lime-50 hover:border-[2px] hover:border-[#80B500] mb-3 md:mr-5 hover:-translate-y-1">
          <AdminDashboardCard name={"booking"} icon={<UsersIcon />} />
        </div>

      
      </div>
    </>
  );
}
