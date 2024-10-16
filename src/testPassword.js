/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-require-imports */
const bcrypt = require('bcrypt');

const storedPasswordHash = '$2b$10$PriRRH2Qp5kkNbqGZ46YMugPnUbnssWPknCJfFJ0YuVknjQcR2xvu'; // Hash almacenado
const passwordToCheck = 'mas'; // Contraseña ingresada

bcrypt.compare(passwordToCheck, storedPasswordHash, (err, result) => {
  if (err) throw err;
  console.log('Is password valid:', result); // Debería imprimir "true" si coincide
});