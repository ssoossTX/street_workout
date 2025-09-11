import React, { useState, useEffect } from "react";

const allElements = [
  { name: "Отжимания", videoId: "c2e14affff0915096ac0eea29719f424" },
  { name: "Приседания", videoId: "df81ef638919b19e7e46ac30d81ae72c" },
  { name: "Подтягивания", videoId: "c722e4f28e48e052332145e8438c258a" },
  { name: "Уголок", videoId: "1a27b866d0ef4a7e22c2518b9ff50b85" },
  { name: "Выход на одну руку", videoId: "ea7094d39c56110fdc0de5ad091e948" },
  { name: "Выход силой", videoId: "5ea51559daf1b2b8d8880116c82555c8" }
];

function getComboName(e1, e2) {
  return `${e1.name} + ${e2.name}`;
}


export default function CombinationsPage({ setNotification }) {
  const [selected, setSelected] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [modalCombo, setModalCombo] = useState(null);
  const [showInventory, setShowInventory] = useState(false);

  // Загрузка инвентаря из localStorage
  useEffect(() => {
    const saved = localStorage.getItem("workout_inventory");
    if (saved) setInventory(JSON.parse(saved));
  }, []);

  // Сохранение инвентаря
  useEffect(() => {
    localStorage.setItem("workout_inventory", JSON.stringify(inventory));
  }, [inventory]);

  function handleSelect(el) {
    setSelected((prev) =>
      prev.length === 2 ? [el] : prev.some((e) => e.name === el.name) ? prev : [...prev, el]
    );
  }

  function handleCombine() {
    if (selected.length !== 2) {
      setNotification("Выберите два элемента!");
      return;
    }
    const comboName = getComboName(selected[0], selected[1]);
    if (inventory.some((c) => c.name === comboName)) {
      setNotification("Такая комбинация уже есть!");
      return;
    }
    setInventory([...inventory, { name: comboName, videoId: selected[0].videoId }]);
    setNotification("Комбинация успешно добавлена!");
    setSelected([]);
  }

  function handleOpenCombo(combo) {
    setModalCombo(combo);
  }

  function handleCloseCombo() {
    setModalCombo(null);
  }

  return (
    <div className="max-w-2xl mx-auto py-4 animate-fade-in">
      <h2 className="text-2xl font-bold mb-4">Создайте свою комбинацию</h2>
      <div className="flex flex-wrap gap-4 mb-4">
        {allElements.map((el) => (
          <div
            key={el.name}
            className={`bg-gray-700 rounded-lg p-2 cursor-pointer flex flex-col items-center w-32 transition-transform duration-300 hover:scale-105 ${selected.some((e) => e.name === el.name) ? "border-2 border-green-500" : ""}`}
            onClick={() => handleSelect(el)}
          >
            <img src={`https://rutube.ru/track/${el.videoId}/cover.jpg`} alt={el.name} className="w-28 h-16 object-cover rounded mb-1" />
            <span className="text-sm font-semibold">{el.name}</span>
          </div>
        ))}
      </div>
      <button
        className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700 transition mb-6"
        onClick={handleCombine}
      >
        Комбинировать
      </button>
      <div className="fixed bottom-4 left-4">
        <button
          className="bg-gray-800 text-white px-4 py-2 rounded shadow hover:bg-gray-700 transition"
          onClick={() => setShowInventory(true)}
        >
          Инвентарь комбинаций
        </button>
      </div>
      {/* Модальное окно инвентаря */}
      {showInventory && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-gray-900 rounded-lg p-4 relative w-full max-w-xl">
            <button
              className="absolute top-2 right-2 text-2xl text-white hover:text-red-500 transition"
              onClick={() => setShowInventory(false)}
              aria-label="Закрыть"
            >
              ×
            </button>
            <h3 className="text-xl font-bold mb-4">Ваши комбинации</h3>
            {inventory.length === 0 ? (
              <p className="text-gray-400">Нет комбинаций</p>
            ) : (
              <div className="flex flex-col gap-4">
                {inventory.map((combo) => (
                  <div key={combo.name} className="bg-gray-800 rounded p-2 flex flex-col items-center">
                    <img src={`https://rutube.ru/track/${combo.videoId}/cover.jpg`} alt={combo.name} className="w-28 h-16 object-cover rounded mb-1 cursor-pointer" onClick={() => handleOpenCombo(combo)} />
                    <span className="text-sm font-semibold cursor-pointer" onClick={() => handleOpenCombo(combo)}>{combo.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
      {/* Модальное окно просмотра видео комбинации */}
      {modalCombo && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-gray-900 rounded-lg p-4 relative w-full max-w-xl">
            <button
              className="absolute top-2 right-2 text-2xl text-white hover:text-red-500 transition"
              onClick={handleCloseCombo}
              aria-label="Закрыть"
            >
              ×
            </button>
            <iframe
              src={`https://rutube.ru/play/embed/${modalCombo.videoId}`}
              title={modalCombo.name}
              allowFullScreen
              className="w-full h-64 rounded"
            />
            <div className="mt-2 text-center text-lg font-bold">{modalCombo.name}</div>
          </div>
        </div>
      )}
    </div>
  );
}
