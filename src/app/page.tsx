import { PostFeatured } from '@/Components/PostFeatured';
import { PostsList } from '@/Components/PostsList';
import { SpinLoader } from '@/Components/SpinLoader';
import { Suspense } from 'react';

export default async function Home() {
  return (
    <>
      <Suspense fallback={<SpinLoader />}>
        <PostFeatured />
      </Suspense>
      <Suspense fallback={<SpinLoader />}>
        <PostsList />
      </Suspense>
    </>
  );
}
