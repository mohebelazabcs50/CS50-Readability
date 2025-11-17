import React, { useState } from 'react';

function AdminLogin({ onLogin, onBack }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = onLogin(password);
    if (!success) {
      setError('كلمة المرور غير صحيحة');
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <button
            onClick={onBack}
            className="mb-6 text-gray-600 hover:text-gray-800 flex items-center gap-2"
          >
            ← رجوع
          </button>

          <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">
            لوحة التحكم
          </h2>
          <p className="text-gray-600 mb-8 text-center">
            أدخل كلمة المرور للوصول
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                كلمة المرور
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:outline-none transition-colors"
                placeholder="أدخل كلمة المرور"
                required
              />
              {error && (
                <p className="text-red-500 text-sm mt-2">{error}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              دخول
            </button>
          </form>

          <div className="mt-6 p-4 bg-blue-50 rounded-xl">
            <p className="text-sm text-blue-800 text-center">
              💡 كلمة المرور الافتراضية: <strong>admin123</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
