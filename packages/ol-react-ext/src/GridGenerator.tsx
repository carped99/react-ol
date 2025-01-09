import { useRef } from 'react';

export const GridGenerator = () => {
  const [progress, setProgress] = useState(0);
  const [grid, setGrid] = useState<FeatureCollection<Polygon> | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const controllerRef = useRef<AbortController | null>(null);

  const generateGrid = async () => {
    // 이전 작업 취소
    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    // 새 컨트롤러 생성
    controllerRef.current = new AbortController();
    setIsGenerating(true);
    setProgress(0);

    const result = await rectangleCellGrid([200000, 400000, 300000, 500000], 1000, 1000, {
      onProgress: setProgress,
      abortSignal: controllerRef.current.signal,
    });

    if (result.completed) {
      setGrid(result.grid);
    }
    setIsGenerating(false);
  };

  const handleCancel = () => {
    if (controllerRef.current) {
      controllerRef.current.abort();
      controllerRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      // 컴포넌트 언마운트 시 취소
      if (controllerRef.current) {
        controllerRef.current.abort();
      }
    };
  }, []);

  return (
    <div>
      <button onClick={generateGrid} disabled={isGenerating}>
        Generate Grid
      </button>

      {isGenerating && (
        <>
          <button onClick={handleCancel}>Cancel</button>
          <div>
            <progress value={progress} max={1} />
            <span>{Math.round(progress * 100)}%</span>
          </div>
        </>
      )}

      {grid && <MapComponent grid={grid} />}
    </div>
  );
};
