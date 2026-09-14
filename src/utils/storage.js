const STORAGE_KEYS = {
  CALCULATOR_DRAFT: 'taxbd_calculator_draft',
  AUTH_TOKEN: 'taxbd_auth_token',
  USER_DATA: 'taxbd_user_data',
  ADMIN_TOKEN: 'taxbd_admin_token',
  ADMIN_USER: 'taxbd_admin_user',
};

export const getStorageItem = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
};

export const setStorageItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn('Storage set error:', error);
  }
};

export const removeStorageItem = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.warn('Storage remove error:', error);
  }
};

export { STORAGE_KEYS };
