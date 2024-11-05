import { FormDescription, FormMessage } from "../ui/form";

function AppFormMessage({
  formError,
  description,
}: {
  formError: boolean;
  description: string;
}) {
  return (
    <>
      <FormMessage className="text-xs" />
      {formError && description && (
        <FormDescription className="text-xs">{description}</FormDescription>
      )}
    </>
  );
}

export default AppFormMessage;
