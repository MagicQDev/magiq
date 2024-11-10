import { FormDescription, FormMessage } from "../ui/form";

function AppFormMessage({
  formError,
  description,
}: {
  formError: boolean;
  description?: string;
}) {
  return (
    <>
      <FormMessage className="text-xs text-start" />
      {formError && description && (
        <FormDescription className="text-xs text-start">
          {description}
        </FormDescription>
      )}
    </>
  );
}

export default AppFormMessage;
