import { Geist, Geist_Mono, Anton, Work_Sans } from "next/font/google";
import "./globals.css";
import Footer from "../components/shared/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
})
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400", // Anton only has one weight
});

export const metadata = {
  title: "All-Weather Football Field in Kodagu",
  description: "\"Let us Build it Together\"",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&display=swap"
          rel="stylesheet"
        />
        <link
  href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap"
  rel="stylesheet"
/>

      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${anton.variable} ${workSans.variable} antialiased`}
      >
        {children}
        <Footer />
      </body>
    </html>
  );
}
