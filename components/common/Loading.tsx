import { BarLoader } from 'react-spinners';
import Image from 'next/image';

export default function Loading() {
  return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-40">
        <div className="relative">
          <Image
            src="/images/logo3.png"
            alt="Company Logo"
            width={180}
            height={180}
            className="mx-auto my-5"
          />
          <BarLoader
            color="#00586F"
            width={210}
          />
        </div>
      </div>
        )
}
