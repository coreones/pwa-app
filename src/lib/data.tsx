import { User, Post, Payment, SidebarItem } from '@/types/admin';
import { Banknote, Users } from 'lucide-react';

export const mockUsers: User[] = [
  {
    id: '1',
    firstName: 'Tali ',
    lastName: 'Moses',
    email: 'Talinanzing1112020@gmai.com',
    role: 'Admin',
    status: 'active',
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    firstName: 'Tali ',
    lastName: 'Moses',
    email: 'Talinanzing1112020@gmai.com',
    role: 'User',
    status: 'active',
    createdAt: '2024-01-16'
  },
  {
    id: '3',
     firstName: 'Tali ',
    lastName: 'Moses',
    email: 'Talinanzing1112020@gmai.com',
    role: 'User',
    status: 'inactive',
    createdAt: '2024-01-17'
  },
  {
    id: '4',
     firstName: 'Tali ',
    lastName: 'Moses',
    email: 'Talinanzing1112020@gmai.com',
    role: 'User',
    status: 'inactive',
    createdAt: '2024-01-17'
  }
];

export const mockPosts: Post[] = [
  {
    id: '1',
    title: 'Getting Started with Next.js',
    content: 'Learn how to build modern web applications with Next.js...',
    author: 'Tali Moses',
    status: 'published',
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    title: 'TypeScript Best Practices',
    content: 'Improve your TypeScript code quality with these tips...',
    author: 'Law Less',
    status: 'draft',
    createdAt: '2024-01-16'
  }
];

export const mockPayments: Payment[] = [
  {
    id: '1',
    amount: 99.99,
    currency: '₦',
    status: 'completed',
    userId: '1',
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    amount: 49.99,
    currency: '₦',
    status: 'pending',
    userId: '2',
    createdAt: '2024-01-16'
  }
];

export const sidebarItems: SidebarItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊' },
  { id: 'users', label: 'Users', icon: <Users size={24}/>},
  { id: 'payments', label: 'Payments', icon: <Banknote size={24} /> }
];

// CRUD operations
export const userService = {
  getAll: () => mockUsers,
  create: (user: Omit<User, 'id' | 'createdAt'>) => {
    const newUser: User = {
      ...user,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0]
    };
    mockUsers.push(newUser);
    return newUser;
  },
  update: (id: string, updates: Partial<User>) => {
    const index = mockUsers.findIndex(user => user.id === id);
    if (index !== -1) {
      mockUsers[index] = { ...mockUsers[index], ...updates };
      return mockUsers[index];
    }
    return null;
  },
  delete: (id: string) => {
    const index = mockUsers.findIndex(user => user.id === id);
    if (index !== -1) {
      return mockUsers.splice(index, 1)[0];
    }
    return null;
  }
};