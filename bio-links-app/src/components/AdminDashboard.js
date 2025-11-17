import React, { useState } from 'react';

function AdminDashboard({ profileData, onSave, onLogout, onPreview }) {
  const [formData, setFormData] = useState(profileData);
  const [activeTab, setActiveTab] = useState('profile');
  const [newLink, setNewLink] = useState({ title: '', url: '', icon: '🔗', color: '#6366f1' });

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleAddLink = () => {
    if (newLink.title && newLink.url) {
      const link = {
        id: Date.now(),
        ...newLink
      };
      setFormData({
        ...formData,
        links: [...formData.links, link]
      });
      setNewLink({ title: '', url: '', icon: '🔗', color: '#6366f1' });
    }
  };

  const handleDeleteLink = (id) => {
    setFormData({
      ...formData,
      links: formData.links.filter(link => link.id !== id)
    });
  };

  const handleSave = () => {
    onSave(formData);
    alert('تم الحفظ بنجاح! ✅');
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleInputChange('profileImage', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBackgroundImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleInputChange('backgroundImage', reader.result);
        handleInputChange('backgroundType', 'image');
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">لوحة التحكم</h1>
          <div className="flex gap-3">
            <button
              onClick={onPreview}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              👁️ معاينة
            </button>
            <button
              onClick={handleSave}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              💾 حفظ
            </button>
            <button
              onClick={onLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              🚪 خروج
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex-1 py-4 px-6 font-semibold transition-colors ${
                activeTab === 'profile'
                  ? 'bg-indigo-500 text-white'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              👤 الملف الشخصي
            </button>
            <button
              onClick={() => setActiveTab('background')}
              className={`flex-1 py-4 px-6 font-semibold transition-colors ${
                activeTab === 'background'
                  ? 'bg-indigo-500 text-white'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              🎨 الخلفية
            </button>
            <button
              onClick={() => setActiveTab('links')}
              className={`flex-1 py-4 px-6 font-semibold transition-colors ${
                activeTab === 'links'
                  ? 'bg-indigo-500 text-white'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              🔗 الروابط
            </button>
          </div>

          <div className="p-8">
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">تعديل الملف الشخصي</h2>
                
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">الصورة الشخصية</label>
                  <div className="flex items-center gap-4">
                    <img
                      src={formData.profileImage}
                      alt="Profile"
                      className="w-24 h-24 rounded-full object-cover border-4 border-gray-200"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">الاسم</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">النبذة التعريفية</label>
                  <textarea
                    value={formData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    rows="4"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              </div>
            )}

            {activeTab === 'background' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">تخصيص الخلفية</h2>

                <div>
                  <label className="block text-gray-700 font-semibold mb-3">نوع الخلفية</label>
                  <div className="flex gap-4">
                    <button
                      onClick={() => handleInputChange('backgroundType', 'solid')}
                      className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
                        formData.backgroundType === 'solid'
                          ? 'bg-indigo-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      لون واحد
                    </button>
                    <button
                      onClick={() => handleInputChange('backgroundType', 'gradient')}
                      className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
                        formData.backgroundType === 'gradient'
                          ? 'bg-indigo-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      تدرج لوني
                    </button>
                    <button
                      onClick={() => handleInputChange('backgroundType', 'image')}
                      className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
                        formData.backgroundType === 'image'
                          ? 'bg-indigo-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      صورة
                    </button>
                  </div>
                </div>

                {formData.backgroundType === 'solid' && (
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">اللون</label>
                    <input
                      type="color"
                      value={formData.backgroundColor}
                      onChange={(e) => handleInputChange('backgroundColor', e.target.value)}
                      className="w-full h-16 rounded-xl cursor-pointer"
                    />
                  </div>
                )}

                {formData.backgroundType === 'gradient' && (
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">التدرج اللوني</label>
                    <select
                      value={formData.backgroundGradient}
                      onChange={(e) => handleInputChange('backgroundGradient', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:outline-none"
                    >
                      <option value="linear-gradient(135deg, #667eea 0%, #764ba2 100%)">بنفسجي → أرجواني</option>
                      <option value="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)">وردي → أحمر</option>
                      <option value="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)">أزرق → سماوي</option>
                      <option value="linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)">أخضر → فيروزي</option>
                      <option value="linear-gradient(135deg, #fa709a 0%, #fee140 100%)">وردي → أصفر</option>
                      <option value="linear-gradient(135deg, #30cfd0 0%, #330867 100%)">سماوي → بنفسجي داكن</option>
                    </select>
                  </div>
                )}

                {formData.backgroundType === 'image' && (
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">رفع صورة الخلفية</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleBackgroundImageUpload}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                    />
                    {formData.backgroundImage && (
                      <img
                        src={formData.backgroundImage}
                        alt="Background preview"
                        className="mt-4 w-full h-48 object-cover rounded-xl"
                      />
                    )}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'links' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">إدارة الروابط</h2>

                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="font-semibold text-gray-800 mb-4">إضافة رابط جديد</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="عنوان الرابط"
                      value={newLink.title}
                      onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
                      className="px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:outline-none"
                    />
                    <input
                      type="url"
                      placeholder="https://example.com"
                      value={newLink.url}
                      onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                      className="px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="أيقونة (emoji)"
                      value={newLink.icon}
                      onChange={(e) => setNewLink({ ...newLink, icon: e.target.value })}
                      className="px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:outline-none"
                    />
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={newLink.color}
                        onChange={(e) => setNewLink({ ...newLink, color: e.target.value })}
                        className="w-20 h-12 rounded-xl cursor-pointer"
                      />
                      <button
                        onClick={handleAddLink}
                        className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-xl transition-colors"
                      >
                        ➕ إضافة
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-800">الروابط الحالية</h3>
                  {formData.links.map((link) => (
                    <div
                      key={link.id}
                      className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl"
                    >
                      <span className="text-2xl">{link.icon}</span>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800">{link.title}</p>
                        <p className="text-sm text-gray-500">{link.url}</p>
                      </div>
                      <div
                        className="w-12 h-12 rounded-lg"
                        style={{ backgroundColor: link.color }}
                      />
                      <button
                        onClick={() => handleDeleteLink(link.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
                      >
                        🗑️
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
