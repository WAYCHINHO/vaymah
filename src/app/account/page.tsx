import { AccountExperience } from "@/components/commerce/AccountExperience";
import { PremiumChrome } from "@/components/layout/PremiumChrome";

export default function AccountPage() {
  return (
    <PremiumChrome current="Личный кабинет">
      <AccountExperience />
    </PremiumChrome>
  );
}
