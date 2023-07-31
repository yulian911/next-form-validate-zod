'use client';
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
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { registerSchema } from '@/validators/auth';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Inter } from 'next/font/google';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });
type Input = z.infer<typeof registerSchema>;

export default function Home() {
  const [formStep, setFormStep] = useState(0);
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<Input>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      confirmPassword: '',
      email: '',
      name: '',
      password: '',
      studentId: '',
      year: '',
    },
  });

  // console.log(form.watch());
  async function onSubmit(data: Input) {
    if (data.confirmPassword !== data.password) {
      toast({
        title: 'Passwords do not match',
        variant: 'destructive',
      });
      return;
    }
    try {
      await fetch('/api/form', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.log(error);
    }
    router.replace('/list');
  }
  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-24">
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
              <motion.div
                className={cn('space-y-3', {
                  // hidden: formStep == 1,
                })}
                animate={{
                  translateX: `-${formStep * 100}%`,
                }}
                transition={{
                  ease: 'easeInOut',
                }}>
                {/* name  */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your name..." {...field} />
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
                        <Input placeholder="Enter your email..." {...field} />
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
                        <Input placeholder="Enter your student id..." {...field} />
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
                            <SelectValue placeholder="Select a verified email to display" />
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
              </motion.div>
              <motion.div
                className={cn('space-y-3 absolute top-0 left-0 right-0', {
                  // hidden: formStep == 0,
                })}
                // formStep == 0 -> translateX == 100%
                // formStep == 1 -> translateX == 0
                animate={{
                  translateX: `${100 - formStep * 100}%`,
                }}
                style={{
                  translateX: `${100 - formStep * 100}%`,
                }}
                transition={{
                  ease: 'easeInOut',
                }}>
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your password..." {...field} type="password" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* confirm password */}
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Please confirm your password..."
                          {...field}
                          type="password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>
              <div className="flex gap-2">
                <Button
                  type="submit"
                  className={cn({
                    hidden: formStep == 0,
                  })}>
                  Submit
                </Button>
                <Button
                  type="button"
                  variant={'ghost'}
                  className={cn({
                    hidden: formStep == 1,
                  })}
                  onClick={() => {
                    // validation
                    form.trigger(['email', 'name', 'year', 'studentId']);
                    const emailState = form.getFieldState('email');
                    const nameState = form.getFieldState('name');
                    const yearState = form.getFieldState('year');
                    const idState = form.getFieldState('studentId');

                    if (!emailState.isDirty || emailState.invalid) return;
                    if (!nameState.isDirty || nameState.invalid) return;
                    if (!yearState.isDirty || yearState.invalid) return;
                    if (!idState.isDirty || idState.invalid) return;

                    setFormStep(1);
                  }}>
                  Next Step
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button
                  type="button"
                  variant={'ghost'}
                  onClick={() => {
                    setFormStep(0);
                  }}
                  className={cn({
                    hidden: formStep == 0,
                  })}>
                  Go Back
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
}
