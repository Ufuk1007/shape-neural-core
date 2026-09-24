import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import ProjectPage from "./pages/ProjectPage";
import InsightPage from "./pages/InsightPage";
import AlliancePage from "./pages/AlliancePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();
const DesignDirections = lazy(() => import("./pages/DesignDirections"));
const SignalsPage = lazy(() => import("./pages/SignalsPage"));
const ModuleLibrary = lazy(() => import("./pages/ModuleLibrary"));
const ModuleProjectPage = lazy(() => import("./pages/ModuleProjectPage"));
const StudioHomePage = lazy(() => import("./pages/StudioHomePage"));
const StudioServicesPage = lazy(() => import("./pages/StudioServicesPage"));
const StudioProjectsPage = lazy(() => import("./pages/StudioProjectsPage"));
const StudioLabPage = lazy(() => import("./pages/StudioLabPage"));
const StudioLegalPage = lazy(() => import("./pages/StudioLegalPage"));

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Suspense fallback={null}><StudioHomePage /></Suspense>} />
            <Route path="/lab" element={<Index />} />
            <Route path="/project/:slug" element={<ProjectPage />} />
            <Route path="/insight/:slug" element={<InsightPage />} />
            <Route path="/legal" element={<Navigate to="/impressum" replace />} />
            <Route path="/alliance" element={<AlliancePage />} />
            <Route
              path="/directions"
              element={
                <Suspense fallback={null}>
                  <DesignDirections />
                </Suspense>
              }
            />
            <Route
              path="/signals"
              element={
                <Suspense fallback={null}>
                  <SignalsPage />
                </Suspense>
              }
            />
            <Route
              path="/modules"
              element={
                <Suspense fallback={null}>
                  <ModuleLibrary />
                </Suspense>
              }
            />
            <Route
              path="/modules/projects/:slug"
              element={
                <Suspense fallback={null}>
                  <ModuleProjectPage />
                </Suspense>
              }
            />
            <Route
              path="/studio"
              element={<Suspense fallback={null}><StudioHomePage /></Suspense>}
            />
            <Route
              path="/studio/leistungen"
              element={<Suspense fallback={null}><StudioServicesPage /></Suspense>}
            />
            <Route
              path="/studio/projekte"
              element={<Suspense fallback={null}><StudioProjectsPage /></Suspense>}
            />
            <Route
              path="/studio/projekte/:slug"
              element={<Suspense fallback={null}><ModuleProjectPage /></Suspense>}
            />
            <Route
              path="/studio/lab"
              element={<Suspense fallback={null}><StudioLabPage /></Suspense>}
            />
            <Route
              path="/impressum"
              element={<Suspense fallback={null}><StudioLegalPage page="imprint" /></Suspense>}
            />
            <Route
              path="/datenschutz"
              element={<Suspense fallback={null}><StudioLegalPage page="privacy" /></Suspense>}
            />
            <Route
              path="/agb"
              element={<Suspense fallback={null}><StudioLegalPage page="terms" /></Suspense>}
            />
            <Route path="/studio/impressum" element={<Navigate to="/impressum" replace />} />
            <Route path="/studio/datenschutz" element={<Navigate to="/datenschutz" replace />} />
            <Route path="/studio/agb" element={<Navigate to="/agb" replace />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
