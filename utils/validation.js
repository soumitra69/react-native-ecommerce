export function isValidEmail(email) {
  if (!email || typeof email !== 'string') return false;
  const trimmed = email.trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
}

export function isValidPhone(phone) {
  if (!phone || typeof phone !== 'string') return false;
  const digits = phone.replace(/\D/g, '');
  return digits.length === 10;
}

export function isValidPincode(pincode) {
  if (!pincode || typeof pincode !== 'string') return false;
  const digits = pincode.replace(/\D/g, '');
  return digits.length === 6;
}

export function validateLoginForm({ email, password }) {
  const errors = {};
  if (!email || !email.trim()) {
    errors.email = 'Please enter your username or email address';
  }
  if (!password || password.length < 4) {
    errors.password = 'Password must be at least 4 characters';
  }
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateSignupForm({ email, password, confirmPassword }) {
  const errors = {};
  if (!email || !email.trim()) {
    errors.email = 'Please enter a valid email or username';
  }
  if (!password || password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }
  if (password !== confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateShippingForm(address) {
  const errors = {};
  if (!address?.fullName || address.fullName.trim().length < 2) {
    errors.fullName = 'Full name is required';
  }
  if (!isValidPhone(address?.phone || '')) {
    errors.phone = 'Enter a valid 10-digit mobile number';
  }
  if (!address?.street || address.street.trim().length < 5) {
    errors.street = 'House no., building, street address is required';
  }
  if (!address?.city || address.city.trim().length < 2) {
    errors.city = 'City is required';
  }
  if (!address?.state || address.state.trim().length < 2) {
    errors.state = 'State is required';
  }
  if (!isValidPincode(address?.pincode || '')) {
    errors.pincode = 'Enter a valid 6-digit pincode';
  }
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
