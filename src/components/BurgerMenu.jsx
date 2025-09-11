import React, { useState } from "react";

const TABS = [
  { name: "О сайте" },
  {
    name: "Элементы воркаута",
    sub: ["Лёгкие элементы", "Средние элементы", "Сложные элементы"]
  },
  { name: "Комбинации" }
];

export default function BurgerMenu({ activeTab, setActiveTab, elementCategory, setElementCategory }) {
  const [open, setOpen] = useState(false);
  const [elementsOpen, setElementsOpen] = useState(false);

  return (
    <>
      {/* Кнопка бургер-меню */}
      <button
        className="fixed top-4 left-4 z-50 w-10 h-10 flex flex-col justify-center items-center bg-black rounded-full shadow-lg focus:outline-none"
        onClick={() => setOpen(true)}
        aria-label="Открыть меню"
      >
        <span className="block w-6 h-0.5 bg-white mb-1 transition-all duration-300" />
        <span className="block w-6 h-0.5 bg-white mb-1 transition-all duration-300" />
        <span className="block w-6 h-0.5 bg-white transition-all duration-300" />
      </button>
      {/* Меню */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-black text-white z-40 shadow-xl transition-transform duration-500 ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-800">
          <span className="text-lg font-bold">Меню</span>
          <button
            className="text-2xl font-bold text-white hover:text-red-500 transition" 
            onClick={() => setOpen(false)}
            aria-label="Закрыть меню"
          >
            ×
          </button>
        </div>
        <nav className="flex flex-col gap-2 p-4">
          <button
            className={`text-left py-2 px-3 rounded transition ${activeTab === "О сайте" ? "bg-gray-800" : "hover:bg-gray-700"}`}
            onClick={() => { setActiveTab("О сайте"); setOpen(false); }}
          >
            О сайте
          </button>
          <div>
            <button
              className={`flex items-center justify-between w-full py-2 px-3 rounded transition ${activeTab === "Элементы воркаута" ? "bg-gray-800" : "hover:bg-gray-700"}`}
              onClick={() => setElementsOpen((v) => !v)}
            >
              <span>Элементы воркаута</span>
              <span className={`ml-2 transition-transform ${elementsOpen ? "rotate-90" : "rotate-0"}`}>▼</span>
            </button>
            {elementsOpen && (
              <div className="ml-4 mt-2 flex flex-col gap-1 animate-fade-in">
                <button
                  className={`text-left py-1 px-2 rounded hover:bg-gray-700 text-sm ${elementCategory === "Все" ? "bg-gray-700" : ""}`}
                  onClick={() => { setActiveTab("Элементы воркаута"); setElementCategory("Все"); setOpen(false); }}
                >
                  Все элементы
                </button>
                <button
                  className={`text-left py-1 px-2 rounded hover:bg-gray-700 text-sm ${elementCategory === "Лёгкие элементы" ? "bg-gray-700" : ""}`}
                  onClick={() => { setActiveTab("Элементы воркаута"); setElementCategory("Лёгкие элементы"); setOpen(false); }}
                >
                  Лёгкие элементы
                </button>
                <button
                  className={`text-left py-1 px-2 rounded hover:bg-gray-700 text-sm ${elementCategory === "Средние элементы" ? "bg-gray-700" : ""}`}
                  onClick={() => { setActiveTab("Элементы воркаута"); setElementCategory("Средние элементы"); setOpen(false); }}
                >
                  Средние элементы
                </button>
                <button
                  className={`text-left py-1 px-2 rounded hover:bg-gray-700 text-sm ${elementCategory === "Сложные элементы" ? "bg-gray-700" : ""}`}
                  onClick={() => { setActiveTab("Элементы воркаута"); setElementCategory("Сложные элементы"); setOpen(false); }}
                >
                  Сложные элементы
                </button>
              </div>
            )}
          </div>
          <button
            className={`text-left py-2 px-3 rounded transition ${activeTab === "Комбинации" ? "bg-gray-800" : "hover:bg-gray-700"}`}
            onClick={() => { setActiveTab("Комбинации"); setOpen(false); }}
          >
            Комбинации
          </button>
        </nav>
      </div>
      {/* Затемнение фона при открытом меню */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 animate-fade-in"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
