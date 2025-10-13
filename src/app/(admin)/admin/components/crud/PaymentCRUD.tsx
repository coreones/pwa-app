'use client';

import { useState } from 'react';
import { Payment } from '@/types/admin';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus, Eye, Edit, Trash2 } from 'lucide-react';

interface PaymentCRUDProps {
  searchQuery: string;
}

const mockPayments: Payment[] = [
  {
    id: '1',
    amount: 99.99,
    currency: 'NGN',
    status: 'completed',
    type: 'Airtime purchase',
    userId: '1',
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    amount: 49.99,
    currency: 'NGN',
    status: 'pending',
    type: 'Bet Topup',
    userId: '2',
    createdAt: '2024-01-16'
  },
  {
    id: '3',
    amount: 199.99,
    currency: 'NGN',
    status: 'failed',
    type: 'TV Subscription',
    userId: '3',
    createdAt: '2024-01-17'
  },
  {
    id: '4',
    amount: 29.99,
    currency: 'NGN',
    status: 'completed',
    type: 'Data purchase',
    userId: '1',
    createdAt: '2024-01-18'
  }
];

export default function PaymentCRUD({ searchQuery }: PaymentCRUDProps) {
  const [payments, setPayments] = useState<Payment[]>(mockPayments);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    amount: '',
    currency: 'NGN',
    status: 'pending' as 'completed' | 'pending' | 'failed',
    userId: '',
    type: ''
  });

  const filteredPayments = payments.filter(payment =>
    payment.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    payment.userId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    payment.type?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    payment.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreate = () => {
    const newPayment: Payment = {
      ...formData,
      id: Date.now().toString(),
      amount: parseFloat(formData.amount),
      createdAt: new Date().toISOString().split('T')[0]
    };
    setPayments([...payments, newPayment]);
    setFormData({ amount: '', currency: 'NGN', status: 'pending', userId: '', type: '' });
    setIsCreateDialogOpen(false);
  };

  const handleUpdate = () => {
    if (selectedPayment) {
      const updatedPayments = payments.map(payment =>
        payment.id === selectedPayment.id 
          ? { 
              ...payment, 
              ...formData, 
              amount: parseFloat(formData.amount) 
            } 
          : payment
      );
      setPayments(updatedPayments);
      setSelectedPayment(null);
      setFormData({ amount: '', currency: 'NGN', status: 'pending', userId: '', type: '' });
      setIsEditDialogOpen(false);
    }
  };

  const handleDelete = () => {
    if (selectedPayment) {
      setPayments(payments.filter(payment => payment.id !== selectedPayment.id));
      setSelectedPayment(null);
      setIsDeleteDialogOpen(false);
    }
  };

  const handleView = (payment: Payment) => {
    setSelectedPayment(payment);
    setIsViewDialogOpen(true);
  };

  const handleEdit = (payment: Payment) => {
    setSelectedPayment(payment);
    setFormData({
      amount: payment.amount.toString(),
      currency: payment.currency,
      status: payment.status,
      userId: payment.userId,
      type: payment.type || ''
    });
    setIsEditDialogOpen(true);
  };

  const handleDeleteClick = (payment: Payment) => {
    setSelectedPayment(payment);
    setIsDeleteDialogOpen(true);
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'completed': return 'default';
      case 'pending': return 'secondary';
      case 'failed': return 'destructive';
      default: return 'outline';
    }
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  const PaymentForm = () => (
    <div className="space-y-4">
      <Input
        type="number"
        step="0.01"
        placeholder="Amount"
        value={formData.amount}
        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
      />
      <Input
        placeholder="User ID"
        value={formData.userId}
        onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
      />
      <Input
        placeholder="Payment Type"
        value={formData.type}
        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
      />
      <Select
        value={formData.currency}
        onValueChange={(value) => setFormData({ ...formData, currency: value })}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select currency" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="NGN">NGN (₦)</SelectItem>
        </SelectContent>
      </Select>
      <Select
        value={formData.status}
        onValueChange={(value: 'completed' | 'pending' | 'failed') => setFormData({ ...formData, status: value })}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
          <SelectItem value="failed">Failed</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );

  return (
    <div className="p-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Payments Management</CardTitle>
            <CardDescription>
              View and manage all payment transactions ({filteredPayments.length})
            </CardDescription>
          </div>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Payment
          </Button>
        </CardHeader>
        <CardContent>
          <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-green-600">
                  {formatCurrency(
                    payments.filter(p => p.status === 'completed').reduce((sum, p) => sum + p.amount, 0),
                    'NGN'
                  )}
                </div>
                <p className="text-sm text-muted-foreground">Total Completed</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-yellow-600">
                  {formatCurrency(
                    payments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0),
                    'NGN'
                  )}
                </div>
                <p className="text-sm text-muted-foreground">Total Pending</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-red-600">
                  {payments.filter(p => p.status === 'failed').length}
                </div>
                <p className="text-sm text-muted-foreground">Failed Payments</p>
              </CardContent>
            </Card>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>User ID</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.map((payment) => (
                <TableRow 
                  key={payment.id} 
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleView(payment)}
                >
                  <TableCell className="font-medium">{payment.id}</TableCell>
                  <TableCell className="font-semibold">
                    {formatCurrency(payment.amount, payment.currency)}
                  </TableCell>
                  <TableCell>{payment.type}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(payment.status)}>
                      {payment.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{payment.userId}</TableCell>
                  <TableCell>{payment.createdAt}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleView(payment);
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(payment);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteClick(payment);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Create Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Payment</DialogTitle>
            <DialogDescription>
              Add a new payment record
            </DialogDescription>
          </DialogHeader>
          <PaymentForm />
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreate}>
              Create Payment
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Payment Details</DialogTitle>
            <DialogDescription>
              View payment information
            </DialogDescription>
          </DialogHeader>
          {selectedPayment && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Payment ID</label>
                  <p className="text-sm">{selectedPayment.id}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Amount</label>
                  <p className="text-sm font-semibold">{formatCurrency(selectedPayment.amount, selectedPayment.currency)}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Type</label>
                  <p className="text-sm">{selectedPayment.type}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Status</label>
                  <Badge variant={getStatusVariant(selectedPayment.status)}>
                    {selectedPayment.status}
                  </Badge>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">User ID</label>
                  <p className="text-sm">{selectedPayment.userId}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Created</label>
                  <p className="text-sm">{selectedPayment.createdAt}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Payment</DialogTitle>
            <DialogDescription>
              Update payment information
            </DialogDescription>
          </DialogHeader>
          <PaymentForm />
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdate}>
              Update Payment
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Payment</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this payment? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {selectedPayment && (
            <div className="space-y-2">
              <p><strong>Amount:</strong> {formatCurrency(selectedPayment.amount, selectedPayment.currency)}</p>
              <p><strong>Type:</strong> {selectedPayment.type}</p>
              <p><strong>User ID:</strong> {selectedPayment.userId}</p>
            </div>
          )}
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete Payment
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}