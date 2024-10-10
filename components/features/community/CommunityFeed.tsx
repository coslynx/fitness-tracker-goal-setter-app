import React, { useState, useEffect } from 'react';
import { useUser } from '@lib/hooks/useUser';
import { useGoals } from '@lib/hooks/useGoals';
import { getUserGoals } from '@services/goalService';
import { getCommunityPosts, createCommunityPost } from '@services/communityService';
import { CommunityPost } from '@types/community';
import { Goal } from '@types/goal';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useSettings } from '@lib/hooks/useSettings';
import { useTheme } from 'next-themes';
import { Card } from '@components/ui/Card';
import { Button } from '@components/ui/Button';
import { Input } from '@components/ui/Input';
import { Modal } from '@components/ui/Modal';
import { useForm } from 'react-hook-form';

interface CommunityFeedProps {

}

const CommunityFeed: React.FC<CommunityFeedProps> = () => {
  const { user } = useUser();
  const { data: session } = useSession();
  const router = useRouter();
  const { data: goals, isLoading: goalsLoading } = useGoals();
  const { settings } = useSettings();
  const { theme, setTheme } = useTheme();
  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newPostContent, setNewPostContent] = useState('');
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await getCommunityPosts();
        setCommunityPosts(posts);
      } catch (error) {
        console.error('Error fetching community posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleCreatePost = async (data: { content: string }) => {
    setIsCreatingPost(true);
    try {
      const newPost = await createCommunityPost(data.content);
      setCommunityPosts([newPost, ...communityPosts]);
      setNewPostContent('');
      setIsCreatingPost(false);
    } catch (error) {
      console.error('Error creating community post:', error);
      setIsCreatingPost(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="spinner" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Community</h1>

      {/* Render the community feed */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {communityPosts.map((post) => (
          <Card key={post.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg">
            <p className="text-gray-700 text-lg mb-2">{post.content}</p>
            {/* Add user information, timestamps, likes, etc. */}
          </Card>
        ))}
      </div>

      {/* Display goals for the current user */}
      {user && goals && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Your Goals</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {goals.map((goal: Goal) => (
              <Card key={goal.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg">
                <h3 className="text-gray-900 font-bold text-xl mb-2">{goal.title}</h3>
                <p className="text-gray-700 text-base mb-2">{goal.description}</p>
                {/* Display progress or other goal details */}
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Add a form for creating new posts */}
      {session && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Share your progress</h2>
          <form onSubmit={handleSubmit(handleCreatePost)} className="flex flex-col gap-4">
            <Input
              type="text"
              label="Share your thoughts"
              placeholder="What have you been working on?"
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              {...register('content', { required: 'Post content is required' })}
              error={errors.content?.message}
            />
            <Button type="submit" loading={isCreatingPost}>
              Share
            </Button>
          </form>
        </div>
      )}

      {/* Display the theme switcher */}
      <div className="mt-8">
        <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
          Toggle Theme
        </button>
      </div>
    </div>
  );
};

export default CommunityFeed;