import Loader from "@/assets/loading.svg";

function SuspenseApp() {
  return (
    <section className="flex subpixel-antialiased uppercase flex-col justify-center items-center w-full h-[90%]">
      <Loader></Loader>
    </section>
  );
}

export default SuspenseApp;
