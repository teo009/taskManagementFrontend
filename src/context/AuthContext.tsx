import React from 'react';

import type { UserInterface } from '../types';
import { authApi } from '../api/auth.api';

//import { userService } from '../api/'

interface AuthContextType {
  loading: boolean;
  user: UserInterface | null;
  signOut: () => Promise<void>;
  setUser: React.Dispatch<React.SetStateAction<UserInterface | null>>;
}

const AuthContext = React.createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = React.useState<UserInterface | null>(null);
  const [loading, setLoading] = React.useState(true);

  const signOut = async () => {
    //await supabase.auth.signOut();
  };

  React.useEffect(() => {
    const checkAuth = async () => {
      try {
        const data = await authApi.getMe();
        setUser(data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);


  return (
    <AuthContext.Provider value={{ user, loading, signOut, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => React.useContext(AuthContext);
