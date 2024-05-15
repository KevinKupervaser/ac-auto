import { authOptions } from "@/config";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import AdminSidebar from "@components/AdminSidebar";

interface Props {
  children: React.ReactNode;
}

const AdminLayout = async ({ children }: Props) => {
  const session = await getServerSession(authOptions);

  const user = session?.user;
  const isAdmin = user?.role === "admin";

  if (!isAdmin) return redirect("/auth/signin");

  return <AdminSidebar>{children}</AdminSidebar>;
};

export default AdminLayout;
