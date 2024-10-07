import Link from "next/link";

const Footer = () => {
  return (
    <footer className="py-5 bg-navbar" >
      <div className="max-w-[1500px] mx-auto w-[90%] text-center justify-center">
        <span className="flex items-center justify-center">
          Copyright © 2024 - All rights reserved by
          <Link href={"/"} className="ml-1">QuizMocker.com</Link>
        </span>
      </div>
    </footer>
  );
};

export default Footer;