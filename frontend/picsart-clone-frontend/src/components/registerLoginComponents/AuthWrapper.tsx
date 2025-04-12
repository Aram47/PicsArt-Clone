import { ReactNode } from "react";
import OAuthButton from "./GoogleOAuthButton";

interface AuthWrapperProps {
  title: string;
  children: ReactNode;
  bottomText: ReactNode;
}

const AuthWrapper = ({ title, children, bottomText }: AuthWrapperProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">{title}</h2>

        {children}

        <div className="my-4">
          <hr className="border-t my-4" />
          <p className="text-center text-gray-500 text-sm">или</p>
        </div>

        <OAuthButton />

        <div className="mt-4 text-center">{bottomText}</div>
      </div>
    </div>
  );
};

export default AuthWrapper;
