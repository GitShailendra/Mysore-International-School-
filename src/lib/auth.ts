export const logout = async () => {
  try {
    console.log('🔄 Logout function called');
    
    // Call logout API
    const response = await fetch('/api/admin/logout', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    console.log('✅ Logout API response:', response.status);

    // Clear localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('adminData');
      console.log('✅ LocalStorage cleared');
    }

    // Force page reload to login
    window.location.replace('/admin-login');
    
  } catch (error) {
    console.error('❌ Logout error:', error);
    // Force clear and redirect anyway
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('adminData');
      window.location.replace('/admin-login');
    }
  }
};

export const isAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false;
  const token = localStorage.getItem('token');
  return !!token;
};

export const getAdminData = () => {
  if (typeof window === 'undefined') return null;
  try {
    const data = localStorage.getItem('adminData');
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error parsing admin data:', error);
    return null;
  }
};

export const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
};
