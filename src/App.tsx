import { LoadingScreen } from "@/components/LoadingScreen";
import HomePage from "@/pages/Landing/Landing";
import Privacy from "@/pages/Privacy/Privacy";
import SmsOptin from "@/pages/SmsOptin/SmsOptin";
import Terms from "@/pages/Terms/Terms";
import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const ClosingProcess = lazy(
  () => import("@/pages/ClosingProcess/ClosingProcess"),
);
const QRSourceModal = lazy(() => import("@/components/QRSourceModal"));
const EmailSourceModal = lazy(() => import("@/components/EmailSourceModal"));

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingScreen isLoading />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/closing-process" element={<ClosingProcess />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/sms-optin" element={<SmsOptin />} />
        </Routes>
        <QRSourceModal />
        <EmailSourceModal />
      </Suspense>
    </BrowserRouter>
  );
}
