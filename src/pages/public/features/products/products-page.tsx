import SubTitle from "@/components/app/subtitle";
import Title from "@/components/app/title";
import { Separator } from "@/components/ui/separator";
import { useUserBusinessStore } from "@/stores/user.store";
import { getValue } from "@/utils/funtions";
import {
  PRODUCTS_PAGE_DESC,
  PRODUCTS_PAGE_TITLE,
} from "@/utils/products-constants";
import ProductList from "./components/products-list";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import MenuForm from "./components/menu-form";
import { BusinessType } from "./utils/types";
import { TablesUpdate } from "@/types/supabase-generated.types";
function ProductsPage() {
  const [isOpenForm, setIsOpenForm] = useState<{
    isOpen: boolean;
    isNew: boolean;
    initialValues: TablesUpdate<"business_products"> | undefined;
  }>({
    isOpen: false,
    isNew: false,
    initialValues: undefined,
  });
  const activeCompany = useUserBusinessStore((state) => state.activeCompany);
  if (!activeCompany) {
    return (
      <SubTitle>
        Parece que no tienes una empresa activa, por favor selecciona o crea una
        empresa para continuar
      </SubTitle>
    );
  }

  const openForm = (
    initialValues: TablesUpdate<"business_products"> | undefined,
    isNew: boolean
  ) => {
    setIsOpenForm({
      isOpen: true,
      isNew: isNew,
      initialValues: initialValues,
    });
  };
  const closeForm = () => {
    setIsOpenForm((prev) => ({ ...prev, isOpen: false }));
  };
  const onAddButtonClick = () => {
    openForm(undefined, true);
  };
  return (
    <div className="w-full">
      <Title>
        {getValue(PRODUCTS_PAGE_TITLE, activeCompany.business_type.name)}
      </Title>
      <SubTitle>
        {getValue(PRODUCTS_PAGE_DESC, activeCompany.business_type.name)}
      </SubTitle>
      <Separator></Separator>
      <section className="flex w-full flex-row justify-end mt-4">
        <Button className="self-end" onClick={onAddButtonClick}>
          Agregar <Plus></Plus>
        </Button>
      </section>
      <ProductList
        businessId={activeCompany.id}
        openForm={openForm}
      ></ProductList>
      <MenuForm
        formValues={isOpenForm}
        close={closeForm}
        businessType={
          (activeCompany.business_type.name as BusinessType) || "Tienda"
        }
      ></MenuForm>
    </div>
  );
}

export default ProductsPage;
