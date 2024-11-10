import * as React from "react";

import { cn } from "@/lib/utils";
import { InputProps } from "../ui/input";
interface FileChangeEvent extends React.ChangeEvent<HTMLInputElement> {
  target: HTMLInputElement & EventTarget;
}
const AppInputFile = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, onChange: externalOnChange, value, ...props }, ref) => {
    const [_file, setFile] = React.useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
    const handleFileChange = (event: FileChangeEvent): void => {
      if (!event.target.files || event.target.files.length === 0) {
        setFile(null);
        setPreviewUrl(null);
        return;
      }
      const selectedFile: File = event.target.files[0];
      setFile(selectedFile);

      const reader: FileReader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
      externalOnChange?.(event);
    };
    React.useEffect(() => {
      if (value) {
        if (value instanceof File) {
          const reader: FileReader = new FileReader();
          reader.onloadend = () => {
            setPreviewUrl(reader.result as string);
          };
          reader.readAsDataURL(value);
        }
      } else {
        setPreviewUrl(null);
      }
    }, [value]);


    return (
      <div
        className={cn(
          "flex w-full gap-2 items-center rounded-md border border-input bg-background ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
      >
        <input
          {...props}
          value={value}
          className={cn(
            "w-full px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none",
            previewUrl && "max-w-[65%]"
          )}
          ref={ref}
          type="file"
          onChange={handleFileChange}
          accept="image/*"
        />
        {previewUrl && (
          <img
            className="w-[28%] h-full py-2 rounded-lg"
            src={previewUrl}
            alt="Preview"
          />
        )}
      </div>
    );
  }
);

AppInputFile.displayName = "AppInputFile";

export { AppInputFile };
