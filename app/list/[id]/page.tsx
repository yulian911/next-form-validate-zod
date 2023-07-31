'use client';
import { client } from '@/lib/client';
import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { updateSchema } from '@/validators/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';

export type ItemListType = {
  id: number;
  email: string;
  name: string;
  studentId: string;
  year: string;
};

const ItemUpdate = ({ params: { id } }: any) => {
  const [item, setItem] = useState<ItemListType | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await client.from('form').select('*').eq('id', Number(id));
      setItem(data && data[0]);
    };

    fetchData();
  }, []);

  type Input = z.infer<typeof updateSchema>;

  const form = useForm<Input>({
    resolver: zodResolver(updateSchema),
    defaultValues: {
      email: item?.email,
      name: item?.name,
      studentId: item?.studentId,
      year: item?.year,
    },
  });

  async function onSubmit(data: Input) {
    try {
      await fetch(`/api/form/${item?.id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.log(error);
    }
    router.replace('/list');
  }

  return (
    <div>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Add person</CardTitle>
          <CardDescription>Start the journey with us today.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="relative space-y-3 overflow-x-hidden">
              <div className={cn('space-y-3', {})}>
                {/* name  */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full name</FormLabel>
                      <FormControl>
                        <Input placeholder={`${item?.name}`} {...field} />
                      </FormControl>
                      <FormDescription>This is your public display name.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder={`${item?.email}`} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* student id */}
                <FormField
                  control={form.control}
                  name="studentId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Student ID</FormLabel>
                      <FormControl>
                        <Input placeholder={`${item?.studentId}`} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* year */}
                <FormField
                  control={form.control}
                  name="year"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Year of study</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={`${item?.year}`} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {[10, 11, 12, 13].map(year => {
                            return (
                              <SelectItem value={year.toString()} key={year}>
                                Year {year}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex gap-2">
                <Button type="submit">Submit</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ItemUpdate;
