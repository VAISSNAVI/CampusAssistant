import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { registerSchema, loginSchema } from '@campus-assistant/validation';
import { dbService } from '../services/db.service';
import { AuthenticatedRequest } from '../middleware/auth.middleware';

const JWT_SECRET = process.env.JWT_SECRET || 'super-secure-jwt-secret-for-campus-assistant-krce';
const JWT_EXPIRES_IN = '7d';

export async function register(req: Request, res: Response) {
  const data = registerSchema.parse(req.body);

  const existing = await dbService.findUserByEmail(data.email);
  if (existing) {
    return res.status(400).json({ error: 'An account with this email already exists.' });
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(data.password, salt);

  const user = await dbService.createUser({
    name: data.name,
    email: data.email,
    passwordHash,
    role: 'STUDENT',
    departmentId: data.departmentId,
    year: data.year,
  });

  const token = jwt.sign(
    { id: user.id, email: user.email, name: user.name, role: user.role },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );

  return res.status(201).json({
    user: { id: user.id, name: user.name, email: user.email, role: user.role, year: user.year },
    token,
  });
}

export async function login(req: Request, res: Response) {
  const data = loginSchema.parse(req.body);

  const user = await dbService.findUserByEmail(data.email);
  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password.' });
  }

  const isMatch = await bcrypt.compare(data.password, user.passwordHash);
  if (!isMatch) {
    return res.status(401).json({ error: 'Invalid email or password.' });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, name: user.name, role: user.role },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );

  return res.json({
    user: { id: user.id, name: user.name, email: user.email, role: user.role, year: user.year },
    token,
  });
}

export async function getMe(req: AuthenticatedRequest, res: Response) {
  if (!req.user) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  const user = await dbService.findUserById(req.user.id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  return res.json({
    user: { id: user.id, name: user.name, email: user.email, role: user.role, year: user.year },
  });
}

export async function logout(req: Request, res: Response) {
  return res.json({ message: 'Signed out successfully' });
}

export async function forgotPassword(req: Request, res: Response) {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email is required' });
  return res.json({
    message: 'If the email exists in our records, password recovery instructions have been sent.',
  });
}
