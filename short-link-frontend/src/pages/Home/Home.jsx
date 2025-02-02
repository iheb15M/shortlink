import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import SwitchButton from "../../components/SwitchButton";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { postData } from "../../services/api";
import { useNavigate } from "react-router-dom";

function Home() {
  const [isPrivate, setIsPrivate] = useState(false);
  const [backendError, setbackendError] = useState(undefined);
  const navigate = useNavigate();

  const handleSwitchChange = () => {
    setIsPrivate(!isPrivate);
    if (!isPrivate) {
        formik.setFieldValue('password', '');
        formik.setFieldValue('confirmPassword', '');
    }
  };

  const formik = useFormik({
    initialValues: {
      originalUrl: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
    originalUrl: Yup.string()
        .url("Please enter a valid URL.")
        .required("URL is required."),
      password: isPrivate
        ? Yup.string().required("Password is required.")
        : Yup.string(),
      confirmPassword: isPrivate
        ? Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords must match.")
            .required("Confirm password is required.")
        : Yup.string(),
    }),
    onSubmit: async (values) => {
      try {
        setbackendError(undefined);
        const response = await postData('create', {...values, private: isPrivate});
        navigate(`/info/${response.data.shortUrl}`);
      } catch (error) {
        setbackendError(error.message);
      }
    },
  });

  return (
    <section className="w-full flex flex-col justify-center items-center space-y-7">
      <h1 className="font-bold text-3xl md:text-4xl">Shorten a long link</h1>
      <p className="text-red-500 text-sm">{backendError}</p>
      <form onSubmit={formik.handleSubmit} className="w-11/12 md:w-2/3 space-y-4">
        <div>
          <label className="font-semibold">Paste your link here</label>
          <Input
            formik={formik}
            id="originalUrl"
            name="originalUrl"
            type="url"
            placeholder="https://example.com/my-long-url"
          />
        </div>

        <div className="flex space-x-4">
          <label className="font-semibold">Private Link: </label>
          <SwitchButton isChecked={isPrivate} onChange={handleSwitchChange} />
        </div>

        {isPrivate && (
          <div>
            <label className="font-semibold">Private link password</label>
            <div className="flex flex-col lg:flex-row space-y-2 space-x-3">
              <Input
                formik={formik}
                id="password"
                name="password"
                type="password"
                placeholder="Password"
              />
              <Input
                formik={formik}
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm password"
              />
            </div>
          </div>
        )}

        <Button type="submit">Submit</Button>
      </form>
    </section>
  );
}

export default Home;
