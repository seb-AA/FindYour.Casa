import { NextResponse } from 'next/server';
import nextConnect from 'next-connect';
import type { NextApiRequest, NextApiResponse } from 'next';
import formidable, { File as FormidableFile } from 'formidable';
import fs from 'fs';
import path from 'path';

// Directory to save the uploaded files
const uploadDir = path.join(process.cwd(), '/public/uploads');

// Ensure the directory exists
fs.mkdirSync(uploadDir, { recursive: true });

export const runtime = 'nodejs';

const apiRoute = nextConnect<NextApiRequest, NextApiResponse>({
  onError(error, req, res) {
    res.status(501).json({ error: `Sorry, something went wrong! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.post((req, res) => {
  const form = formidable({ multiples: true, uploadDir });

  form.on('fileBegin', (name, file) => {
    const formidableFile = file as unknown as FormidableFile;
    formidableFile.filepath = path.join(uploadDir, formidableFile.originalFilename || '');
  });

  form.parse(req, (err, fields, files) => {
    if (err) {
      res.status(500).json({ error: 'Something went wrong' });
      return;
    }
    res.status(200).json({ files });
  });
});

export default apiRoute;
