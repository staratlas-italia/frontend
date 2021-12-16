import { EnlistBanner } from "~/components/pages/Home/components/EnlistBanner";
import { WelcomeBanner } from "~/components/pages/Home/components/WelcomeBanner";

export const HomePage = () => (
  <div className="space-y-10">
    <WelcomeBanner />
    <EnlistBanner />
  </div>
);
