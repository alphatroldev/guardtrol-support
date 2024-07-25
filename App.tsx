import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { I18nProvider } from "./src/_metronic/i18n/i18nProvider";
import {
  LayoutProvider,
  LayoutSplashScreen,
} from "./src/_metronic/layout/core";
import { MasterInit } from "./src/_metronic/layout/MasterInit";
import { AuthInit } from "./src/modules/auth";
import { ThemeModeProvider } from "./src/_metronic/partials";

const App = () => {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <I18nProvider>
        <LayoutProvider>
          <ThemeModeProvider>
            <Outlet />
            <MasterInit />
          </ThemeModeProvider>
        </LayoutProvider>
      </I18nProvider>
    </Suspense>
  );
};

export { App };
