import { LoadingScreen } from "@/components/LoadingScreen";
import PageMetadata from "@/components/PageMetadata";
import HomePage from "@/pages/Landing/Landing";
import Privacy from "@/pages/Privacy/Privacy";
import SmsOptin from "@/pages/SmsOptin/SmsOptin";
import Terms from "@/pages/Terms/Terms";
import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

const Contracting = lazy(() => import("@/pages/Contracting/Contracting"));

const ClosingProcess = lazy(
  () => import("@/pages/ClosingProcess/ClosingProcess"),
);
const QRSourceModal = lazy(() => import("@/components/QRSourceModal"));
const EmailSourceModal = lazy(() => import("@/components/EmailSourceModal"));

function HomeSourceModals() {
  const { pathname } = useLocation();
  return pathname === "/" ? (
    <>
      <QRSourceModal />
      <EmailSourceModal />
    </>
  ) : null;
}

export default function App() {
  return (
    <BrowserRouter>
      <PageMetadata />
      <Suspense fallback={<LoadingScreen isLoading />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/closing-process" element={<ClosingProcess />} />
          <Route path="/contracting" element={<Contracting />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/sms-optin" element={<SmsOptin />} />
        </Routes>
        <HomeSourceModals />
      </Suspense>
    </BrowserRouter>
  );
}
