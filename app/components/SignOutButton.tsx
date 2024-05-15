import { signOut } from "next-auth/react";
import React from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const SignOutButton = ({ children, className }: Props) => {
  return (
    <div
      className={className}
      onClick={async () => {
        await signOut();
      }}
    >
      {children}
    </div>
  );
};

export default SignOutButton;
