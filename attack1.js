const crypto = require('crypto');

function md5(str) {
  return crypto.createHash('md5').update(str).digest('hex');
}

const a = '0110b96270248f746ecca06f1ce09746';

function crack() {
  for (let i = 0; i < 1000000; i++) {
    const pin = String(i).padStart(6, '0');
    if (md5(pin) === a) {
      return pin;
    }
  }
  return null;
}

const start = Date.now();
const pin = crack();
const elapsed = Date.now() - start;
console.log(`PIN: ${pin}`);
console.log(`Spending time: ${(elapsed / 1000).toFixed(3)} s`);
