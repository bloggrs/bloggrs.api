import React, { useState } from 'react';
import { useWebSocket } from '../../services/websocket';

export function RegisterForm() {
  const { sendMessage } = useWebSocket();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    first_name: '',
    last_name: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage({
      type: 'auth',
      data: {
        type: 'register',
        ...formData
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <input
        type="text"
        placeholder="First Name"
        value={formData.first_name}
        onChange={e => setFormData(prev => ({
          ...prev,
          first_name: e.target.value
        }))}
      />
      <input
        type="text"
        placeholder="Last Name"
        value={formData.last_name}
        onChange={e => setFormData(prev => ({
          ...prev,
          last_name: e.target.value
        }))}
      />
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
      <button type="submit">Register</button>
    </form>
  );
} 