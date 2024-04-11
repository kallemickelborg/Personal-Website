import Menu from "./menu";
import React, { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Menu />
      {children}
    </>
  );
};

export default Layout;