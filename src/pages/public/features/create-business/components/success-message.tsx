import { AlertDialogHeader } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { useUserBusinessStore } from "@/stores/user.store";
import { BusinessByOwnerId } from "@/types/business.types";
import { useNavigate } from "react-router-dom";

function SuccessMessage({
  isOpen,
  createdCompany,
  onClose,
  isService,
}: {
  isOpen: boolean;
  createdCompany: BusinessByOwnerId | null;
  onClose: (openState: boolean) => void;
  isService?: boolean;
}) {
  const setActiveCompany = useUserBusinessStore(
    (state) => state.setActiveCompany
  );
  const navigate = useNavigate();

  const onBtnClick = () => {
    if (createdCompany) {
      setActiveCompany(createdCompany);
    }
    navigate("/products");
  };
  return (
    <Dialog open={isOpen} onOpenChange={(open) => onClose(open)}>
      <DialogContent>
        <AlertDialogHeader className="sm:text-center">
          <DialogTitle>Has creado tu negocio correctamente</DialogTitle>
          <DialogDescription>
            ¿Quieres continuar con el registro de tus{" "}
            {isService ? "servicios" : "productos"}?
          </DialogDescription>
          <DialogFooter className="sm:justify-center">
            <Button onClick={onBtnClick}>Continuar</Button>
          </DialogFooter>
        </AlertDialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default SuccessMessage;
