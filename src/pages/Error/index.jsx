import { useRouteError } from "react-router-dom";

import bubbleImg from "@/assets/Bubble.png";
// import bubbleSvg from "@/assets/errorBubble.svg";

export const Error = () => {
    const error = useRouteError();
    const is404 = error.status === 404;

    let title = "Not Found";
    let message = "Halaman yang dicari tidak ditemukan.";

    if (!is404) {
        title = "Internal Server Error";
        message = "Kami sedang mengalami server error, kami akan segera memperbaikinya, anda dapat mencoba lagi nanti."
    }

    return (
        <div className="h-screen w-full flex justify-center pt-52 font-bold text-5xl text-primary-pink-500 p-4">
            <div className="flex flex-col gap-2 items-center">
                {is404 && <div className="flex items-center justify-center gap-1 ">
                    <span>4</span>
                    <span className="pt-1">
                        <img src={bubbleImg} />
                    </span>
                    <span>4</span>
                </div>}
                <div className="flex flex-col gap-3 text-center items-center">
                    <h2>{title}</h2>
                    <p className="text-xl">{message}</p>
                </div>
            </div>
        </div>
    );
};



export default Error;