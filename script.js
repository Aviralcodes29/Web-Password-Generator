const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const digits = '0123456789';
const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

function generate() {
    const length = parseInt(document.getElementById('length').value);
    const useLetters = document.getElementById('letters').checked;
    const useDigits = document.getElementById('digits').checked;
    const useSymbols = document.getElementById('symbols').checked;
    
    let chars = '';
    if (useLetters) chars += letters;
    if (useDigits) chars += digits;
    if (useSymbols) chars += symbols;
    
    if (!chars) {
        alert('✅ Select at least one character type!');
        return;
    }
    
    let password = '';
    for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    const passwordField = document.getElementById('password');
    passwordField.value = password;
    
    // Visual feedback
    passwordField.style.borderColor = length >= 16 ? '#22c55e' : length >= 12 ? '#f59e0b' : '#ef4444';
    
    updateStrength(length);
}

function copyPassword() {
    const passwordField = document.getElementById('password');
    if (!passwordField.value) {
        alert('⚠️ Generate a password first!');
        return;
    }
    passwordField.select();
    passwordField.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(passwordField.value).then(() => {
        const original = passwordField.style.borderColor;
        passwordField.style.borderColor = '#10b981';
        setTimeout(() => passwordField.style.borderColor = original, 1000);
        alert('📋 Copied to clipboard!');
    });
}

function updateStrength(length) {
    const strengthEl = document.getElementById('strength');
    let strength = 'Weak', className = 'weak';
    if (length >= 16) { strength = 'Strong'; className = 'strong'; }
    else if (length >= 12) { strength = 'Medium'; className = 'medium'; }
    
    strengthEl.textContent = `Strength: ${strength}`;
    strengthEl.className = `strength ${className}`;
}

// Event listeners
document.getElementById('length').addEventListener('input', function() {
    document.getElementById('lengthValue').textContent = this.value;
    if (document.getElementById('password').value) generate();
});

// Auto-generate on load
window.addEventListener('load', generate);