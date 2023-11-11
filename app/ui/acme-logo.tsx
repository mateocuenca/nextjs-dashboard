import { BriefcaseIcon } from '@heroicons/react/24/outline';
import { workSans } from './fonts';

export default function AcmeLogo() {
  return (
    <div
      className={`${workSans.className} flex flex-row items-center leading-none text-white`}
    >
      <BriefcaseIcon className="h-12 w-12 rotate-[15deg]" />
      <p className="text-[44px]">Demo</p>
    </div>
  );
}
