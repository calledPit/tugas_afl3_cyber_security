// AFL-3 #2 - Brute-force MD5(salt || PIN), salt 1 digit unknown
const crypto = require('crypto');

function md5(str) {
  return crypto.createHash('md5').update(str).digest('hex');
}

const b = '8d4c531eb4b0f54df72aa6839abbeaec';

function crack() {
  const salts = '0123456789';
  for (const salt of salts) {
    for (let i = 0; i < 1000000; i++) {
      const pin = String(i).padStart(6, '0');
      if (md5(salt + pin) === b) {
        return { salt, pin };
      }
    }
  }
  return { salt: null, pin: null };
}

const start = Date.now();
const { salt, pin } = crack();
const elapsed = Date.now() - start;
console.log(`SALT=${salt}, PIN: ${pin}`);
console.log(`Spending time: ${(elapsed / 1000).toFixed(3)} s`);
