import { CircularProgress, Input, Select, Textarea } from "@chakra-ui/react";
import LoactionField from "components/adminComponent/LoactionField";
import BreadCrumbComponent from "components/BreadCrumb";

import { saveBooking } from "controller/Admin/bookingController";

import dbConnect, { Jsonify } from "database/database";
import { Formik } from "formik";
import Booking from "models/Booking";

import { useRouter } from "next/router";
import { useState } from "react";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  booking_Name: Yup.string().required("First Name Required"),

  drone_shot_id: Yup.string().required("drone shot id is required"),
  pincode: Yup.number().min(1).required("Pincode Required"),
  location: Yup.string().required("location Required"),
  city: Yup.string().required("city Required"),
  state: Yup.string().required("state Required"),
  longitude: Yup.number().min(1).required("Longitude Number Required"),
  latitude: Yup.number().min(1).required("Latitude Number Required"),
  address: Yup.string().required("address Required"),
});

export async function getServerSideProps() {
  dbConnect();
  const booking= await Booking.find();


  return {
    props: {
      booking : Jsonify(booking ),
    },
  };
}

export default function AddBooking({ booking  }: any) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleInsert = async (values: any) => {
    setLoading(true);

    saveBooking(values)
      .then((data) => {
        // console.log(data);
        setLoading(false);
        router.push("./");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div>
        <BreadCrumbComponent one={"dashboard"} two={"booking"} three={"add"} />
      </div>
      <Formik
        initialValues={{
          booking_Name: "",
          drone_shot_id: "",

          pincode: "",

          location: "",
          city: "",
          state: "",
          address: "",
          longitude: "",
          latitude: "",
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
        }) => (
          <div className=" py-10">
            <div className="w-full bg-[#80b500] shadow-lg  text-2xl font-semibold p-3 text-white">
              Add Booking
            </div>
            <div className="w-full  shadow-lg border-2 rounded-b-xl  px-5 md:px-10 py-5 ">
              <div className="md:flex ">
                <div className="w-full md:w-1/2 md:pr-1 mb-4">
                  <label htmlFor="booking_Name">Booking Name:</label>
                  <Input
                    placeholder="booking Name"
                    type="text"
                    focusBorderColor="green.500"
                    name="booking_Name"
                    value={values.booking_Name}
                    onChange={handleChange("booking_Name")}
                  />
                  {errors.booking_Name && touched.booking_Name ? (
                    <p className="text-red-800">{errors.booking_Name}</p>
                  ) : null}
                </div>
                <div className="w-full md:w-1/2 md:pr-1 mb-4">
                  <label htmlFor="drone_shot_id">Drone shot id:</label>
                  <Input
                    placeholder="drone shot id"
                    type="text"
                    focusBorderColor="green.500"
                    name="drone_shot_id"
                    value={values.lastName}
                    onChange={handleChange("drone_shot_id")}
                  />
                  {errors.drone_shot_id && touched.drone_shot_id ? (
                    <p className="text-red-800">{errors.drone_shot_id}</p>
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
                />
                <div className="w-full md:w-1/3 md:pr-1 mb-4">
                  <label htmlFor="city">Pincode:</label>
                  <Input
                    placeholder="Pincode"
                    type="number"
                    name="pincode"
                    focusBorderColor="green.500"
                    value={values.pincode}
                    onChange={handleChange("pincode")}
                  />
                  {errors.pincode && touched.pincode ? (
                    <p className="text-red-800">{errors.pincode}</p>
                  ) : null}
                </div>
              </div>

              <div className="md:flex ">
                <div className="w-full md:w-1/3 md:pr-1 mb-4">
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
                <div className="w-full md:w-1/3  mb-4">
                  <label htmlFor="longitude">Longitude:</label>
                  <Input
                    placeholder="Longitude"
                    type="text"
                    focusBorderColor="green.500"
                    name="longitude"
                    value={values.longitude}
                    onChange={handleChange("longitude")}
                  />
                  {errors.longitude && touched.longitude ? (
                    <p className="text-red-800">{errors.longitude}</p>
                  ) : null}
                </div>
                <div className="w-full md:w-1/3 md:pl-1 mb-4">
                  <label htmlFor="latitude">Latitude:</label>
                  <Input
                    placeholder="Latitude "
                    type="text"
                    focusBorderColor="green.500"
                    name="latitude"
                    value={values.latitude}
                    onChange={handleChange("latitude")}
                  />
                  {errors.latitude && touched.latitude ? (
                    <p className="text-red-800">{errors.latitude}</p>
                  ) : null}
                </div>
              </div>

              <div className="md:flex mb-4 md:w-full md:justify-between">
                <div className="w-full md:w-1/2 ">
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
