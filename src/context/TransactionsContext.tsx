
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Event } from '../data/events';

export interface Transaction {
  id: string;
  customerName: string;
  customerEmail: string;
  items: {
    event: Event;
    quantity: number;
  }[];
  totalAmount: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
}

export interface User {
  id: string;
  name: string;
  email: string;
  ticketsPurchased: number;
  lastPurchaseDate: string;
}

interface TransactionsContextType {
  transactions: Transaction[];
  users: User[];
  addTransaction: (transaction: Omit<Transaction, 'id' | 'date'>) => void;
}

const TransactionsContext = createContext<TransactionsContextType | undefined>(undefined);

export const TransactionsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const savedTransactions = localStorage.getItem('transactions');
    return savedTransactions ? JSON.parse(savedTransactions) : [];
  });

  const [users, setUsers] = useState<User[]>(() => {
    const savedUsers = localStorage.getItem('users');
    return savedUsers ? JSON.parse(savedUsers) : [];
  });

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  const addTransaction = (transaction: Omit<Transaction, 'id' | 'date'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: `tx-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      date: new Date().toISOString(),
    };

    setTransactions(prev => [newTransaction, ...prev]);

    // Mettre à jour ou ajouter l'utilisateur
    updateUserFromTransaction(newTransaction);
  };

  const updateUserFromTransaction = (transaction: Transaction) => {
    const { customerName, customerEmail, items, date } = transaction;
    const ticketCount = items.reduce((sum, item) => sum + item.quantity, 0);
    
    setUsers(prevUsers => {
      // Vérifier si l'utilisateur existe déjà (par email)
      const existingUserIndex = prevUsers.findIndex(user => user.email === customerEmail);
      
      if (existingUserIndex >= 0) {
        // Mettre à jour l'utilisateur existant
        const updatedUsers = [...prevUsers];
        const existingUser = updatedUsers[existingUserIndex];
        
        updatedUsers[existingUserIndex] = {
          ...existingUser,
          ticketsPurchased: existingUser.ticketsPurchased + ticketCount,
          lastPurchaseDate: date
        };
        
        return updatedUsers;
      } else {
        // Ajouter un nouvel utilisateur
        const newUser: User = {
          id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          name: customerName,
          email: customerEmail,
          ticketsPurchased: ticketCount,
          lastPurchaseDate: date
        };
        
        return [newUser, ...prevUsers];
      }
    });
  };

  return (
    <TransactionsContext.Provider value={{ transactions, users, addTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
};

export const useTransactions = (): TransactionsContextType => {
  const context = useContext(TransactionsContext);
  if (context === undefined) {
    throw new Error('useTransactions must be used within a TransactionsProvider');
  }
  return context;
};
