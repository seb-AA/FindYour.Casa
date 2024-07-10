import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename');

  if (!filename) {
    return NextResponse.json({ error: 'Filename is required' }, { status: 400 });
  }

  if (!request.body) {
    return NextResponse.json({ error: 'Request body is empty' }, { status: 400 });
  }

  // Convert the ReadableStream into a Buffer
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let done, value;

  while (!({ done, value } = await reader.read()).done) {
    if (value) {
      chunks.push(value);
    }
  }

  const fileBuffer = Buffer.concat(chunks);

  // Upload the file to Vercel Blob storage
  const blob = await put(filename, fileBuffer, {
    access: 'public',
  });

  return NextResponse.json(blob);
}
