/* eslint-disable prettier/prettier */
import * as bcrypt from 'bcrypt';

const storedPasswordHash = '$2b$10$xnXyL3SK5.Crl.qphy5t..wjyqI0UOtgtj860EMk0avwruvW/MD7G'; // Hash del usuario registrado
const passwordToCheck = 'miContraseñaSegura'; // Contraseña que estás probando

bcrypt.compare(passwordToCheck, storedPasswordHash, (err, result) => {
  if (err) throw err;
  console.log('Is password valid:', result); // Esto debería imprimir "true"
});
