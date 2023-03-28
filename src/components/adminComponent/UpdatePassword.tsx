import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import {
  CheckIcon,
  EyeIcon,
  EyeOffIcon,
  XCircleIcon,
} from "@heroicons/react/solid";
import { Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

interface IUpdate {
  onChange: (value: any, { resetForm, setFieldError }: any) => void;
}

const validationSchema = Yup.object().shape({
  oldPassword: Yup.string().required("Please Enter Old password"),
  password: Yup.string().required("Please Enter new password"),
});

export default function UpdatePassword({ onChange }: IUpdate) {
  const [check, setCheck] = useState(false);
  const [success, setSuccess] = useState("");
  return (
    <>
      <Formik
        initialValues={{
          oldPassword: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={onChange}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleSubmit,
          setFieldValue,
          setFieldError,
        }) => (
          <div className="w-full  px-5 py-2">
            <div className=" py-2">
              <div className="w-full   mb-4">
                <label htmlFor="password"> Password:</label>
                <Input
                  placeholder="Password"
                  type="password"
                  focusBorderColor="green.500"
                  name="oldPassword"
                  borderColor="gray"
                  value={values.oldPassword}
                  onChange={handleChange("oldPassword")}
                />
                {errors.oldPassword && touched.oldPassword ? (
                  <p className="text-red-800">{errors.oldPassword}</p>
                ) : null}
              </div>

              <div className="w-full   mb-4">
                <label htmlFor="last_name"> Confirm Password:</label>

                <InputGroup>
                  <Input
                    placeholder=" Confirm Password"
                    type={check ? "text" : "password"}
                    name="password"
                    focusBorderColor="green.500"
                    value={values.password}
                    borderColor={
                      success == "false"
                        ? "red"
                        : success == "true"
                        ? "green.300"
                        : "gray"
                    }
                    onChange={({ target }) => {
                      setFieldValue("password", target.value);
                      if (values.oldPassword == target.value) {
                        setSuccess("true");
                      } else {
                        setSuccess("false");
                      }
                    }}
                  />
                  <InputRightElement
                    children={
                      !check ? (
                        <EyeIcon
                          onClick={() => {
                            setCheck(true);
                          }}
                          className="w-5 h-5 cursor-pointer text-gray-700"
                        />
                      ) : (
                        <EyeOffIcon
                          onClick={() => {
                            setCheck(false);
                          }}
                          className="w-5 h-5 cursor-pointer"
                        />
                      )
                    }
                  />
                  {/* <InputRightElement
                    children={
                      !success ? (
                        <XCircleIcon
                          className="w-5 h-5 cursor-pointer text-red-500"
                          onClick={() => {
                            setSuccess(true);
                          }}
                        />
                      ) : (
                        <CheckIcon
                          onClick={() => {
                            setSuccess(false);
                          }}
                          className="w-5 h-5 cursor-pointer text-green-500"
                        />
                      )
                    }
                  /> */}
                </InputGroup>
                {errors.password && touched.password ? (
                  <p className="text-red-800">{errors.password}</p>
                ) : null}
              </div>
            </div>

            <div className="flex justify-center ">
              <button
                type="submit"
                onClick={() => handleSubmit()}
                className=" bg-[#80b500] font-semibold text-md hover:shadow-xl  py-2 px-4 md:px-8  text-white rounded-md"
              >
                Update
              </button>
            </div>
          </div>
        )}
      </Formik>
    </>
  );
}
