import { ArrowNarrowRightIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";

interface Icard {
  name: any;
  icon: any;
}

export default function AdminDashboardCard({ name, icon }: Icard) {
  const router = useRouter();

  return (
    <>
      <div className="flex justify-between p-5">
        <p className="w-28 h-28 text-[#80b500] hover:animate-pulse">{icon}</p>
        <div className="flex flex-col justify-between ">
          <p className="text-2xl font-bold text-gray-700  capitalize">{name}</p>
          <p className="transition-all duration-700 text-gray-700 text-lg mb-3 border-b-2 border-gray-
          400 flex items-center  cursor-pointer hover:text-[#80B500] hover:border-black">
            <span
              onClick={() => {
                router.push(`/admin/${name}`);
              }}
            >
              Manage
            </span>
            <ArrowNarrowRightIcon className="w-6 h-6 ml-3" />
          </p>
        </div>
      </div>
    </>
  );
}
