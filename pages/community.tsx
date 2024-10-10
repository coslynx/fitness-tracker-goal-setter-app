import { useState, useEffect } from 'react';
import { useUser } from '@lib/hooks/useUser';
import { useGoals } from '@lib/hooks/useGoals';
import { getUserGoals } from '@services/goalService';
import { getCommunityPosts } from '@services/communityService';
import { CommunityPost } from '@types/community';
import { Goal } from '@types/goal';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useSettings } from '@lib/hooks/useSettings';
import { useTheme } from 'next-themes'; 

const CommunityPage = () => {
  const { user } = useUser();
  const { data: session } = useSession(); 
  const router = useRouter();
  const { data: goals, isLoading: goalsLoading } = useGoals();
  const { settings } = useSettings();
  const { theme, setTheme } = useTheme(); 
  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await getCommunityPosts();
        setCommunityPosts(posts);
      } catch (error) {
        // Handle errors appropriately, displaying an error message or logging the error
        console.error('Error fetching community posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []); 

  // Function to handle creating a new post 
  const handleCreatePost = async (newPostContent: string) => {
    try {
      // Implement the logic to send a new post to the backend API
      // Example using axios:
      const response = await axios.post('/api/community', { content: newPostContent });
      // Update communityPosts with the new post from the response
      setCommunityPosts([response.data, ...communityPosts]);
    } catch (error) {
      // Handle errors appropriately, displaying an error message or logging the error
      console.error('Error creating community post:', error);
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
          <div key={post.id} className="bg-white rounded-lg shadow-md p-4">
            <p className="text-gray-700 text-lg mb-2">{post.content}</p>
            {/* Add user information, timestamps, likes, etc. */}
          </div>
        ))}
      </div>

      {/* Display goals for the current user */}
      {user && goals && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Your Goals</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {goals.map((goal: Goal) => (
              <div key={goal.id} className="bg-white rounded-lg shadow-md p-4">
                <h3 className="text-gray-900 font-bold text-xl mb-2">{goal.title}</h3>
                <p className="text-gray-700 text-base mb-2">{goal.description}</p>
                {/* Display progress or other goal details */}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add a form for creating new posts */}
      {session && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Share your progress</h2>
          <form onSubmit={(e) => {
            e.preventDefault();
            const newPostContent = e.target.elements.newPost.value;
            handleCreatePost(newPostContent);
          }}>
            <div className="flex items-center">
              <textarea
                name="newPost"
                rows={4}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="What have you been working on?"
              />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-4"
              >
                Share
              </button>
            </div>
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

export default CommunityPage;