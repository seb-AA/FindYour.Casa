import { NextResponse, NextRequest } from 'next/server';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

// Directory to save the uploaded files
const uploadDir = path.join('/tmp/uploads');

// Ensure the directory exists
fs.mkdirSync(uploadDir, { recursive: true });

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  if (!req.body) {
    return NextResponse.json({ error: 'Request body is empty' }, { status: 400 });
  }

  const reader = req.body.getReader();
  const chunks: Uint8Array[] = [];
  
  let done, value;
  while (!({ done, value } = await reader.read()).done) {
    if (value) {
      chunks.push(value);
    }
  }
  
  const body = Buffer.concat(chunks);

  return new Promise((resolve, reject) => {
    const form = formidable({ multiples: true, uploadDir });

    form.parse({ ...req, body } as any, (err, fields, files) => {
      if (err) {
        reject(NextResponse.json({ error: 'Something went wrong' }, { status: 500 }));
        return;
      }
      resolve(NextResponse.json({ files }));
    });
  });
}
