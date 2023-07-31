'use client';
import ItemFormList from '@/components/ItemFormList';
import { Card } from '@/components/ui/card';
import { client } from '@/lib/client';
import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';

export type FormsListType = {
  id: number;
  email: string;
  name: string;
  studentId: string;
  year: string;
  password: string;
  confirmPassword: string;
};

const PersonList = () => {
  const [loading, setLoading] = useState(false);
  const [formsList, setFormsList] = useState<FormsListType[] | null>(null);
  const router = useRouter();
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const result = await client.from('form').select('*');

        setFormsList(result.data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  const deleteItem = async (id: number) => {
    try {
      await fetch(`api/form/${id}`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.log(error);
    } finally {
      window.location.reload();
    }
  };
  if (formsList?.length === 0)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>0 items</p>
      </div>
    );

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className=" animate-spin" size={40} />
      </div>
    );

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="min-w-[950px]">
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>StudentId</TableHead>
              <TableHead>Year</TableHead>
              <TableHead>Password</TableHead>
              <TableHead>ConfirmPassword</TableHead>

              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {formsList?.map(form => {
              return (
                <TableRow>
                  <TableCell className="font-medium">{form.id}</TableCell>
                  <TableCell>{form.name}</TableCell>
                  <TableCell>{form.email}</TableCell>
                  <TableCell className="text-right">{form.studentId}</TableCell>
                  <TableCell className="font-medium">{form.year}</TableCell>
                  <TableCell>{form.password}</TableCell>
                  <TableCell>{form.confirmPassword}</TableCell>

                  <TableCell className="flex gap-3 ">
                    <Button onClick={() => router.replace(`/list/${form.id}`)}>Update</Button>
                    <Button onClick={() => deleteItem(form.id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default PersonList;
