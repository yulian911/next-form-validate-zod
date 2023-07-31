import { client } from '@/lib/client';
import { NextResponse } from 'next/server';

export const DELETE = async (request: Request, { params }: any) => {
  const { id } = params || {};

  const { error } = await client.from('form').delete().eq('id', Number(id));
  if (error) {
    return new NextResponse('Database Error', { status: 500 });
  }
  return NextResponse.json('Data deleted successfully', { status: 200 });
};

export const PATCH = async (request: Request, { params }: any) => {
  const { id } = params || {};
  const { email, name, studentId, year, password, confirmPassword } = await request.json();

  const { error } = await client
    .from('form')
    .update({ email, name, studentId, year, password, confirmPassword })
    .eq('id', Number(id));
  if (error) {
    return new NextResponse('Database Error', { status: 500 });
  }
  return NextResponse.json('Data  successfully updated', { status: 200 });
};
