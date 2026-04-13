import { NavbarLayout } from '@/components/common/NavbarLayout';

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <NavbarLayout>{children}</NavbarLayout>;
}
