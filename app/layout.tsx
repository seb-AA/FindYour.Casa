import { Toaster } from "react-hot-toast";
import ClientOnly from "./components/ClientOnly";
import Navbar from "./components/navbar/Navbar";
import "./globals.css";
import { Nunito } from "next/font/google";
import getCurrentUser from "./actions/getCurrentUser";
import LoginModal from "./components/modals/LoginModal";
import RegisterModal from "./components/modals/RegisterModal";
import RentModal from "./components/modals/RentModal";
import SearchModal from "./components/modals/SearchModal";
import useRentModal from "@/app/hooks/useRentModal"; // Import the hook

const font = Nunito({ subsets: ["latin"] });

export const metadata = {
  title: "FindYour.Casa",
  description: "Supercharge the search for your dream property",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  const rentModal = useRentModal(); // Use the hook

  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <Toaster />
          <SearchModal />
          <RegisterModal />
          <RentModal isOpen={rentModal.isOpen} onClose={rentModal.onClose} />
          <LoginModal />
          <Navbar currentUser={currentUser} />
          <div>{children}</div>
        </ClientOnly>
      </body>
    </html>
  );
}
