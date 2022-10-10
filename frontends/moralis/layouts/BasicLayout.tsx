import { ReactNode } from "react";
import { Header } from "../components/Header";

interface BasicLayoutProps {
  children?: ReactNode
}

export const BasicLayout = ({children}: BasicLayoutProps) => {
  return <>
    <Header />
    {children}
  </>
};