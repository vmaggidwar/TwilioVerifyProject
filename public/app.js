document.addEventListener('DOMContentLoaded', () => {
  const startVerifyForm = document.getElementById('start-verify-form');
  const checkVerifyForm = document.getElementById('check-verify-form');
  const messageDiv = document.getElementById('message');
  const errorDiv = document.getElementById('error');

  startVerifyForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const phoneNumber = document.getElementById('phone-number').value;

    const response = await fetch('http://localhost:3000/start-verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phoneNumber })
    });

    if (response.ok) {
      startVerifyForm.style.display = 'none';
      checkVerifyForm.style.display = 'block';
      messageDiv.textContent = 'Verification code sent!';
      errorDiv.textContent = '';
    } else {
      errorDiv.textContent = 'Failed to start verification. Please try again.';
      messageDiv.textContent = '';
    }
  });

  checkVerifyForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const phoneNumber = document.getElementById('phone-number').value;
    const code = document.getElementById('verification-code').value;

    const response = await fetch('http://localhost:3000/check-verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phoneNumber, code })
    });

    if (response.ok) {
      messageDiv.textContent = 'Phone number verified!';
      errorDiv.textContent = '';
    } else {
      errorDiv.textContent = 'Invalid verification code. Please try again.';
      messageDiv.textContent = '';
    }
  });
});
