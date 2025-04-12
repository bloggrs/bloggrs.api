"use server";

interface AuthResponse {
  success: boolean;
  error?: string;
  userId?: string;
}

export async function registerUser(
  username: string, 
  password: string
): Promise<AuthResponse> {
  try {
    const response = await fetch('/api/v1/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();
    
    if (!response.ok) {
      return {
        success: false,
        error: data.error || 'Registration failed'
      };
    }

    return {
      success: true,
      userId: data.userId
    };
  } catch (error) {
    console.error('Registration error:', error);
    return {
      success: false,
      error: "Registration failed"
    };
  }
}

export async function loginUser(
  username: string, 
  password: string
): Promise<AuthResponse> {
  try {
    const response = await fetch('/api/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error || 'Login failed'
      };
    }

    return {
      success: true,
      userId: data.userId
    };
  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      error: "Login failed"
    };
  }
} 