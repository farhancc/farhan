import { headers } from 'next/headers';
import { OSContainer } from '@/components/os/OSContainer';
import { MobilePortfolio } from '@/components/mobile/MobilePortfolio';

export default async function Home() {
  const headersList = await headers();
  const userAgent = headersList.get('user-agent') || '';
  const isMobile = /mobile/i.test(userAgent) || /android/i.test(userAgent) || /iphone/i.test(userAgent);

  if (isMobile) {
    return <MobilePortfolio />;
  }

  return <OSContainer />;
}
