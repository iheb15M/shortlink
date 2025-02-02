import { useEffect, useState } from "react";
import { getData } from "../../services/api";
import { useParams } from "react-router-dom";
import Button from "../../components/Button";

function LinkInfo() {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [backendError, setbackendError] = useState(undefined);
  const [urlInfo, setUrlInfo] = useState({});
  const [copyMessage, setCopyMessage] = useState("");

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyMessage("Link copied to clipboard 🎉");
      setTimeout(() => setCopyMessage(""), 4000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };
  const { id } = useParams();
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getData(`info/${id}`);
        setUrlInfo(response.data);
      } catch (error) {
        setbackendError(error.response.data.message || error.message);
      }
    }
    fetchData();
  }, [id]);
  return (
    <section className="w-full flex flex-col justify-center items-center space-y-4">
      <h1 className="font-bold text-3xl md:text-4xl">Link info</h1>
      <p className="text-red-500 text-sm">{backendError}</p>
      <div className="flex flex-col space-y-3 w-full lg:w-2/3 xl:w-1/2 text-gray-900">
        <a
          href={baseUrl + urlInfo.shortUrl}
          className="px-8 py-4 bg-light hover:px-9 rounded-full w-fit mx-auto "
          target="_blank"
        >
          <h2 className="font-medium text-center text-blue-500 underline text-xl">
            {baseUrl + urlInfo.shortUrl}
          </h2>
        </a>
        <div className="flex items-center justify-center p-3 space-x-5">
          <div className="flex flex-col items-center justify-center px-4 py-8 border-2 rounded-2xl border-light w-1/3">
            <small className="text-sm">Link</small>
            <p className="font-semibold">
              {urlInfo.private ? "Private" : "Public"}
            </p>
          </div>
          <div className="flex flex-col items-center justify-center px-4 py-8 border-2 rounded-2xl border-light w-1/3">
            <small className="text-sm">Clicks</small>
            <p className="font-semibold"> {urlInfo.clicks}</p>
          </div>
        </div>
        <Button onClick={() => copyToClipboard(baseUrl + urlInfo.shortUrl)}>
          Copy Link
        </Button>
        {copyMessage && (
          <p className="mt-2 text-green-600 text-sm text-center">{copyMessage}</p>
        )}
      </div>
    </section>
  );
}

export default LinkInfo;
