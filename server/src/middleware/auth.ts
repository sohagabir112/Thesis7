import type { Request, Response, NextFunction } from "express";
import { auth } from "../auth.js";
import { fromNodeHeaders } from "better-auth/node";

export interface AuthPayload {
  id: string;
  email: string;
  role: string;
}

// Extend Express Request
declare global {
  namespace Express {
    interface Request {
      user?: AuthPayload;
    }
  }
}

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers)
    });
    
    if (!session) {
      res.status(401).json({ error: "Authentication required" });
      return;
    }

    req.user = {
      id: session.user.id,
      email: session.user.email,
      role: "user"
    };
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid session" });
  }
}

/** Optional auth — attaches user if token present, but doesn't block */
export async function optionalAuth(req: Request, _res: Response, next: NextFunction) {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers)
    });
    
    if (session) {
      req.user = {
        id: session.user.id,
        email: session.user.email,
        role: "user"
      };
    }
  } catch {
    // Ignore invalid tokens for optional auth
  }
  next();
}
