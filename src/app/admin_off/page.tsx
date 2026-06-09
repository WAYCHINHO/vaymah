import { AdminExperience } from "@/components/commerce/AdminExperience";
import { PremiumChrome } from "@/components/layout/PremiumChrome";

export default function AdminPage() {
  return (
    <PremiumChrome current="Админ-панель">
      <AdminExperience />
    </PremiumChrome>
  );
}
