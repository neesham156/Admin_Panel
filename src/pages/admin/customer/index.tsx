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
import CustomerModel from "models/Customer";
import dbConnect, { Jsonify } from "database/database";
import Link from "next/link";
import {
  deleteCustomer,
  updateCustomer,
} from "controller/Admin/customerController";
import dynamic from "next/dynamic";
import ModalComponent from "components/ModalComponent";
import UpdatePassword from "components/adminComponent/UpdatePassword";
import { useState } from "react";
import SearchBar from "components/SearchBar";

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
  const customer = await CustomerModel.find()
    .skip(page ? (page - 1) * limit : 0)
    .limit(limit)
    .exec();

  const customerCount = await CustomerModel.count();

  return {
    props: {
      customer: Jsonify(customer),
      limit: limit,
      customerCount: customerCount,
    },
  };
}

export default function Customer({ customer, limit, customerCount }: any) {
  const router = useRouter();
  const [filterData, setFilterData] = useState<any>(customer);

  const handleDelete = (id: any) => {
    if (confirm("Are you sure you want to delete?")) {
      deleteCustomer(id)
        .then(() => {
          router.reload();
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
  };

  
  // UPDAE PASSWORD
  const newPassword = (
    values: any,
    { resetForm, setFieldError }: { resetForm: any; setFieldError: any }
  ) => {
    if (values.oldPassword == values.password) {
      updateCustomer(values)
        .then((data: any) => {
          resetForm();

          router.push("/");
        })
        .catch((err: any) => {
          console.log(err);
        });
    } else {
      setFieldError("password", "Password not match ");
    }
  };
  return (
    <>
      <BreadCrumbComponent one={"dashboard"} two={"customer"} />

      <div className="px-5 py-10">
        <div className="bg-[#F7F5EB] shadow-lg  py-3 px-4 flex justify-between">
          <p className="text-3xl text-gray-700 font-semibold">All Customer</p>
        </div>
        <div className="px-10 py-5">
          <SearchBar
            setFilterData={setFilterData}
            filterData={filterData}
            data={customer}
            link={"customer/add"}
            page={"customer"}
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
                  <Th>Email</Th>
                  <Th isNumeric>Phone</Th>
                  <Th>Action</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filterData?.map((item: any, index: any) => (
                  <Tr>
                    <Td>{index + 1}</Td>
                    <Td>{item.firstName + item.lastName}</Td>
                    <Td>{item.email}</Td>
                    <Td isNumeric>{item.phone}</Td>
                    <Td>
                      <p className="flex cursor-pointer">
                        <Link href={`customer/${item._id}`} className="px-1">
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
                    <Td className="flex justify-between ">
                      <ModalComponent
                        name={"Edit password"}
                        component={
                          <UpdatePassword
                            onChange={(
                              values: any,
                              { resetForm, setFieldError }: any
                            ) => {
                              newPassword(values, { resetForm, setFieldError });
                            }}
                          />
                        }
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
              {customerCount > 10 && (
                <Tfoot>
                  {customer.length != 0 && (
                    <Paginate
                      page={router.query.page}
                      limit={limit}
                      count={customerCount}
                      link="/admin/customer"
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
