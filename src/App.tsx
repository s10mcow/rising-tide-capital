import EmailSourceModal from "@/components/EmailSourceModal";
import { LoadingScreen } from "@/components/LoadingScreen";
import QRSourceModal from "@/components/QRSourceModal";
import ClosingProcess from "@/pages/ClosingProcess/ClosingProcess";
import HomePage from "@/pages/Landing/Landing";
import Privacy from "@/pages/Privacy/Privacy";
import SmsOptin from "@/pages/SmsOptin/SmsOptin";
import Terms from "@/pages/Terms/Terms";
import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

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
