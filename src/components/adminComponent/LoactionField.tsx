import { Select } from "@chakra-ui/react";
import { cityApi, stateApi } from "controller/Admin/countryController";
import React, { useEffect, useState } from "react";

export default function LoactionField({
  values,
  setFieldValue,
  errors,
  touched,
  handleChange,
  Data,
}: any) {
  const [states, setStates] = useState<any>(null);
  const [cities, setCities] = useState<any>(null);
  useEffect(() => {
    stateApi()
      .then(({ data }) => {
        if (Data) {
          const index = data.findIndex((x: any) => x.name === Data.state);
          cityApi(data[index].iso2)
            .then(({ data }) => {
              setCities(data);
            })
            .catch((err) => {
              console.log(err);
            });
        }
        setStates(data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <div className="w-full md:w-1/3  mb-4">
        <label htmlFor="state">State:</label>
        <Select
          placeholder="Choose State "
          name="state"
          focusBorderColor="green.500"
          value={values.state}
          onChange={({ target }:any) => {
            const state = target.value;
            setFieldValue("state", state);
            const index = states.findIndex((x: any) => x.name === state);
            cityApi(states[index].iso2)
              .then(({ data }) => {
                setCities(data);
              })
              .catch((err) => {});
          }}
        >
          {states?.map((item: any, index: any) => (
            <option key={index} value={item.name}>
              {item.name}
            </option>
          ))}
        </Select>
        {errors.state && touched.state ? (
          <p className="text-red-800">{errors.state}</p>
        ) : null}
      </div>
      <div className="w-full md:w-1/3 md:pl-1 mb-4">
        <label htmlFor="city">City:</label>
        <Select
          placeholder="Choose City"
          name="city"
          focusBorderColor="green.500"
          value={values.city}
          onChange={handleChange("city")}
        >
          {cities != null &&
            cities?.map((item: any, index: any) => (
              <option key={index} value={item.name}>
                {item.name}
              </option>
            ))}
        </Select>
        {errors.city && touched.city ? (
          <p className="text-red-800">{errors.city}</p>
        ) : null}
      </div>
    </>
  );
}
