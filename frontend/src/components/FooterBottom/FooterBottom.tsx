import Image from "next/image";
import Link from "next/link";

const FooterBottom = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-black text-sm w-full mt-40">
      <div className="w-[90%] m-auto py-5 flex flex-col md:flex-row lg:flex-row justify-between items-center text-gray-600 font-medium">
        <Link href={'/'} className="flex items-center gap-1">
          <Image
            src={
              "https://www.8thwall.com/static/asset/1b6aef2e-8th-Wall-Horizontal-Logo-Purple.svg"
            }
            height="100"
            width="100"
            className="h-60 w-full rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
          <p className="font-bold">AGENT X</p>
        </Link>
      </div>

      <div className="w-[90%] m-auto bg-gray-800 h-px" />

      <div className="w-[90%] m-auto py-5 flex flex-col md:flex-row lg:flex-row justify-between items-center text-white font-medium">
        <p>© ETH SG {year} - Agent-X. All Rights Reserved.</p>
        <p>
          Made with ❤️ by{" "}
          <Link
            href="https://www.linkedin.com/in/codersadhu/"
            className="text-purple-500 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Codersadhu
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default FooterBottom;
