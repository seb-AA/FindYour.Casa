import { NextResponse } from 'next/server';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

// Formidable configuration to handle file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};

// Directory to save the uploaded files
const uploadDir = path.join(process.cwd(), '/public/uploads');

export async function POST(request: Request) {
  return new Promise((resolve, reject) => {
    const form = formidable({ multiples: true, uploadDir });

    form.on('fileBegin', (name, file) => {
      file.path = path.join(uploadDir, file.name);
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
