import NavigationHeader from '@/components/common/header/NavigationHeader';

export default function MenuDetailLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    menuNo: string;
  };
}) {
  return (
    <div className="pb-24">
      <NavigationHeader />
      {children}
    </div>
  );
}
