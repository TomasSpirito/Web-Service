/* eslint-disable prettier/prettier */
// src/types/express.d.ts
declare global {
    namespace Express {
      interface Request {
        user?: any; // Puedes reemplazar `any` por un tipo más específico si tienes una interfaz de usuario
      }
    }
  }
  