import { useToast } from "./use-toast";

export const useToastAlerts = () => {
  const { toast } = useToast();
  const setupToastError = (message: string) => {
    toast({
      title: "Error",
      description: message,
      variant: "destructive",
      duration: 5000,
    });
  };
  const setupToastSuccess = (message: string) => {
    toast({
      title: "Exito",
      description: message,
      variant: "default",
      duration: 5000,
    });
  };
  return { setupToastSuccess, setupToastError };
};
