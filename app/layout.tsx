import type { Metadata } from "next";
import { MantineProvider, Stack, createTheme } from "@mantine/core";
import { Inter } from "next/font/google";
import "@mantine/core/styles.css";

import "./globals.css";
import Navigation from "../components/nav";
import AuthProvider from "../components/authProvider";
import { I18nextProvider } from "react-i18next";
import i18n from "@/utils/i18n";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const theme = createTheme({
  /** Put your mantine theme override here */
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <I18nextProvider i18n={i18n}> */}
        <MantineProvider theme={theme}>
          <AuthProvider>
            <Navigation />
            <Stack m={"xl"} justify="center" w={"100%"}>
              {children}
            </Stack>
          </AuthProvider>
        </MantineProvider>
        {/* </I18nextProvider> */}
      </body>
    </html>
  );
}
