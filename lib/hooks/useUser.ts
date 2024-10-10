import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { User } from "@types/user";
import { getUserSession } from "@lib/api/client";
import { useSettings } from "@lib/hooks/useSettings";
import { useTheme } from "next-themes";
import { ThemeContext } from "@context/ThemeContext";
import { useContext } from "react";

/**
 * @file lib/hooks/useUser.ts
 * @author CosLynx
 * @description Implements a custom React hook for managing the authenticated user within the Fitness Tracker and Goal Setter App.
 * @version 1.0.0
 * @date 2023-10-27
 *
 * This hook provides centralized logic for fetching, storing, and updating user data related to their authentication state. It leverages NextAuth.js for
 * session management and the `apiClient` for API requests. The hook is designed to be reusable and efficient, simplifying user management within the application.
 *
 * The `useUser` hook utilizes the `useSession` hook from NextAuth.js to access the current user session. If the user is logged in, it fetches additional user
 * details from the backend using the `getUserSession` API. The hook maintains the user's data in a state variable and provides functions for updating the user
 * information.
 *
 * @see https://next-auth.js.org/getting-started/client
 * @see https://www.w3.org/WAI/standards-guidelines/wcag/
 */

export const useUser = () => {
  const { data: session } = useSession();
  const { settings, updateSettings } = useSettings();
  const { theme, setTheme } = useContext(ThemeContext);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      if (session && !user) {
        try {
          const response = await getUserSession();
          setUser(response);
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [session, user]);

  // Function to update user settings
  const updateUserSettings = async (updatedSettings: User) => {
    try {
      // Update user data through the API or database
      const response = await updateUserSettings(updatedSettings); // Replace with actual API call
      setUser(response); // Update user state with the updated data
      updateSettings({
        ...settings,
        // Update the settings object with new data from API response
      });
    } catch (error) {
      console.error("Error updating user settings:", error);
    }
  };

  return {
    user,
    isLoading,
    updateUserSettings,
  };
};