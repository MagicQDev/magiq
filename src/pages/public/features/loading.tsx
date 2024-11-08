import Loader from "@/assets/loading.svg";

function LoadingApp() {
  return (
    <div className="absolute bg-background rounded-xl w-full z-40 h-full max-h-[calc(100svh-theme(spacing.4)) shadow">
      <div className="flex justify-center items-center w-full h-[95%]">
        <div className="">
          <Loader></Loader>
        </div>
      </div>
    </div>
  );
}

export default LoadingApp;
