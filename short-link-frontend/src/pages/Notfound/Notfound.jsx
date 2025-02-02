import Lottie from "lottie-react";
import NotfoundAnimation from "../../assets/notfound-animation.json";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";

function Notfound() {
  const navigate = useNavigate();
  return (
    <section className="w-full flex flex-col justify-center items-center space-y-4">
      <h1 className="text-4xl font-semibold capitalize">Link not found</h1>
      <Lottie
        animationData={NotfoundAnimation}
        loop={true}
        className="w-full lg:w-2/3"
      />
      <Button onClick={() => navigate(`/`)}>Back to home</Button>
    </section>
  );
}

export default Notfound;
