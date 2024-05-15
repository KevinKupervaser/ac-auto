import React from "react";


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
