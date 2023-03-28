import BreadCrumbComponent from "components/BreadCrumb";
import { useRouter } from "next/router";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Tfoot,
} from "@chakra-ui/react";
import { PencilIcon, TrashIcon } from "@heroicons/react/solid";
import Booking from "models/Booking";
import dbConnect, { Jsonify } from "database/database";
import Link from "next/link";
import {
  deleteBooking,

} from "controller/Admin/bookingController";
import dynamic from "next/dynamic";


import SearchBar from "components/SearchBar";
import { useState } from "react";

const Paginate = dynamic(
  () => {
    return import("components/Paginate");
  },
  { ssr: false }
);

export async function getServerSideProps({ query }: any) {
  dbConnect();

  const { page } = query;

  const limit = 10;
  const booking = await Booking.find()
    .skip(page ? (page - 1) * limit : 0)
    .limit(limit)
    .exec();
   

  const bookingCount = await Booking.count();

  return {
    props: {
      booking: Jsonify(booking),
      limit: limit,
      bookingCount: bookingCount,
    },
  };
}

export default function Retailer({ booking, limit, bookingCount }: any) {
  const [filterData, setFilterData] = useState<any>(booking);
  const router = useRouter();

  const handleDelete = (id: any) => {
    if (confirm("Are you sure you want to delete?")) {
      deleteBooking(id)
        .then(() => {
          router.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };




  return (
    <>
      <BreadCrumbComponent one={"dashboard"} two={"booking"} />

      <div className="px-5 py-10">
        <div className="bg-[#F7F5EB] shadow-lg  py-3 px-4 flex justify-between">
          <p className="text-3xl text-gray-700 font-semibold">All Booking</p>
        </div>
        <div className="px-10 py-5">
          <SearchBar
            setFilterData={setFilterData}
            filterData={filterData}
            data={booking}
            link={"booking/add"}
            page={"booking"}
          />
          <TableContainer>
            <Table
              variant="striped"
              colorScheme="gray"
              size="lg"
              className="border"
            >
              <Thead>
                <Tr>
                  <Th>Id</Th>
                  <Th>Name</Th>
                  <Th>drone shot_id</Th>

                  <Th>Address</Th>
                  <Th>Action</Th>
              
                </Tr>
              </Thead>
              <Tbody>
                {filterData?.map((item: any, index: any) => (
                  <Tr>
                    <Td>{index + 1}</Td>
                    <Td>{item.booking_Name}</Td>
                    <Td>{item.drone_shot_id}</Td>

                    <Td >
                    
                        {item.address}
                   
                    </Td>

                    <Td>
                      <p className="flex cursor-pointer">
                        <Link href={`booking/${item._id}`} className="px-1">
                          <PencilIcon className="w-6 h-6 hover:text-green-500" />
                        </Link>
                        <span
                          onClick={(e) => handleDelete(item._id)}
                          className="px-1"
                        >
                          <TrashIcon className="w-6 h-6 hover:text-orange-500" />
                        </span>
                      </p>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
              {bookingCount > 10 && (
                <Tfoot>
                  {bookingCount.length != 0 && (
                    <Paginate
                      page={router.query.page}
                      limit={limit}
                      count={bookingCount}
                      link="/admin/booking"
                    />
                  )}
                </Tfoot>
              )}
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  );
}
