import { NextResponse } from 'next/server';
import type { NextApiRequest, NextApiResponse } from 'next';
import { IncomingMessage, ServerResponse } from 'http';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

// Directory to save the uploaded files
const uploadDir = path.join(process.cwd(), '/public/uploads');

// Ensure the directory exists
fs.mkdirSync(uploadDir, { recursive: true });

export const runtime = 'nodejs';

export async function POST(req: IncomingMessage, res: ServerResponse) {
  const form = formidable({ multiples: true, uploadDir });

  return new Promise((resolve, reject) => {
    form.on('fileBegin', (name, file) => {
      const formidableFile = file as unknown as formidable.File;
      formidableFile.filepath = path.join(uploadDir, formidableFile.originalFilename || '');
    });

    form.parse(req, (err, fields, files) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Something went wrong' }));
        return reject(err);
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ files }));
      resolve({ fields, files });
    });
  });
}
