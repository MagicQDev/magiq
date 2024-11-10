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
import { useGetProducts } from "@/pages/public/features/products/hooks/use-products";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import MenuForm from "./components/menu-form";
import { BusinessType } from "./utils/types";
function ProductsPage() {
  const [isOpenForm, setIsOpenForm] = useState(false);
  const activeCompany = useUserBusinessStore((state) => state.activeCompany);
  const { data: products } = useGetProducts(activeCompany?.id);
  if (!activeCompany) {
    return (
      <SubTitle>
        Parece que no tienes una empresa activa, por favor selecciona o crea una
        empresa para continuar
      </SubTitle>
    );
  }
  const openForm = () => {
    setIsOpenForm(true);
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
        <Button className="self-end" onClick={openForm}>
          Agregar <Plus></Plus>
        </Button>
      </section>
      <ProductList products={products}></ProductList>
      <MenuForm
        isOpen={isOpenForm}
        close={() => setIsOpenForm(false)}
        isNew={true}
        businessType={
          (activeCompany.business_type.name as BusinessType) || "Tienda"
        }
      ></MenuForm>
    </div>
  );
}

export default ProductsPage;
