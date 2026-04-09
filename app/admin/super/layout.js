import AdminNavbar from "./components/Navbar";
export default function RootLayout({ children }) {
  return (
    <>
      <AdminNavbar />
      {children}
    </>
  );
}
