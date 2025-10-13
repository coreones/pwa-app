import {  Transaction, BankAccount, SidebarItem } from '@/types/admin';
import { Banknote, Users, Wallet as WalletIcon } from 'lucide-react';
import { User,Wallet } from '@/types/api';

export const mockUsers: User[] = [
  {
    id: 1,
    uid: 'USR-001',
    username: 'talimoses',
    email: 'talinanzing1112020@gmail.com',
    phone: '+2348012345678',
    password: 'hashed_password_123',
    firstname: 'Tali',
    lastname: 'Moses',
    middlename: 'Nanzing',
    referral_code: 'REF-TALI001',
    referrer_id: null,
    gender: 'male',
    type: 'admin',
    dob: '1990-05-15',
    photo: null,
    device_code: 'DEV-001',
    pnd: false,
    level: '5',
    pin: '1234',
    bank_provider_id: 'BANK-001',
    house_number: '123',
    street: 'Main Street',
    city: 'Lagos',
    state: 'Lagos',
    country: 'Nigeria',
    zipcode: '100001',
    address: '123 Main Street, Lagos, Nigeria',
    phone_verification_otp: '123456',
    phone_verified: '1',
    email_verification_otp: '654321',
    email_verified: '1',
    bvn: '12345678901',
    bvn_verification_status: '1',
    bvn_data: JSON.stringify({ verified: true, name: 'Tali Moses' }),
    nin: '12345678901',
    nin_verification_status: '1',
    nin_data: JSON.stringify({ verified: true, name: 'Tali Moses' }),
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z',
    deleted_at: null
  },
  {
    id: 2,
    uid: 'USR-002',
    username: 'johndoe',
    email: 'johndoe@example.com',
    phone: '+2348098765432',
    password: 'hashed_password_456',
    firstname: 'John',
    lastname: 'Doe',
    middlename: null,
    referral_code: 'REF-JOHN002',
    referrer_id: 1,
    gender: 'male',
    type: 'user',
    dob: '1992-08-20',
    photo: null,
    device_code: 'DEV-002',
    pnd: false,
    level: '3',
    pin: '5678',
    bank_provider_id: 'BANK-002',
    house_number: '456',
    street: 'Broadway',
    city: 'Abuja',
    state: 'FCT',
    country: 'Nigeria',
    zipcode: '900001',
    address: '456 Broadway, Abuja, Nigeria',
    phone_verification_otp: '234567',
    phone_verified: '1',
    email_verification_otp: '765432',
    email_verified: '1',
    bvn: '23456789012',
    bvn_verification_status: '1',
    bvn_data: JSON.stringify({ verified: true, name: 'John Doe' }),
    nin: null,
    nin_verification_status: '0',
    nin_data: null,
    created_at: '2024-01-16T11:30:00Z',
    updated_at: '2024-01-16T11:30:00Z',
    deleted_at: null
  },
  {
    id: 3,
    uid: 'USR-003',
    username: 'janesmith',
    email: 'janesmith@example.com',
    phone: '+2348055512345',
    password: 'hashed_password_789',
    firstname: 'Jane',
    lastname: 'Smith',
    middlename: 'Marie',
    referral_code: 'REF-JANE003',
    referrer_id: 1,
    gender: 'female',
    type: 'user',
    dob: '1995-03-10',
    photo: null,
    device_code: 'DEV-003',
    pnd: true,
    level: '2',
    pin: '9012',
    bank_provider_id: 'BANK-003',
    house_number: '789',
    street: 'Oak Avenue',
    city: 'Port Harcourt',
    state: 'Rivers',
    country: 'Nigeria',
    zipcode: '500001',
    address: '789 Oak Avenue, Port Harcourt, Nigeria',
    phone_verification_otp: '345678',
    phone_verified: '1',
    email_verification_otp: '876543',
    email_verified: '1',
    bvn: '34567890123',
    bvn_verification_status: '0',
    bvn_data: null,
    nin: '34567890123',
    nin_verification_status: '1',
    nin_data: JSON.stringify({ verified: true, name: 'Jane Smith' }),
    created_at: '2024-01-17T09:15:00Z',
    updated_at: '2024-01-17T09:15:00Z',
    deleted_at: null
  },
  {
    id: 4,
    uid: 'USR-004',
    username: 'mikejohnson',
    email: 'mikejohnson@example.com',
    phone: '+2348033344455',
    password: 'hashed_password_012',
    firstname: 'Mike',
    lastname: 'Johnson',
    middlename: null,
    referral_code: 'REF-MIKE004',
    referrer_id: 2,
    gender: 'male',
    type: 'user',
    dob: '1988-12-05',
    photo: null,
    device_code: 'DEV-004',
    pnd: false,
    level: '4',
    pin: '3456',
    bank_provider_id: 'BANK-004',
    house_number: '321',
    street: 'Pine Street',
    city: 'Ibadan',
    state: 'Oyo',
    country: 'Nigeria',
    zipcode: '200001',
    address: '321 Pine Street, Ibadan, Nigeria',
    phone_verification_otp: '456789',
    phone_verified: '0',
    email_verification_otp: '987654',
    email_verified: '1',
    bvn: '45678901234',
    bvn_verification_status: '1',
    bvn_data: JSON.stringify({ verified: true, name: 'Mike Johnson' }),
    nin: null,
    nin_verification_status: '0',
    nin_data: null,
    created_at: '2024-01-18T14:20:00Z',
    updated_at: '2024-01-18T14:20:00Z',
    deleted_at: null
  },
  {
    id: 5,
    uid: 'USR-005',
    username: 'sarahwilson',
    email: 'sarahwilson@example.com',
    phone: '+2348077788899',
    password: 'hashed_password_345',
    firstname: 'Sarah',
    lastname: 'Wilson',
    middlename: 'Grace',
    referral_code: 'REF-SARAH005',
    referrer_id: null,
    gender: 'female',
    type: 'user',
    dob: '1993-07-25',
    photo: null,
    device_code: 'DEV-005',
    pnd: false,
    level: '1',
    pin: '7890',
    bank_provider_id: null,
    house_number: '654',
    street: 'Maple Road',
    city: 'Kano',
    state: 'Kano',
    country: 'Nigeria',
    zipcode: '700001',
    address: '654 Maple Road, Kano, Nigeria',
    phone_verification_otp: '567890',
    phone_verified: '1',
    email_verification_otp: '098765',
    email_verified: '0',
    bvn: null,
    bvn_verification_status: '0',
    bvn_data: null,
    nin: null,
    nin_verification_status: '0',
    nin_data: null,
    created_at: '2024-01-19T16:45:00Z',
    updated_at: '2024-01-19T16:45:00Z',
    deleted_at: null
  }
];

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    userId: '1',
    reference: 'REF-001',
    type: 'credit',
    action: 'deposit',
    amount: 50000,
    fee: 50,
    balanceBefore: 100000,
    balanceAfter: 149950,
    status: 'completed',
    wallet: 'main',
    description: 'Bank Transfer Deposit',
    createdAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    userId: '2',
    reference: 'REF-002',
    type: 'debit',
    action: 'withdrawal',
    amount: 20000,
    fee: 100,
    balanceBefore: 95000,
    balanceAfter: 74900,
    status: 'completed',
    wallet: 'main',
    description: 'ATM Withdrawal',
    createdAt: '2024-01-16T14:45:00Z'
  },
  {
    id: '3',
    userId: '3',
    reference: 'REF-003',
    type: 'credit',
    action: 'transfer',
    amount: 15000,
    fee: 10,
    balanceBefore: 10000,
    balanceAfter: 24990,
    status: 'pending',
    wallet: 'main',
    description: 'Peer-to-Peer Transfer',
    createdAt: '2024-01-17T09:15:00Z'
  },
  {
    id: '4',
    userId: '1',
    reference: 'REF-004',
    type: 'debit',
    action: 'payment',
    amount: 25000,
    fee: 25,
    balanceBefore: 149950,
    balanceAfter: 124925,
    status: 'failed',
    wallet: 'main',
    description: 'Bill Payment - Electricity',
    createdAt: '2024-01-18T16:20:00Z'
  },
  {
    id: '5',
    userId: '4',
    reference: 'REF-005',
    type: 'credit',
    action: 'deposit',
    amount: 75000,
    fee: 75,
    balanceBefore: 0,
    balanceAfter: 74925,
    status: 'completed',
    wallet: 'main',
    description: 'Mobile Money Deposit',
    createdAt: '2024-01-19T11:10:00Z'
  }
];

export const mockWallets: Wallet[] = [
  {
    id: '1',
    userId: '1',
    balance: 124925,
    locked: 5000,
    totalBalance: 129925,
    user: mockUsers[0],
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    userId: '2',
    balance: 74900,
    locked: 2000,
    totalBalance: 76900,
    user: mockUsers[1],
    createdAt: '2024-01-16'
  },
  {
    id: '3',
    userId: '3',
    balance: 24990,
    locked: 1000,
    totalBalance: 25990,
    user: mockUsers[2],
    createdAt: '2024-01-17'
  },
  {
    id: '4',
    userId: '4',
    balance: 74925,
    locked: 3000,
    totalBalance: 77925,
    user: mockUsers[3],
    createdAt: '2024-01-18'
  },
  {
    id: '5',
    userId: '5',
    balance: 0,
    locked: 0,
    totalBalance: 0,
    user: mockUsers[4],
    createdAt: '2024-01-19'
  }
];

export const mockBankAccounts: BankAccount[] = [
  {
    id: '1',
    userId: '1',
    bankName: 'Guaranty Trust Bank',
    bankCode: '058',
    accountName: 'Tali Moses',
    accountNumber: '0123456789',
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    userId: '2',
    bankName: 'Access Bank',
    bankCode: '044',
    accountName: 'John Doe',
    accountNumber: '9876543210',
    createdAt: '2024-01-16'
  },
  {
    id: '3',
    userId: '3',
    bankName: 'Zenith Bank',
    bankCode: '057',
    accountName: 'Jane Smith',
    accountNumber: '4561237890',
    createdAt: '2024-01-17'
  },
  {
    id: '4',
    userId: '4',
    bankName: 'First Bank',
    bankCode: '011',
    accountName: 'Mike Johnson',
    accountNumber: '7890123456',
    createdAt: '2024-01-18'
  }
];

export const sidebarItems: SidebarItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊' },
  { id: 'users', label: 'Users', icon: <Users size={20}/> },
  { id: 'transactions', label: 'Transactions', icon: <Banknote size={20} /> },
  { id: 'wallets', label: 'Wallets', icon: <WalletIcon size={20} /> }
];

// User CRUD operations (Only Users have create functionality)
export const userService = {
  getAll: () => mockUsers,
  create: (user: Omit<User, 'id' | 'created_at' | 'updated_at'>) => {
    const newUser: User = {
      ...user,
      id: mockUsers.length + 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    mockUsers.push(newUser);
    return newUser;
  },
  update: (id: number, updates: Partial<User>) => {
    const index = mockUsers.findIndex(user => user.id === id);
    if (index !== -1) {
      mockUsers[index] = { 
        ...mockUsers[index], 
        ...updates,
        updated_at: new Date().toISOString()
      };
      return mockUsers[index];
    }
    return null;
  },
  delete: (id: number) => {
    const index = mockUsers.findIndex(user => user.id === id);
    if (index !== -1) {
      const deletedUser = mockUsers[index];
      mockUsers[index] = {
        ...deletedUser,
        deleted_at: new Date().toISOString()
      };
      return deletedUser;
    }
    return null;
  }
};

// Transaction operations (Read, Update, Delete only)
export const transactionService = {
  getAll: () => mockTransactions,
  update: (id: string, updates: Partial<Transaction>) => {
    const index = mockTransactions.findIndex(transaction => transaction.id === id);
    if (index !== -1) {
      mockTransactions[index] = { ...mockTransactions[index], ...updates };
      return mockTransactions[index];
    }
    return null;
  },
  delete: (id: string) => {
    const index = mockTransactions.findIndex(transaction => transaction.id === id);
    if (index !== -1) {
      return mockTransactions.splice(index, 1)[0];
    }
    return null;
  }
};

// Wallet operations (Read, Update, Delete only)
export const walletService = {
  getAll: () => mockWallets,
  update: (id: string, updates: Partial<Wallet>) => {
    const index = mockWallets.findIndex(wallet => wallet.id === id);
    if (index !== -1) {
      mockWallets[index] = { ...mockWallets[index], ...updates };
      return mockWallets[index];
    }
    return null;
  },
  delete: (id: string) => {
    const index = mockWallets.findIndex(wallet => wallet.id === id);
    if (index !== -1) {
      return mockWallets.splice(index, 1)[0];
    }
    return null;
  }
};