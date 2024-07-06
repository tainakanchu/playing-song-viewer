import { useState, useEffect } from 'react';

type Orientation = 'landscape' | 'portrait';

export const useWindow = () => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const orientation: Orientation = width > height ? 'landscape' : 'portrait';

  useEffect(() => {
    const updateWindowSize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };

    window.addEventListener('resize', updateWindowSize);
    updateWindowSize(); // 初期値として現在のウィンドウ幅を設定

    return () => window.removeEventListener('resize', updateWindowSize);
  }, []);

  return {
    width,
    height,
    orientation
  };
};