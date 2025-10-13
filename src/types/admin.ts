import { ReactNode } from "react";

export interface FileItem {
  id: number;
  name: string;
  type: "file" | "folder";
  icon: IconName;
  children?: FileItem[];
}

export type IconName =
  | "Folder"
  | "FileCode"
  | "FileText"
  | "FileJson"
  | "ChevronRight"
  | "ChevronDown";

export interface StatsCard {
  title: string;
  value: string;
  change: string;
  color: "blue" | "green" | "purple" | "orange";
}

export interface ActivityItem {
  action: string;
  user: string;
  time: string;
}

export interface QuickAction {
  name: string;
  icon: string;
  color: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  fullName?: string;
  email: string;
  role: string;
  status: "active" | "inactive";
  createdAt: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  status: "published" | "draft";
  createdAt: string;
}

export interface Payment {
  id: string;
  amount: number;
  currency: string;
  status: "completed" | "pending" | "failed";
  userId: string;
  type?: string;
  createdAt: string;
}

export type CRUDAction = "create" | "read" | "update" | "delete";
export type EntityType = "users" | "payments" | "dashboard";

export interface SidebarItem {
  id: EntityType;
  label: string;
  icon: ReactNode;
}
