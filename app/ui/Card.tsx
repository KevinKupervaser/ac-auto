import React from "react";

interface Props {
  children: React.ReactNode;
}

const Card = ({ children }: Props) => {
  return (
    <div className="max-w-[270px] mx-auto rounded-lg shadow-lg">
      {children}
    </div>
  );
};

export default Card;
