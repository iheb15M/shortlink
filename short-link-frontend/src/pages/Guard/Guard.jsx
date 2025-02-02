import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { getData, postData } from "../../services/api";
import locked from "../../assets/Locked.svg";
import Input from "../../components/Input";
import * as Yup from "yup";
import { useFormik } from "formik";
import Button from "../../components/Button";
function Guard() {
  const { id } = useParams();
  const [urlInfo, setUrlInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [backendError, setbackendError] = useState(undefined);
  const hasFetched = useRef(false);
  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    async function fetchData() {
      try {
        const response = await getData(`find/${id}`);
        if (!response.data.private) {
          window.location.href = response.data.originalUrl;
        } else {
          setUrlInfo(response.data);
          setLoading(false);
        }
      } catch (error) {
        console.error(error.message);
      }
    }
    fetchData();
  }, [id]);

  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema: Yup.object({
      password: Yup.string().required("Password is required."),
    }),
    onSubmit: async (values) => {
      try {
        setbackendError(undefined);
        setLoading(true);
        const response = await postData("setPassword", {
          ...values,
          shortUrl: urlInfo.shortUrl,
        });
        window.location.href = response.data.originalUrl;
        setLoading(false);
      } catch (error) {
        setbackendError(error.response.data.message || error.message);
        setLoading(false);
      }
    },
  });
  if (loading) {
    return (
      <section className="w-full flex flex-col justify-center items-center space-y-4">
        <h1 className="font-bold text-3xl md:text-4xl">Loading</h1>
      </section>
    );
  }
  return (
    <section className="w-full flex flex-col justify-center items-center space-y-4">
      <img src={locked} alt="Lock Icon" />
      <h3 className="font-bold text-md md:text-4xl">Private link</h3>
      <p className="text-red-500 text-sm">{backendError}</p>
      <form
        onSubmit={formik.handleSubmit}
        className="w-11/12 md:w-2/3 space-y-4"
      >
        <div>
          <label className="font-semibold">Password</label>
          <Input
            formik={formik}
            id="password"
            name="password"
            type="password"
            placeholder="Enter password"
          />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </section>
  );
}

export default Guard;
