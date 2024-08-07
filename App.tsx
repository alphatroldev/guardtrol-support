import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { I18nProvider } from "./src/_metronic/i18n/i18nProvider";
import {
  LayoutProvider,
  LayoutSplashScreen,
} from "./src/_metronic/layout/core";
import { MasterInit } from "./src/_metronic/layout/MasterInit";
import { ThemeModeProvider } from "./src/_metronic/partials";
import { SocketProvider } from "./src/hooks/useSocket";

const App = () => {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <I18nProvider>
        <LayoutProvider>
          <ThemeModeProvider>
            <SocketProvider>
              <Outlet />
            </SocketProvider>
            <MasterInit />
          </ThemeModeProvider>
        </LayoutProvider>
      </I18nProvider>
    </Suspense>
  );
};

export { App };
