import { CircularProgress, Input, Textarea } from "@chakra-ui/react";
import BreadCrumbComponent from "components/BreadCrumb";
import { updateCustomer } from "controller/Admin/customerController";
import { Formik } from "formik";
import { useRouter } from "next/router";
import * as Yup from "yup";

import CustomerModel from "models/Customer";
import { Jsonify } from "database/database";
import { useState } from "react";
import LoactionField from "components/adminComponent/LoactionField";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is Required"),
  firstName: Yup.string().required("First Name Required"),
  lastName: Yup.string().required("First Name Required"),
  phone: Yup.number().min(1).required("Phone Number Required"),
  aadhar: Yup.number().min(1).required("Aadhar Number Required"),
  location: Yup.string().required("location Required"),

  city: Yup.string().required("city Required"),
  state: Yup.string().required("state Required"),
  address: Yup.string().required("address Required"),
});

export async function getServerSideProps({ query }: any) {
  const id = query.edit;
  const customer = await CustomerModel.findById(id);

  return {
    props: {
      customer: Jsonify(customer),
    },
  };
}

export default function Addcustomer({ customer }: any) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleInsert = (values: any) => {
    setLoading(true);
    updateCustomer(values)
      .then((data:any) => {
        // console.log(data);
        setLoading(false);
        router.push("./");
      })
      .catch((err:any) => {
        console.log(err);
      });
  };

  return (
    <>
      <div>
        <BreadCrumbComponent
          one={"dashboard"}
          two={"customer"}
          three={"edit"}
        />
      </div>
      <Formik
        initialValues={{
          _id: customer?._id,
          firstName: customer?.firstName,
          lastName: customer?.lastName,
          email: customer?.email,
          phone: customer?.phone,
          aadhar: customer?.aadhar,
          location: customer?.location,
          city: customer?.city,
          state: customer?.state,
          address: customer?.address,
          longitude: customer?.longitude,
          latitude: customer?.latitude,
          pincode: customer?.pincode,
        }}
        validationSchema={validationSchema}
        onSubmit={handleInsert}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleSubmit,
          setFieldValue,
        }: any) => (
          <div className=" py-10">
            <div className="w-full bg-[#80b500] shadow-lg  text-2xl font-semibold p-3 text-white">
              Edit customer
            </div>
            <div className="w-full  shadow-lg border-2 rounded-b-xl  px-5 md:px-10 py-5 ">
              <div className="md:flex ">
                <div className="w-full md:w-1/2 md:pr-1 mb-4">
                  <label htmlFor="first_name">First Name:</label>
                  <Input
                    placeholder="First Name"
                    type="text"
                    focusBorderColor="green.500"
                    name="firstName"
                    value={values.firstName}
                    onChange={handleChange("firstName")}
                  />
                  {errors.firstName && touched.firstName ? (
                    <p className="text-red-800">{errors.firstName}</p>
                  ) : null}
                </div>
                <div className="w-full md:w-1/2 md:pr-1 mb-4">
                  <label htmlFor="last_name">Last Name:</label>
                  <Input
                    placeholder="Last Name"
                    type="text"
                    focusBorderColor="green.500"
                    name="lastName"
                    value={values.lastName}
                    onChange={handleChange("lastName")}
                  />
                  {errors.lastName && touched.lastName ? (
                    <p className="text-red-800">{errors.lastName}</p>
                  ) : null}
                </div>
              </div>
              <div className="md:flex ">
                <div className="w-full md:w-1/2 md:pr-1 mb-4">
                  <label htmlFor="phone">Phone:</label>
                  <Input
                    placeholder="Phone Number"
                    type="number"
                    focusBorderColor="green.500"
                    name="phone"
                    value={values.phone}
                    onChange={handleChange("phone")}
                  />
                  {errors.phone && touched.phone ? (
                    <p className="text-red-800">{errors.phone}</p>
                  ) : null}
                </div>
                <div className="w-full md:w-1/2 md:pr-1 md:pl-1 mb-4">
                  <label htmlFor="email">Email:</label>
                  <Input
                    placeholder="Email "
                    type="email"
                    focusBorderColor="green.500"
                    name="email"
                    value={values.email}
                    onChange={handleChange("email")}
                  />
                  {errors.email && touched.email ? (
                    <p className="text-red-800">{errors.email}</p>
                  ) : null}
                </div>
              </div>
              <div className="md:flex ">
                <div className="w-full md:w-1/2 md:pr-1 mb-4">
                  <label htmlFor="aadhar">Adhar Card:</label>
                  <Input
                    placeholder="AAdhar card "
                    type="number"
                    focusBorderColor="green.500"
                    name="aadhar"
                    value={values.aadhar}
                    onChange={handleChange("aadhar")}
                  />
                  {errors.aadhar && touched.aadhar ? (
                    <p className="text-red-800">{errors.aadhar}</p>
                  ) : null}
                </div>
                <div className="w-full md:w-1/2 md:pl-1 mb-4">
                  <label htmlFor="Location">Location:</label>
                  <Input
                    placeholder="Location"
                    type="text"
                    focusBorderColor="green.500"
                    name="location"
                    value={values.location}
                    onChange={handleChange("location")}
                  />
                  {errors.location && touched.location ? (
                    <p className="text-red-800">{errors.location}</p>
                  ) : null}
                </div>
              </div>
              <div className="md:flex ">
                <LoactionField
                  values={values}
                  setFieldValue={setFieldValue}
                  errors={errors}
                  touched={touched}
                  handleChange={handleChange}
                  Data={customer}
                />
                <div className="w-full md:w-1/3 md:pl-1 mb-4">
                  <label htmlFor="Pincode">Pincode:</label>
                  <Input
                    placeholder="Pincode"
                    type="text"
                    focusBorderColor="green.500"
                    name="pincode"
                    value={values.pincode}
                    onChange={handleChange("pincode")}
                  />
                  {errors.pincode && touched.pincode ? (
                    <p className="text-red-800">{errors.pincode}</p>
                  ) : null}
                </div>
              </div>

           

              <div className="flex mb-4">
                <div className="w-full ">
                  <label htmlFor="address">Address:</label>
                  <Textarea
                    placeholder="Address"
                    name="address"
                    focusBorderColor="green.500"
                    value={values.address}
                    onChange={handleChange("address")}
                  />
                  {errors.address && touched.address ? (
                    <p className="text-red-800">{errors.address}</p>
                  ) : null}
                </div>
              </div>
              <div className="flex justify-center ">
                <button
                  type="submit"
                  onClick={() => handleSubmit()}
                  className="flex justify-center items-center bg-[#80b500] font-semibold text-xl hover:shadow-xl  py-2 px-4 md:px-8  text-white rounded-md "
                >
                  {loading ? (
                    <CircularProgress
                      isIndeterminate
                      color="white"
                      className="w-10 h-10 "
                    />
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </Formik>
    </>
  );
}
