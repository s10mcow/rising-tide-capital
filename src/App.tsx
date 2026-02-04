import EmailSourceModal from "@/components/EmailSourceModal";
import { LoadingScreen } from "@/components/LoadingScreen";
import QRSourceModal from "@/components/QRSourceModal";
import ClosingProcess from "@/pages/ClosingProcess/ClosingProcess";
import HomePage from "@/pages/Landing/Landing";
import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingScreen isLoading />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/closing-process" element={<ClosingProcess />} />
        </Routes>
        <QRSourceModal />
        <EmailSourceModal />
      </Suspense>
    </BrowserRouter>
  );
}
