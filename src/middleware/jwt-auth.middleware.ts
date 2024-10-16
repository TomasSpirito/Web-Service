/* eslint-disable prettier/prettier */
// jwt-auth.middleware.ts

import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';

interface RequestWithUser extends Request {
  user?: any; 
}

@Injectable()
export class JwtAuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: RequestWithUser, _: Response, next: () => void) { 
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Token not provided');
    }

    try {
      const decoded = this.jwtService.verify(token);
      req.user = decoded;
      next();
    } catch (error) {
      if (error instanceof Error) {
        throw new UnauthorizedException(`Invalid token: ${error.message}`);
      }
      throw new UnauthorizedException('Invalid token'); // Manejo de error por defecto
    }
  }
}
