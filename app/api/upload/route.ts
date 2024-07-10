import { NextResponse } from 'next/server';
import formidable, { File as FormidableFile } from 'formidable';
import fs from 'fs';
import path from 'path';

// Directory to save the uploaded files
const uploadDir = path.join(process.cwd(), '/public/uploads');

// Ensure the directory exists
fs.mkdirSync(uploadDir, { recursive: true });

// Export runtime configuration
export const runtime = 'nodejs';

export async function POST(request: Request) {
  return new Promise((resolve, reject) => {
    const form = formidable({ multiples: true, uploadDir });

    form.on('fileBegin', (name, file) => {
      const formidableFile = file as unknown as FormidableFile;
      formidableFile.path = path.join(uploadDir, formidableFile.name || '');
    });

    form.parse(request, (err, fields, files) => {
      if (err) {
        reject(NextResponse.json({ error: 'Something went wrong' }, { status: 500 }));
        return;
      }
      resolve(NextResponse.json({ files }));
    });
  });
}
