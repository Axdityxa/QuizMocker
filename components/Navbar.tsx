"use client";
import { UserButton, useUser, SignedOut, SignedIn, SignInButton } from "@clerk/nextjs"; // Import necessary components
import Link from "next/link";
import { MdQuiz } from "react-icons/md";
import UserMenu from "./UserMenu";

const Navbar = () => {
  const { isSignedIn } = useUser(); // Use Clerk's hook to check if the user is signed in

  return (
    <div className="pt-5 w-full bg-navbar">
      <div className="max-w-[1500px] mx-auto w-[90%] flex justify-between items-center border-b-2 border-gray-300 pb-5">
        <div>
          <Link href={"/"} className="flex gap-1 items-center text-2xl">
            <h1 className="text-dark font-bold">QuizMocker</h1>
            <MdQuiz className="text-primary" />
          </Link>
        </div>

        <div className="flex items-center gap-3 justify-end">
          <UserMenu />
          {/* Show UserButton when signed in */}
          <SignedIn>
            <UserButton />
          </SignedIn>
          {/* Show SignInButton when signed out */}
          <SignedOut>
            <Link href="/sign-in">
              <SignInButton mode="modal">
                <button className="bg-primary text-white px-4 py-2 rounded-md">
                  Sign In
                </button>
              </SignInButton>
            </Link>
          </SignedOut>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
