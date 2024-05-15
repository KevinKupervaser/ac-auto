import React from "react";
import FilterProductBar from "../components/FilterProductBar";

interface Props {
  children: React.ReactNode;
}

const HomeLayout = async ({ children }: Props) => {
  return (
    <div>
      {children}
    </div>
  );
};

export default HomeLayout;
