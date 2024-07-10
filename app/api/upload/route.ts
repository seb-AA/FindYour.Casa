import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

const uploadDir = path.join(process.cwd(), '/public/uploads');

export async function POST(req, res) {
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
}

export const config = {
  api: {
    bodyParser: false,
  },
};
