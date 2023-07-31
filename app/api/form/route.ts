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
