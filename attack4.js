const crypto = require('crypto');
const fs = require('fs');

function md5(str) {
  return crypto.createHash('md5').update(str).digest('hex');
}

const d = '0110b96270248f746ecca06f1ce09746';

function crack(wordlistPath = 'pinlist.txt') {
  const lines = fs.readFileSync(wordlistPath, 'utf-8').split('\n');
  for (const raw of lines) {
    const pin = raw.trim();
    if (!pin) continue;
    if (md5(pin) === d) {
      return pin;
    }
  }
  return null;
}

const start = Date.now();
const pin = crack();
const elapsed = Date.now() - start;
console.log(`PIN: ${pin} sesuai di pinlist.txt`);
console.log(`Spending time: ${(elapsed / 1000).toFixed(3)} s`);
