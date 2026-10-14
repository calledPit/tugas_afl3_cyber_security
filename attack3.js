const crypto = require('crypto');

function md5(str) {
  return crypto.createHash('md5').update(str).digest('hex');
}

function kdf3(h0) {
  const h1 = md5(h0);
  const h2 = md5(h1);
  const h3 = md5(h2);
  return h3;
}

const c = 'b20f8b0405b88e2b0b50eb3356d34ba7';

function crack() {
  const salts = '0123456789';
  for (const salt of salts) {
    for (let i = 0; i < 1000000; i++) {
      const pin = String(i).padStart(6, '0');
      if (kdf3(salt + pin) === c) {
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
