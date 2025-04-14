import React, { useState } from 'react';
import { useWebSocket } from '../../services/websocket';

export function LoginForm() {
  const { sendMessage } = useWebSocket();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage({
      type: 'auth',
      data: {
        type: 'login',
        ...formData
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={e => setFormData(prev => ({
          ...prev,
          email: e.target.value
        }))}
      />
      <input
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={e => setFormData(prev => ({
          ...prev,
          password: e.target.value
        }))}
      />
      <button type="submit">Login</button>
    </form>
  );
} 