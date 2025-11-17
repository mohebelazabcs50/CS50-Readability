import React, { useState, useEffect } from 'react';
import HomePage from './components/HomePage';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'اسمك هنا',
    bio: 'نبذة عنك - يمكنك تعديلها من لوحة التحكم',
    profileImage: 'https://via.placeholder.com/150',
    backgroundType: 'gradient',
    backgroundColor: '#667eea',
    backgroundGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    backgroundImage: '',
    links: [
      { id: 1, title: 'Instagram', url: 'https://instagram.com', icon: '📷', color: '#E4405F' },
      { id: 2, title: 'Twitter', url: 'https://twitter.com', icon: '🐦', color: '#1DA1F2' },
      { id: 3, title: 'YouTube', url: 'https://youtube.com', icon: '▶️', color: '#FF0000' },
      { id: 4, title: 'Website', url: 'https://example.com', icon: '🌐', color: '#6366f1' },
    ]
  });

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsAuthenticated(true);
    }
    
    const savedData = localStorage.getItem('profileData');
    if (savedData) {
      setProfileData(JSON.parse(savedData));
    }
  }, []);

  const handleLogin = (password) => {
    if (password === 'admin123') {
      setIsAuthenticated(true);
      localStorage.setItem('adminToken', 'authenticated');
      setCurrentPage('dashboard');
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminToken');
    setCurrentPage('home');
  };

  const handleSaveProfile = (newData) => {
    setProfileData(newData);
    localStorage.setItem('profileData', JSON.stringify(newData));
  };

  return (
    <div className="App">
      {currentPage === 'home' && (
        <HomePage 
          profileData={profileData} 
          onAdminClick={() => setCurrentPage('login')}
        />
      )}
      
      {currentPage === 'login' && (
        <AdminLogin 
          onLogin={handleLogin}
          onBack={() => setCurrentPage('home')}
        />
      )}
      
      {currentPage === 'dashboard' && isAuthenticated && (
        <AdminDashboard 
          profileData={profileData}
          onSave={handleSaveProfile}
          onLogout={handleLogout}
          onPreview={() => setCurrentPage('home')}
        />
      )}
    </div>
  );
}

export default App;
