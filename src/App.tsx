import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import NotFound from "./pages/NotFound";

const ModuleProjectPage = lazy(() => import("./pages/ModuleProjectPage"));
const StudioHomePage = lazy(() => import("./pages/StudioHomePage"));
const StudioServicesPage = lazy(() => import("./pages/StudioServicesPage"));
const StudioProjectsPage = lazy(() => import("./pages/StudioProjectsPage"));
const StudioLabPage = lazy(() => import("./pages/StudioLabPage"));
const StudioLegalPage = lazy(() => import("./pages/StudioLegalPage"));
const StudioContactPage = lazy(() => import("./pages/StudioContactPage"));

const App = () => (
  <HelmetProvider>
    <BrowserRouter>
          <Routes>
            <Route path="/" element={<Suspense fallback={null}><StudioHomePage /></Suspense>} />
            <Route path="/studio" element={<Navigate to="/" replace />} />
            <Route path="/lab" element={<Navigate to="/studio/lab" replace />} />
            <Route path="/signals" element={<Navigate to="/studio/lab#cloud" replace />} />
            <Route path="/directions" element={<Navigate to="/" replace />} />
            <Route path="/modules" element={<Navigate to="/" replace />} />
            <Route path="/modules/projects/:slug" element={<LegacyProjectRedirect />} />
            <Route path="/alliance" element={<Navigate to="/" replace />} />
            <Route path="/project/:slug" element={<LegacyProjectRedirect />} />
            <Route path="/insight/:slug" element={<Navigate to="/studio/lab" replace />} />
            <Route path="/legal" element={<Navigate to="/impressum" replace />} />
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
              path="/kontakt"
              element={<Suspense fallback={null}><StudioContactPage /></Suspense>}
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
  </HelmetProvider>
);

function LegacyProjectRedirect() {
  const slug = window.location.pathname.split("/").filter(Boolean).at(-1);
  return <Navigate to={slug ? `/studio/projekte/${slug}` : "/studio/projekte"} replace />;
}

export default App;
