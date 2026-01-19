import { Suspense } from "react";
import { LoadingScreen } from "@/components/LoadingScreen";
import HomePage from "@/pages/Landing/Landing";
import QRSourceModal from "@/components/QRSourceModal";
import EmailSourceModal from "@/components/EmailSourceModal";

export default function App() {
  return (
    <Suspense fallback={<LoadingScreen isLoading />}>
      <HomePage />
      <QRSourceModal />
      <EmailSourceModal />
    </Suspense>
  );
}
