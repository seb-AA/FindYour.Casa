import { NextResponse } from 'next/server';
import type { NextApiRequest, NextApiResponse } from 'next';
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

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const form = formidable({ multiples: true, uploadDir });

  form.on('fileBegin', (name, file) => {
    file.filepath = path.join(uploadDir, file.originalFilename || '');
  });

  form.parse(req, (err, fields, files) => {
    if (err) {
      res.status(500).json({ error: 'Something went wrong' });
      return;
    }
    res.status(200).json({ files });
  });
};

export default handler;
