import React, { useState } from "react";
import { TopNav } from "./components/TopNav";
import { Hero } from "./components/Hero";
import { HowItWorks } from "./components/HowItWorks";
import { TailorRecommendations } from "./components/TailorRecommendations";
import { VirtualMeasurementPromo } from "./components/VirtualMeasurementPromo";
import { SupportSection } from "./components/SupportSection";
import { FAQPage } from "./components/FAQPage";
import { AuthPage } from "./components/AuthPage";
import { SearchPage } from "./components/SearchPage";
import { OrdersPage } from "./components/OrdersPage";
import { VirtualMeasurement } from "./components/VirtualMeasurement";
import { ProfilePage } from "./components/ProfilePage";
import { Reveal } from "./components/Reveal";
import { TailorDetail, TailorData } from "./components/TailorDetail";

type Page = "home" | "search" | "orders" | "measurement" | "profile" | "faq";

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [authed, setAuthed] = useState(false);
  const [selectedTailor, setSelectedTailor] = useState<TailorData | null>(null);

  if (!authed) {
    return <AuthPage onAuthenticated={() => setAuthed(true)} />;
  }

  return (
    <div className="min-h-screen bg-background text-primary selection:bg-secondary/30 selection:text-primary relative">
      <TopNav
        active={page}
        onSearchClick={() => setPage("search")}
        onProfileClick={() => setPage("profile")}
        onNavClick={(item) => {
          setSelectedTailor(null);
          if (item === "Beranda") setPage("home");
          else if (item === "Pesanan") setPage("orders");
          else if (item === "Penjahit") setPage("search");
        }}
      />
      {selectedTailor ? (
        <TailorDetail
          tailor={selectedTailor}
          onBack={() => setSelectedTailor(null)}
        />
      ) : (
        <>
          {page === "search" && <SearchPage onClose={() => setPage("home")} />}
          {page === "orders" && <OrdersPage onBack={() => setPage("home")} />}
          {page === "measurement" && (
            <VirtualMeasurement onBack={() => setPage("home")} />
          )}
          {page === "profile" && (
            <ProfilePage
              onBack={() => setPage("home")}
              onOpenMeasurement={() => setPage("measurement")}
            />
          )}
          {page === "faq" && <FAQPage onBack={() => setPage("home")} />}
          {page === "home" && (
            <>
              <Hero onCtaClick={() => setPage("search")} />
              <main className="max-w-[1440px] mx-auto px-6 lg:px-10 relative z-10">
                <div className="pt-16">
                  <Reveal>
                    <HowItWorks />
                  </Reveal>
                  <Reveal delay={0.05}>
                    <TailorRecommendations onSelectTailor={setSelectedTailor} />
                  </Reveal>
                  <Reveal delay={0.05}>
                    <VirtualMeasurementPromo
                      onStart={() => setPage("measurement")}
                    />
                  </Reveal>
                </div>
              </main>
              <Reveal y={20}>
                <SupportSection
                  onNavigate={(item) => {
                    if (item === "FAQ") setPage("faq");
                  }}
                />
              </Reveal>
            </>
          )}
        </>
      )}
    </div>
  );
}