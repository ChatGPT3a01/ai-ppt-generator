import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './pages/Home';
import { History } from './pages/History';
import { OutlineEditor } from './pages/OutlineEditor';
import { DetailEditor } from './pages/DetailEditor';
import { SlidePreview } from './pages/SlidePreview';
import { SettingsPage } from './pages/Settings';
import { useProjectStore } from './store/useProjectStore';
import { useToast, GithubLink, ParticleEffect, Sidebar } from './components/shared';

// localStorage key for particle effect setting
const PARTICLE_EFFECT_KEY = 'particle_effect_enabled';

function App() {
  const { currentProject, syncProject, error, setError } = useProjectStore();
  const { show, ToastContainer } = useToast();

  // 粒子特效開關狀態（預設關閉）
  const [particleEnabled, setParticleEnabled] = useState(() => {
    const saved = localStorage.getItem(PARTICLE_EFFECT_KEY);
    return saved === 'true';
  });

  // 儲存粒子特效開關狀態
  const handleParticleToggle = (enabled: boolean) => {
    setParticleEnabled(enabled);
    localStorage.setItem(PARTICLE_EFFECT_KEY, String(enabled));
  };

  // 恢復專案狀態
  useEffect(() => {
    const savedProjectId = localStorage.getItem('currentProjectId');
    if (savedProjectId && !currentProject) {
      syncProject();
    }
  }, [currentProject, syncProject]);

  // 顯示全域錯誤
  useEffect(() => {
    if (error) {
      show({ message: error, type: 'error' });
      setError(null);
    }
  }, [error, setError, show]);

  return (
    <BrowserRouter>
      {/* 滑鼠粒子特效 */}
      {particleEnabled && <ParticleEffect />}

      <div className="flex min-h-screen">
        {/* 左側邊欄 */}
        <Sidebar
          particleEnabled={particleEnabled}
          onParticleToggle={handleParticleToggle}
        />

        {/* 主要內容區 */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/history" element={<History />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/project/:projectId/outline" element={<OutlineEditor />} />
            <Route path="/project/:projectId/detail" element={<DetailEditor />} />
            <Route path="/project/:projectId/preview" element={<SlidePreview />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>

      <ToastContainer />
      <GithubLink />
    </BrowserRouter>
  );
}

export default App;
