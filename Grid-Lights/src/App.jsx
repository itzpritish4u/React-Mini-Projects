import { useState } from "react";

const GridLights = () => {
  const [order, setOrder] = useState([]);
  const [isDeactivating, setIsDeactivating] = useState(false);
  const [delay, setDelay] = useState(300);
  const [gridSize, setGridSize] = useState(3);

  const deactivateCells = () => {
    setIsDeactivating(true);
    const timer = setInterval(() => {
      setOrder((origOrder) => {
        const newOrder = origOrder.slice();
        newOrder.pop();

        if (newOrder.length === 0) {
          clearInterval(timer);
          setIsDeactivating(false);
        }

        return newOrder;
      });
    }, delay);
  };

  const activateCells = (index) => {
    const newOrder = [...order, index];
    setOrder(newOrder);
    if (newOrder.length === gridSize * gridSize) {
      deactivateCells();
    }
  };

  const handleGridSizeChange = (size) => {
    setGridSize(Number(size));
    setOrder([]);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 mt-20">
      <div
        className="grid gap-5"
        style={{
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
        }}
      >
        {Array(gridSize * gridSize)
          .fill(null)
          .map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Cell ${index}`}
              disabled={order.includes(index) || isDeactivating}
              onClick={() => activateCells(index)}
              className={`${
                order.includes(index) ? "bg-green-500" : "bg-transparent"
              } border border-black w-24 h-24`}
            />
          ))}
      </div>

      <div className="flex flex-col items-center gap-2">
        <label htmlFor="gridSize">Choose Grid Size (2 to 4): {gridSize}</label>
        <input
          id="gridSize"
          type="range"
          defaultValue="3"
          min="2"
          max="4"
          onChange={(e) => handleGridSizeChange(e.target.value)}
          className="w-64"
        />
      </div>

      <div className="flex flex-col items-center">
        <label htmlFor="delay" className="mb-2">
          Delay: {delay} ms
        </label>
        <input
          id="delay"
          type="range"
          min="300"
          max="700"
          value={delay}
          onChange={(e) => setDelay(Number(e.target.value))}
          className="w-64"
        />
      </div>
    </div>
  );
};

export default GridLights;