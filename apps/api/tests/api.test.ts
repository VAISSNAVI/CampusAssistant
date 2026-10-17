import request from 'supertest';
import { createApp } from '../src/app';

const app = createApp();

describe('Campus Assistant API Tests', () => {
  it('GET /health returns healthy status', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('healthy');
  });

  it('GET /api/content returns KRCE campus content bundle', async () => {
    const res = await request(app).get('/api/content');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('categories');
    expect(res.body).toHaveProperty('documents');
    expect(res.body).toHaveProperty('procedures');
    expect(res.body).toHaveProperty('contacts');
    expect(res.body).toHaveProperty('notices');
    expect(res.body).toHaveProperty('events');
    expect(res.body.categories.length).toBeGreaterThan(0);
  });

  it('POST /api/auth/login authenticates test student account', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'student@krce.ac.in', password: 'Student@12345' });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(res.body.user.email).toBe('student@krce.ac.in');
  });

  it('POST /api/auth/login rejects incorrect password', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'student@krce.ac.in', password: 'WrongPassword' });
    expect(res.status).toBe(401);
  });

  it('GET /api/search finds relevant campus items', async () => {
    const res = await request(app).get('/api/search?q=library');
    expect(res.status).toBe(200);
    expect(res.body.items.length).toBeGreaterThan(0);
    expect(res.body.items[0]).toHaveProperty('_type');
  });

  it('POST /api/assistant/chat returns grounded response with sources', async () => {
    const res = await request(app)
      .post('/api/assistant/chat')
      .send({ question: 'Where is KRCE located?' });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('answer');
    expect(res.body).toHaveProperty('sources');
    expect(res.body.sources.length).toBeGreaterThan(0);
  });

  it('POST /api/assistant/chat returns safe fallback for out-of-domain query', async () => {
    const res = await request(app)
      .post('/api/assistant/chat')
      .send({ question: 'What is the recipe for chocolate fudge cake?' });
    expect(res.status).toBe(200);
    expect(res.body.answer).toContain('could not find official information');
  });
});
