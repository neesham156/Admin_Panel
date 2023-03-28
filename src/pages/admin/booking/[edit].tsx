import { CircularProgress, Input, Select, Textarea } from "@chakra-ui/react";
import BreadCrumbComponent from "components/BreadCrumb";
import { updateBooking } from "controller/Admin/bookingController";
import { Formik } from "formik";
import { useRouter } from "next/router";
import * as Yup from "yup";

import bookingModel from "models/Booking";
import { Jsonify } from "database/database";
import { useState } from "react";

import LoactionField from "components/adminComponent/LoactionField";


const validationSchema = Yup.object().shape({
  booking_Name: Yup.string().required("Booking Name Required"),

  drone_shot_id: Yup.string().required("drone shot id is required"),
  pincode: Yup.number().min(1).required("Pincode Required"),
  location: Yup.string().required("location Required"),
  city: Yup.string().required("city Required"),
  state: Yup.string().required("state Required"),
  longitude: Yup.number().min(1).required("Longitude Number Required"),
  latitude: Yup.number().min(1).required("Latitude Number Required"),
  address: Yup.string().required("address Required"),
});


export async function getServerSideProps({ query }: any) {
  const id = query.edit;
  const booking = await bookingModel.findById(id);
 

  return {
    props: {
      booking: Jsonify(booking),
      
    },
  };
}

export default function Editbooking({ booking,  }: any) {
  console.log(booking)
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleInsert = async (values: any) => {
    setLoading(true);

 

   

    updateBooking(values)
      .then((data) => {
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
        <BreadCrumbComponent
          one={"dashboard"}
          two={"booking"}
          three={"edit"}
        />
      </div>
      <Formik
        initialValues={{
          _id: booking?._id,
          booking_Name: booking?.booking_Name,
          drone_shot_id: booking?.drone_shot_id,
       
          pincode: booking?.pincode,
      
          location: booking?.location,
          city: booking?.city,
          state: booking?.state,
          address: booking?.address,
          longitude: booking?.longitude,
          latitude: booking?.latitude,
      
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
              Edit booking
            </div>
            <div className="w-full  shadow-lg border-2 rounded-b-xl  px-5 md:px-10 py-5 ">
              <div className="md:flex ">
                <div className="w-full md:w-1/2 md:pr-1 mb-4">
                  <label htmlFor="booking_Name">Booking Name:</label>
                  <Input
                    placeholder="booking_Name"
                    type="text"
                    setFieldValue={setFieldValue}
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
                  <label htmlFor="drone_shot id">Drone shot id:</label>
                  <Input
                    placeholder="drone_shot_id"
                    type="text"
                    setFieldValue={setFieldValue}
                    focusBorderColor="green.500"
                    name="drone_shot_id"
                    value={values.drone_shot_id}
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
                  Data={booking}
                />
                <div className="w-full md:w-1/3 md:pr-1 mb-4">
                  <label htmlFor="city">Pincode:</label>
                  <Input
                    placeholder="Pincode"
                    type="number"
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
