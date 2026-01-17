import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

const SignInPage = () => {
  return (
    <div className="flex min-h-screen">
      {/* Left Panel */}
      <div className="relative w-2/5 bg-[#FF7474] from-pink-500 via-rose-500 to-red-500 p-12 flex flex-col justify-between overflow-hidden not-lg:hidden">
        {/* Decorative background elements */}

        {/* Content wrapper for z-index */}
        <div className="relative z-10 flex flex-col  h-full">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-4">
            <Image
              className="dark drop-shadow-lg"
              src="/logo_dark_mode.svg"
              alt="logo"
              height={180}
              width={250}
            />
          </div>

          {/* Main Content */}
          <div className="space-y-6 flex items-center justify-between">
            <div className="space-y-4">
              <h2 className="text-white text-5xl font-bold leading-tight tracking-tight mt-5 mn-5">
                Manage your files
                <br />
                <span className="bg-clip-text text-transparent bg-linear-to-r from-white to-pink-100">
                  the best way
                </span>
              </h2>
              <p className="text-white text-sm opacity-95 leading-relaxed max-w-md">
                Awesome, we've created the perfect place for you to store all
                your documents securely.
              </p>
            </div>
            <div className="flex justify-center transform hover:scale-105 transition-transform duration-300">
              <Image src="/hero.png" alt="hero" height={250} width={250} />
            </div>
          </div>

          {/* Illustration */}
        </div>
      </div>

      {/* Right Panel - Clerk SignIn */}
      <div className="w-3/5 flex items-center justify-center bg-linear-to-br from-gray-50 to-white not-lg:w-full">
        <div className="w-full max-w-md px-8 mt-4.5">
          <SignIn />

          {/* Additional info */}
         
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
