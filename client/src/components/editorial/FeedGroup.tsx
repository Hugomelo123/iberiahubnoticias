import { Story } from '@/lib/mockData';
import { NewsCard } from './NewsCard';

interface FeedGroupProps {
  label: string;
  stories: Story[];
}

export function FeedGroup({ label, stories }: FeedGroupProps) {
  if (stories.length === 0) return null;

  return (
    <div className="mb-12">
      <div className="flex items-center gap-4 mb-6">
        <h4 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          {label}
        </h4>
        <div className="h-px bg-border flex-1" />
      </div>
      
      <div className="grid gap-2">
        {stories.map(story => (
          <NewsCard key={story.id} story={story} />
        ))}
      </div>
    </div>
  );
}
