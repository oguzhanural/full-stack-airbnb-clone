'use client';
import { PulseLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="h-[70vh] flex flex-col justify-center items-center">
        <PulseLoader
            speedMultiplier={1}
            size={40}
            color="#36d7b7"

        />
    </div>
  )
}

export default Loader;
