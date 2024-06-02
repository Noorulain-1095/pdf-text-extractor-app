import request from 'supertest';
import app from '../app';
import path from 'path';
import fs from 'fs';

describe('POST /api/extract-text', () => {
  it('should return 400 if no file is uploaded', async () => {
    const res = await request(app).post('/api/extract-text');
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('success', false);
    expect(res.body).toHaveProperty('message', 'No file uploaded.');
  });

  it('should return 200 and parsed text if file is uploaded', async () => {
    const filePath = path.join(__dirname, './sample.pdf'); 
    const fileBuffer = fs.readFileSync(filePath);

    const res = await request(app)
      .post('/api/extract-text')
      .attach('file', fileBuffer, 'sample.pdf');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body).toHaveProperty('message', 'PDF parsed successfully.');
    expect(res.body.data).toBeTruthy();
  });

  it('should return 500 if there is an error parsing the PDF', async () => {
    const res = await request(app)
      .post('/api/extract-text')
      .attach('file', Buffer.from('invalid content'), 'invalid.pdf');
    expect(res.status).toBe(500);
    expect(res.body).toHaveProperty('success', false);
    expect(res.body).toHaveProperty('message', 'Error parsing PDF.');
  });
});
