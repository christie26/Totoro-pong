'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavIconProps {
  type: string;
  isAuthPage: boolean;
}

const NavIcon = (props: NavIconProps) => {
  const path = usePathname();

  const isActive = path?.startsWith(`/${props.type}`);

  const baseClass =
    'w-sm h-sm rounded-full flex items-center justify-center mb-[40px]';

  const activeClass =
    isActive && !props.isAuthPage
      ? 'border-3 border-dark-purple hover:bg-light-background'
      : 'border-3 border-default';

  const disabledClass = props.isAuthPage
    ? 'opacity-40 pointer-events-none'
    : 'hover:border-dark-gray hover:bg-light-background';

  const className = `${baseClass} ${activeClass} ${disabledClass}`;

  return (
    <Link href={`/${props.type}`} className={className}>
      <Image
        src={`/icon/${props.type}.svg`}
        alt={`${props.type}-icon`}
        width={27}
        height={27}
        className={props.isAuthPage ? 'grayscale' : ''}
      />
    </Link>
  );
};

export default NavIcon;
