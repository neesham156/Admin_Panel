import Link from "next/link";

export default function Paginate({ page, limit, count, link }: any) {
  page = page ? page : 1;

  return (
    <div className="px-4 flex justify-between py-3">
      <div
        className={`${
          page == 1 || page === undefined ? "hidden" : "inline-flex"
        } bg-slate-900 px-4 py-1 rounded shadow`}
      >
        <Link href={`${link}?page=${page ? parseInt(page) - 1 : 2}`}>
          <span className="tracking-widest text-white font-medium">
            Previous
          </span>
        </Link>
      </div>

      <div
        className={`${
          parseInt(page) * limit >= count ? "hidden" : "inline-flex"
        } bg-slate-900 px-4 py-1 rounded shadow`}
      >
        <Link href={`${link}?page=${page ? parseInt(page) + 1 : 2}`}>
          <span className="tracking-widest font-medium text-white">Next</span>
        </Link>
      </div>
    </div>
  );
}
