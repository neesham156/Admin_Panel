import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

export default function BreadCrumbComponent({ one, two, three }: any) {
  const router = useRouter();
  return (
    <div className="flex ">
      {one && (
        <div className="">
          <p>
            <Link href={`/admin/${one}`}>
              <span
                className={`${
                  router.pathname == `/admin/${one}` &&
                  "font-bold text-[#80b500]"
                } `}
              >
                {one}
              </span>
            </Link>
          </p>
        </div>
      )}

      <span className="px-2">/</span>
      {two && (
        <>
          <div className="">
            <p>
              <Link href={`/admin/${two}`}>
                <span
                  className={`${
                    router.pathname == `/admin/${two}` &&
                    "font-bold text-[#80b500]"
                  } `}
                >
                  {two}
                </span>
              </Link>
            </p>
          </div>
          <span className="px-2">/</span>
        </>
      )}
      {three && (
        <div className="">
          <p>
            <span className="font-bold text-[#80b500]">{three}</span>
          </p>
        </div>
      )}
    </div>
  );
}
