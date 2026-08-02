/**
 * Auth Controller for FinPulse Finance Tracker
 */

export class AuthManager {
  constructor(onAuthSuccess) {
    this.onAuthSuccess = onAuthSuccess;
    this.activeMethod = 'google'; // 'google', 'email', 'phone'
    this.otpStep = false;
    this.userPhone = '';
    this.initEventListeners();
  }

  initEventListeners() {
    // Auth tab switchers
    document.querySelectorAll('.auth-tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const method = e.currentTarget.getAttribute('data-method');
        this.switchAuthMethod(method);
      });
    });

    // Google Login Button
    const googleBtn = document.getElementById('google-login-btn');
    if (googleBtn) {
      googleBtn.addEventListener('click', () => this.handleGoogleLogin());
    }

    // Email Form Submit
    const emailForm = document.getElementById('email-login-form');
    if (emailForm) {
      emailForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleEmailLogin();
      });
    }

    // Phone Form Submit & OTP Verification
    const phoneForm = document.getElementById('phone-login-form');
    if (phoneForm) {
      phoneForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!this.otpStep) {
          this.sendPhoneOTP();
        } else {
          this.verifyPhoneOTP();
        }
      });
    }

    // Quick Demo Login Button
    const demoBtn = document.getElementById('demo-login-btn');
    if (demoBtn) {
      demoBtn.addEventListener('click', () => this.handleDemoLogin());
    }
  }

  switchAuthMethod(method) {
    this.activeMethod = method;
    document.querySelectorAll('.auth-tab-btn').forEach(b => {
      if (b.getAttribute('data-method') === method) {
        b.classList.add('active', 'border-emerald-600', 'text-emerald-700', 'bg-emerald-50');
        b.classList.remove('text-slate-500', 'border-transparent');
      } else {
        b.classList.remove('active', 'border-emerald-600', 'text-emerald-700', 'bg-emerald-50');
        b.classList.add('text-slate-500', 'border-transparent');
      }
    });

    // Toggle container views
    document.querySelectorAll('.auth-view-container').forEach(view => {
      view.classList.add('hidden');
    });

    const targetView = document.getElementById(`auth-view-${method}`);
    if (targetView) targetView.classList.remove('hidden');
  }

  handleGoogleLogin() {
    // Simulate Google OAuth Popup / Selection
    const googleModal = document.getElementById('google-account-modal');
    if (googleModal) {
      googleModal.classList.remove('hidden');
      googleModal.classList.add('flex');
    }
  }

  confirmGoogleAccount(email, name, avatar) {
    const user = {
      name: name || "Alex Morgan",
      email: email || "alex.morgan@gmail.com",
      phone: "+1 (555) 234-5678",
      avatar: avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80",
      authProvider: "Google Gmail"
    };

    const googleModal = document.getElementById('google-account-modal');
    if (googleModal) {
      googleModal.classList.add('hidden');
      googleModal.classList.remove('flex');
    }

    this.onAuthSuccess(user);
  }

  handleEmailLogin() {
    const emailInput = document.getElementById('email-input');
    const passwordInput = document.getElementById('password-input');
    
    if (!emailInput || !emailInput.value) {
      alert("Please enter a valid email address.");
      return;
    }

    const email = emailInput.value.trim();
    const name = email.split('@')[0].replace('.', ' ');
    const formattedName = name.charAt(0).toUpperCase() + name.slice(1);

    const user = {
      name: formattedName || "Alex Morgan",
      email: email,
      phone: "+1 (555) 890-1234",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80",
      authProvider: "Email"
    };

    this.onAuthSuccess(user);
  }

  sendPhoneOTP() {
    const phoneInput = document.getElementById('phone-number-input');
    if (!phoneInput || phoneInput.value.length < 7) {
      alert("Please enter a valid phone number.");
      return;
    }

    this.userPhone = phoneInput.value.trim();
    this.otpStep = true;

    // Show OTP input step
    const phoneStep1 = document.getElementById('phone-step-1');
    const phoneStep2 = document.getElementById('phone-step-2');
    const phoneDisplay = document.getElementById('otp-sent-number');

    if (phoneStep1 && phoneStep2) {
      phoneStep1.classList.add('hidden');
      phoneStep2.classList.remove('hidden');
      if (phoneDisplay) phoneDisplay.textContent = this.userPhone;
    }
  }

  verifyPhoneOTP() {
    const otpInput = document.getElementById('otp-code-input');
    if (!otpInput || otpInput.value.length < 4) {
      alert("Please enter the 4-digit code (Use 1234 for demo).");
      return;
    }

    const user = {
      name: "Alex Morgan",
      email: "alex.phone@finpulse.app",
      phone: this.userPhone,
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=256&q=80",
      authProvider: "Phone OTP"
    };

    this.onAuthSuccess(user);
  }

  handleDemoLogin() {
    const user = {
      name: "Alex Morgan",
      email: "alex.morgan@gmail.com",
      phone: "+1 (555) 234-5678",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80",
      authProvider: "Demo Access"
    };
    this.onAuthSuccess(user);
  }
}
