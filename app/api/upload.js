// pages/api/upload.js

import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadDir = path.join(process.cwd(), '/public/uploads');

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const form = formidable({ multiples: true, uploadDir });

    form.on('fileBegin', (name, file) => {
      file.path = path.join(uploadDir, file.name);
    });

    form.parse(req, (err, fields, files) => {
      if (err) {
        res.status(500).json({ error: 'Something went wrong' });
        return;
      }
      res.status(200).json({ files });
    });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};

export default handler;
