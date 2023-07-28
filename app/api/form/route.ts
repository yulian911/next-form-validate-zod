import { client } from '@/lib/client';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { email, name, studentId, year, password, confirmPassword } = await request.json();

  try {
    const { data } = await client
      .from('form')
      .insert({ email, name, studentId, year, password, confirmPassword })
      .select();
    return NextResponse.json(data);
  } catch (error) {
    return new NextResponse('Database Error', { status: 500 });
  }
}

export const DELETE = async (request: Request, { params }: any) => {
  const { id } = params?.id || {};

  const { error } = await client.from('form').delete().eq('id', 2);
  if (error) {
    return new NextResponse('Database Error', { status: 500 });
  }
  return NextResponse.json('Data deleted successfully', { status: 200 });
};

export const PATCH = async (request: Request, { params }: any) => {
  const { id } = params?.id || {};
  const { email, name, studentId, year, password, confirmPassword } = await request.json();

  const { error } = await client
    .from('form')
    .update({ email, name, studentId, year, password, confirmPassword })
    .eq('id', 3);
  if (error) {
    return new NextResponse('Database Error', { status: 500 });
  }
  return NextResponse.json('Data  successfully updated', { status: 200 });
};
