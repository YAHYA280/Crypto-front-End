import Image from 'next/image';
import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
      <Image src={'/icons/logo.png'} height={300} width={300} alt="Logo" className="h-[50px] w-[50px]" />
      <span className="text-lg hidden sm:flex font-semibold">Crypto Architect</span>
    </Link>
  );
}
