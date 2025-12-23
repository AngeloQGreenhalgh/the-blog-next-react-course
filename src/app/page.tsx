import { PostFeatured } from '@/Components/PostFeatured';
import { PostsList } from '@/Components/PostsList';
import { SpinLoader } from '@/Components/SpinLoader';
import { Suspense } from 'react';

export default async function Home() {
  return (
    <>
      <Suspense fallback={<SpinLoader className='min-h-20 mb-16' />}>
        <PostFeatured />
        <PostsList />
      </Suspense>
    </>
  );
}
