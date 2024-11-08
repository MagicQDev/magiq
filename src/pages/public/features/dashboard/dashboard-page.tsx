import { useUserBusinessStore } from "@/stores/user.store";
import Welcome from "./components/welcome";

function DashboardPage() {
  const companies = useUserBusinessStore((state) => state.companies);
  const activeCompany = useUserBusinessStore((state) => state.activeCompany);

  if (companies.length === 0) {
    return <Welcome />;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Active Company: {activeCompany?.name}</p>
      <p>Pagina en construcción</p>
    </div>
  );
}
export default DashboardPage;
