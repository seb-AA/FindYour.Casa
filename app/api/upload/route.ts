import { NextResponse, NextRequest } from 'next/server';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

// Directory to save the uploaded files
const uploadDir = path.join(process.cwd(), '/public/uploads');

// Ensure the directory exists
fs.mkdirSync(uploadDir, { recursive: true });

export const runtime = 'nodejs';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  const buffers = [];

  for await (const chunk of req.body) {
    buffers.push(chunk);
  }

  const body = Buffer.concat(buffers);

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
