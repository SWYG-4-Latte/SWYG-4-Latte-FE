import NavigationHeader from '@/components/common/header/NavigationHeader';
import SearchInput from '@/components/search/SearchInput';
import SearchMainContainer from '@/container/search/SearchMainContainer';

export const dynamic = 'force-dynamic';

export default function SearchPage() {
  return (
    <>
      <NavigationHeader>
        <SearchInput />
      </NavigationHeader>
      <div className="pt-14">
        <SearchMainContainer />
      </div>
    </>
  );
}
