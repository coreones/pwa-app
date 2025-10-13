'use client';

import { EntityType } from '@/types/admin';
import Header from './header';
import Dashboard from './Dashboard';
import UserCRUD from './crud/UserCRUD';
import PaymentCRUD from './crud/PaymentCRUD';
import { Card, CardContent } from '@/components/ui/card';

interface MainContentProps {
  activeEntity: EntityType;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function MainContent({ activeEntity, searchQuery, onSearchChange }: MainContentProps) {
  const renderEntityContent = () => {
    switch (activeEntity) {
      case 'dashboard':
        return <Dashboard />;
      case 'users':
        return <UserCRUD searchQuery={searchQuery} />;
      case 'payments':
        return <PaymentCRUD searchQuery={searchQuery} />;
      default:
        return (
          <div className="p-6">
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">Select an entity to manage</p>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      <Header 
        activeEntity={activeEntity}
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
      />
      <main className="flex-1 overflow-auto">
        {renderEntityContent()}
      </main>
    </div>
  );
}