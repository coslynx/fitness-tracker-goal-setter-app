import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@lib/hooks/useUser';
import { useSettings } from '@lib/hooks/useSettings';
import { updateUserProfile } from '@services/userService';
import { useForm } from 'react-hook-form';

const SettingsPage = () => {
  const router = useRouter();
  const { user, isLoading: userLoading } = useUser();
  const { settings, updateSettings } = useSettings();
  const [isUpdating, setIsUpdating] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    if (user) {
      reset({
        name: user.name || '',
        email: user.email || '',
        // ... other user settings
      });
    }
  }, [user, reset]);

  const onSubmit = async (data) => {
    setIsUpdating(true);
    try {
      await updateUserProfile(data);
      updateSettings({
        ...settings,
        // ... updated settings from API response
      });
      setIsUpdating(false);
      router.refresh(); // Refresh the current route to reflect updates
    } catch (error) {
      // Handle errors appropriately, displaying an error message or logging the error
      console.error('Error updating user profile:', error);
      setIsUpdating(false);
    }
  };

  if (userLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        {/* Render a loading spinner while user data is being fetched */}
        <div className="spinner" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">User Settings</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            {...register('name', { required: true })}
          />
          {errors.name && <span className="text-red-500 text-sm">Name is required</span>}
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            {...register('email', { required: true })}
            disabled={isUpdating}
          />
          {errors.email && <span className="text-red-500 text-sm">Email is required</span>}
        </div>
        {/* Add other settings fields */}
        <div className="flex items-center justify-end mt-4">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={isUpdating}
          >
            {isUpdating ? 'Updating...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SettingsPage;