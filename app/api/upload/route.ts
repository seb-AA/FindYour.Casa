import { NextResponse, NextRequest } from 'next/server';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

// Directory to save the uploaded files
const uploadDir = path.join(process.cwd(), '/public/uploads');

// Ensure the directory exists
fs.mkdirSync(uploadDir, { recursive: true });

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  return new Promise((resolve, reject) => {
    const form = formidable({ multiples: true, uploadDir });

    // Convert NextRequest to a readable stream
    const request = new ReadableStream({
      start(controller) {
        req.body.pipeThrough(new TextEncoderStream()).pipeTo(
          new WritableStream({
            write(chunk) {
              controller.enqueue(chunk);
            },
            close() {
              controller.close();
            },
          })
        );
      },
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
