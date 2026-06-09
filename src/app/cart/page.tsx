import { PremiumChrome } from "@/components/layout/PremiumChrome";
import { CartExperience } from "@/components/commerce/CartExperience";

export default function CartPage() {
  return (
    <PremiumChrome current="Корзина">
      <CartExperience />
    </PremiumChrome>
  );
}
