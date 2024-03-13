import React from "react";

const PageContainer = ({ children }: { children: React.ReactNode }) => {
  return <main className="bg-white p-4">{children}</main>;
};

export default PageContainer;
