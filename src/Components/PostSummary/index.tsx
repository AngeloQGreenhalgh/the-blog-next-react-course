import { formatDistanceToNow, formateDateTime } from '@/utils/format-datetime';
import { PoastHeading } from '../PoastHeading';

type PostSummaryProps = {
  postHeading: 'h1' | 'h2';
  postLink: string;
  createdAt: string;
  title: string;
  excerpt: string;
};

export function PostSummary({
  postHeading,
  postLink,
  createdAt,
  title,
  excerpt,
}: PostSummaryProps) {
  return (
    <div className='flex flex-col gap-4 sm:justify-center'>
      <time
        className='text-slate-600 block text-sm/tight'
        dateTime={createdAt}
        title={formatDistanceToNow(createdAt)}
      >
        {formateDateTime(createdAt)}
      </time>
      <PoastHeading as={postHeading} url={postLink}>
        {title}
      </PoastHeading>
      <p>{excerpt}</p>
    </div>
  );
}
