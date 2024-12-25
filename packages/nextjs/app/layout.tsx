import "@rainbow-me/rainbowkit/styles.css";
import { ScaffoldEthAppWithProviders } from "~~/components/ScaffoldEthAppWithProviders";
import { ThemeProvider } from "~~/components/ThemeProvider";
import "~~/styles/globals.css";
import type { Metadata, Viewport } from "next";

const APP_NAME = "think2earn";
const APP_DEFAULT_TITLE = "think2earn";
const APP_TITLE_TEMPLATE = "%s - think2earn";
const APP_DESCRIPTION = "think2earn";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};
const ScaffoldEthApp = ({ children }: { children: React.ReactNode }) => {
  return (
    <html suppressHydrationWarning lang="en" dir="ltr">
      <body className="w-[100vw] overflow-x-hidden">
        <ThemeProvider attribute="class">
          <div className="bg-background">
            <ScaffoldEthAppWithProviders>{children}</ScaffoldEthAppWithProviders>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default ScaffoldEthApp;
