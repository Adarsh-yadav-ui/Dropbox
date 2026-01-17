import type { PropsWithChildren } from "react";

const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <main>
        {children}
      </main>
    </div>
  );
};

export default AuthLayout;
