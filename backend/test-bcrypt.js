const bcrypt = require('bcryptjs');

async function test() {
  try {
    console.log('Testing bcrypt...');
    const salt = await bcrypt.genSalt(10);
    console.log('Salt generated');
    const hash = await bcrypt.hash('test', salt);
    console.log('Hash generated:', hash);
  } catch (e) {
    console.error('Bcrypt failed:', e);
  }
}

test();
