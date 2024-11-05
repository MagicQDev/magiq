function LoadingPage({ visible }: { visible: boolean }) {
  return (
    visible && (
      <div className="absolute z-100 w-full md:w-4/5 lg:w-3/4 xl:w-2/3 h-full">
        <div className="relative w-full bg-background p-4">
          <div className="flex flex-col w-full ml-2 gap-1">
            <div className="h-5 bg-foreground/40 rounded-sm animate-pulse w-1/2" />
            <div className="h-3 bg-foreground/40 rounded-sm animate-pulse w-10/12" />
            <div className="h-48 sm:h-56 md:h-64 bg-foreground/40 mt-4 rounded-sm animate-pulse w-full" />
            <div className="h-36 sm:h-44 md:h-52 bg-foreground/40 mt-4 rounded-sm animate-pulse w-full" />
            <div className="flex flex-row w-full gap-2">
              <div className="h-28 sm:h-48 md:h-54 bg-foreground/40 mt-4 rounded-sm animate-pulse w-1/2" />
              <div className="h-28 sm:h-48 md:h-54 bg-foreground/40 mt-4 rounded-sm animate-pulse w-1/2" />
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default LoadingPage;
