
import React, { createContext, useContext, useState, useEffect } from 'react';

// Types
export type UserRole = 'user' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User>;
  register: (name: string, email: string, password: string) => Promise<User>;
  logout: () => void;
  isAuthenticated: boolean;
}

// Création du contexte
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock des utilisateurs pour la démo
const mockUsers = [
  { id: '2', name: 'Admin Test', email: 'admin@example.com', password: 'admin123', role: 'admin' as UserRole },
];

// Stockage des utilisateurs enregistrés
const getStoredUsers = () => {
  const stored = localStorage.getItem('registeredUsers');
  return stored ? JSON.parse(stored) : [];
};

const saveStoredUsers = (users: any[]) => {
  localStorage.setItem('registeredUsers', JSON.stringify(users));
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Vérifier si un utilisateur est déjà connecté (stocké dans localStorage)
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const register = async (name: string, email: string, password: string) => {
    return new Promise<User>((resolve, reject) => {
      setTimeout(() => {
        const storedUsers = getStoredUsers();
        
        // Vérifier si l'email existe déjà
        const existingUser = storedUsers.find((u: any) => u.email === email);
        const existingAdmin = mockUsers.find(u => u.email === email);
        
        if (existingUser || existingAdmin) {
          reject(new Error('Cet email est déjà utilisé'));
          return;
        }

        // Créer un nouvel utilisateur
        const newUser = {
          id: `user-${Date.now()}`,
          name: name.trim(),
          email: email.toLowerCase(),
          password: password,
          role: 'user' as UserRole
        };

        // Ajouter l'utilisateur au stockage
        const updatedUsers = [...storedUsers, newUser];
        saveStoredUsers(updatedUsers);

        // Ne pas inclure le mot de passe dans les données utilisateur stockées
        const { password: _, ...userWithoutPassword } = newUser;
        
        setUser(userWithoutPassword);
        localStorage.setItem('user', JSON.stringify(userWithoutPassword));
        resolve(userWithoutPassword);
      }, 500);
    });
  };

  const login = async (email: string, password: string) => {
    // Simulation d'une connexion à l'API
    return new Promise<User>((resolve, reject) => {
      setTimeout(() => {
        // Vérifier si c'est l'admin
        const foundAdmin = mockUsers.find(u => u.email === email && u.password === password);
        
        if (foundAdmin) {
          // Ne pas inclure le mot de passe dans les données utilisateur stockées
          const { password, ...userWithoutPassword } = foundAdmin;
          setUser(userWithoutPassword);
          localStorage.setItem('user', JSON.stringify(userWithoutPassword));
          resolve(userWithoutPassword);
          return;
        }

        // Vérifier parmi les utilisateurs enregistrés
        const storedUsers = getStoredUsers();
        const foundUser = storedUsers.find((u: any) => u.email === email && u.password === password);
        
        if (foundUser) {
          const { password, ...userWithoutPassword } = foundUser;
          setUser(userWithoutPassword);
          localStorage.setItem('user', JSON.stringify(userWithoutPassword));
          resolve(userWithoutPassword);
          return;
        }
        
        // Vérifier si c'est un utilisateur (pattern email@example.com avec password123) - pour la démo
        if (email.endsWith('@example.com') && password === 'password123') {
          // Extraire le nom d'utilisateur de l'email
          const username = email.split('@')[0];
          
          // Créer un utilisateur dynamiquement
          const dynamicUser = {
            id: `user-${Date.now()}`, // ID unique
            name: `${username.charAt(0).toUpperCase()}${username.slice(1)}`, // Première lettre en majuscule
            email: email,
            role: 'user' as UserRole
          };
          
          setUser(dynamicUser);
          localStorage.setItem('user', JSON.stringify(dynamicUser));
          resolve(dynamicUser);
        } else {
          reject(new Error('Identifiants invalides'));
        }
      }, 500); // Simuler un délai réseau
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login, 
      register,
      logout, 
      isAuthenticated: !!user 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth doit être utilisé à l\'intérieur d\'un AuthProvider');
  }
  return context;
};
