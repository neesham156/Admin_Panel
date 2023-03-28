import React from "react";
import AdminHeader from "../components/adminComponent/AdminHeader";

export default function AdminLaytout({ children }: any) {
  return (
    <div className="h-full w-full flex flex-col">
      <AdminHeader />
      <div className="w-full h-full">
        <div className="p-2">{children}</div>
      </div>
    </div>
  );
}
