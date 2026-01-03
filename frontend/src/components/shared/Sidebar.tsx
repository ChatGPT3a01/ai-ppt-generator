import React, { useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, History, Settings, Music, Play, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

// 預設音樂清單
const musicPresets = [
  'https://youtu.be/xA95Wd---5g?list=RDxA95Wd---5g',
  'https://youtu.be/WQl1C3xBhKo?list=RDWQl1C3xBhKo',
  'https://youtu.be/Ib2osVLmjSU?list=RDIb2osVLmjSU',
  'https://youtu.be/nx9MB6lQ6tw?list=RDnx9MB6lQ6tw',
  'https://youtu.be/Vwr_l5bUgUA?list=RDVwr_l5bUgUA',
  'https://youtu.be/e_d5g6VXm3k'
];

// 將 YouTube URL 轉換為嵌入格式
function getYouTubeEmbedUrl(url: string): string {
  if (!url) return '';

  let videoId = '';

  // 處理 youtu.be 格式
  const shortMatch = url.match(/youtu\.be\/([^?&]+)/);
  if (shortMatch) {
    videoId = shortMatch[1];
  }

  // 處理 youtube.com/watch?v= 格式
  const longMatch = url.match(/[?&]v=([^&]+)/);
  if (longMatch) {
    videoId = longMatch[1];
  }

  if (!videoId) return '';

  return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}&modestbranding=1&rel=0`;
}

interface SidebarProps {
  particleEnabled: boolean;
  onParticleToggle: (enabled: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ particleEnabled, onParticleToggle }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [currentMusicIndex, setCurrentMusicIndex] = useState(-1);
  const [customMusicUrl, setCustomMusicUrl] = useState('');
  const [currentMusicUrl, setCurrentMusicUrl] = useState('');

  const currentMusicEmbed = useMemo(() => getYouTubeEmbedUrl(currentMusicUrl), [currentMusicUrl]);

  const selectMusic = (index: number) => {
    setCurrentMusicIndex(index);
    setCurrentMusicUrl(musicPresets[index]);
  };

  const playCustomMusic = () => {
    if (customMusicUrl.trim()) {
      setCurrentMusicIndex(-1);
      setCurrentMusicUrl(customMusicUrl.trim());
    }
  };

  const stopMusic = () => {
    setCurrentMusicIndex(-1);
    setCurrentMusicUrl('');
  };

  const navItems = [
    { path: '/', icon: <Home size={20} />, label: '創作中心' },
    { path: '/history', icon: <History size={20} />, label: '歷史專案' },
    { path: '/settings', icon: <Settings size={20} />, label: '系統設定' },
  ];

  return (
    <>
      {/* 側邊欄 */}
      <aside
        className={`fixed left-0 top-0 h-screen bg-white border-r border-gray-200 shadow-lg transition-all duration-300 z-50 flex flex-col ${
          isCollapsed ? 'w-16' : 'w-64'
        }`}
      >
        {/* Logo 區域 */}
        <div className={`p-4 border-b border-gray-100 flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'}`}>
          <img
            src="/logo.png"
            alt="亮言 Logo"
            className="w-10 h-10 rounded-lg object-contain"
          />
          {!isCollapsed && (
            <span className="text-lg font-bold bg-gradient-to-r from-banana-600 to-orange-500 bg-clip-text text-transparent">
              亮言 AI
            </span>
          )}
        </div>

        {/* 導航菜單 */}
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${
                location.pathname === item.path
                  ? 'bg-gradient-to-r from-banana-100 to-orange-100 text-banana-700 font-medium'
                  : 'text-gray-600 hover:bg-gray-50'
              } ${isCollapsed ? 'justify-center' : ''}`}
              title={isCollapsed ? item.label : ''}
            >
              {item.icon}
              {!isCollapsed && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* 粒子特效開關 */}
        {!isCollapsed && (
          <div className="px-3 py-2 border-t border-gray-100">
            <label className="flex items-center justify-between cursor-pointer group">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-banana-500" />
                <span className="text-sm text-gray-600">滑鼠粒子特效</span>
              </div>
              <div className="relative">
                <input
                  type="checkbox"
                  checked={particleEnabled}
                  onChange={(e) => onParticleToggle(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-10 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-banana-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-banana-500"></div>
              </div>
            </label>
          </div>
        )}

        {/* 音樂播放器 */}
        {!isCollapsed && (
          <div className="p-3 border-t border-gray-100">
            <div className="bg-gradient-to-br from-gray-50 to-banana-50/30 rounded-xl p-3">
              <div className="flex items-center gap-2 mb-3">
                <Music size={14} className="text-banana-600" />
                <span className="text-sm font-medium text-gray-700">背景音樂</span>
                {currentMusicUrl && (
                  <button
                    onClick={stopMusic}
                    className="ml-auto text-xs text-gray-400 hover:text-red-500 transition-colors"
                  >
                    停止
                  </button>
                )}
              </div>

              {/* 預設音樂按鈕 */}
              <div className="flex gap-1.5 mb-3">
                {musicPresets.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => selectMusic(idx)}
                    className={`w-7 h-7 rounded-full text-xs font-medium transition-all ${
                      currentMusicIndex === idx
                        ? 'bg-banana-500 text-white shadow-md'
                        : 'bg-white border border-gray-200 text-gray-600 hover:border-banana-300 hover:bg-banana-50'
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>

              {/* 自訂 YouTube URL */}
              <div className="flex gap-1.5 mb-3">
                <input
                  type="text"
                  value={customMusicUrl}
                  onChange={(e) => setCustomMusicUrl(e.target.value)}
                  onKeyUp={(e) => e.key === 'Enter' && playCustomMusic()}
                  placeholder="貼入 YouTube 連結..."
                  className="flex-1 h-7 px-2 text-xs rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-banana-400 focus:border-banana-400"
                />
                <button
                  onClick={playCustomMusic}
                  className="w-7 h-7 flex items-center justify-center rounded-lg bg-banana-500 text-white hover:bg-banana-600 transition-colors"
                  title="播放"
                >
                  <Play size={12} fill="currentColor" />
                </button>
              </div>

              {/* YouTube 播放器 */}
              {currentMusicEmbed && (
                <div className="rounded-lg overflow-hidden">
                  <iframe
                    src={currentMusicEmbed}
                    width="100%"
                    height="50"
                    frameBorder="0"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    className="rounded-lg"
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* 社群連結 */}
        {!isCollapsed && (
          <div className="p-3 border-t border-gray-100">
            <div className="flex items-center gap-2 mb-2">
              <img src="/logo.png" alt="Logo" className="w-8 h-8 rounded-full object-contain" />
              <div>
                <div className="text-sm font-semibold text-gray-800">阿亮老師</div>
                <div className="text-xs text-gray-500">亮言 AI 生成器</div>
              </div>
            </div>
            <div className="flex gap-2 pl-1">
              <a
                href="https://www.facebook.com/iddmail?locale=zh_TW"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1877F2] hover:opacity-80 transition-opacity"
                title="Facebook"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@Liang-yt02"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FF0000] hover:opacity-80 transition-opacity"
                title="YouTube"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a
                href="https://www.facebook.com/groups/2754139931432955?locale=zh_TW"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1877F2] hover:opacity-80 transition-opacity"
                title="3A科技實驗室"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                </svg>
              </a>
            </div>
          </div>
        )}

        {/* 收合按鈕 */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-white border border-gray-200 rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
        >
          {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </aside>

      {/* 側邊欄佔位 */}
      <div className={`transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`} />
    </>
  );
};

export default Sidebar;
