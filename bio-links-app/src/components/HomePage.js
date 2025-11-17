import React from 'react';

function HomePage({ profileData, onAdminClick }) {
  const getBackgroundStyle = () => {
    if (profileData.backgroundType === 'image' && profileData.backgroundImage) {
      return {
        backgroundImage: `url(${profileData.backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      };
    } else if (profileData.backgroundType === 'gradient') {
      return {
        background: profileData.backgroundGradient,
      };
    } else {
      return {
        backgroundColor: profileData.backgroundColor,
      };
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-6 relative"
      style={getBackgroundStyle()}
    >
      <button
        onClick={onAdminClick}
        className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-2 rounded-lg transition-all duration-300"
      >
        ⚙️ لوحة التحكم
      </button>

      <div className="max-w-md w-full">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 text-center">
          <div className="mb-6">
            <img
              src={profileData.profileImage}
              alt={profileData.name}
              className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-white shadow-lg"
            />
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mb-3">
            {profileData.name}
          </h1>

          <p className="text-gray-600 mb-8 leading-relaxed">
            {profileData.bio}
          </p>

          <div className="space-y-4">
            {profileData.links.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                style={{ backgroundColor: link.color }}
              >
                <span className="mr-2">{link.icon}</span>
                {link.title}
              </a>
            ))}
          </div>
        </div>

        <div className="text-center mt-6">
          <p className="text-white/80 text-sm">
            Made with ❤️
          </p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
