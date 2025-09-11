import React from "react";

const elements = [
  {
    category: "Лёгкие",
    items: [
      {
        name: "Отжимания",
        videoId: "c2e14affff0915096ac0eea29719f424"
      },
      {
        name: "Приседания",
        videoId: "df81ef638919b19e7e46ac30d81ae72c"
      }
    ]
  },
  {
    category: "Средние",
    items: [
      {
        name: "Подтягивания",
        videoId: "c722e4f28e48e052332145e8438c258a"
      },
      {
        name: "Уголок",
        videoId: "1a27b866d0ef4a7e22c2518b9ff50b85"
      }
    ]
  },
  {
    category: "Сложные",
    items: [
      {
        name: "Выход на одну руку",
        videoId: "ea7094d39c56110fdc0de5ad091e948"
      },
      {
        name: "Выход силой",
        videoId: "5ea51559daf1b2b8d8880116c82555c8"
      }
    ]
  }
];

function ElementCard({ name, videoId }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="bg-gray-700 rounded-lg shadow-md p-4 mb-4 flex flex-col items-center animate-fade-in">
      <img
        src={`https://rutube.ru/track/${videoId}/cover.jpg`}
        alt={name}
        className="w-64 h-36 object-cover rounded mb-2 cursor-pointer transition-transform duration-300 hover:scale-105"
        onClick={() => setOpen(true)}
        loading="lazy"
      />
      <span className="text-lg font-semibold mb-2 cursor-pointer" onClick={() => setOpen(true)}>{name}</span>
      {/* Модальное окно с видео */}
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-gray-900 rounded-lg p-4 relative w-full max-w-xl">
            <button
              className="absolute top-2 right-2 text-2xl text-white hover:text-red-500 transition"
              onClick={() => setOpen(false)}
              aria-label="Закрыть"
            >
              ×
            </button>
            <iframe
              src={`https://rutube.ru/play/embed/${videoId}`}
              title={name}
              allowFullScreen
              className="w-full h-64 rounded"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default function ElementsPage({ category = "Все" }) {
  let filtered = elements;
  if (category !== "Все") {
    filtered = elements.filter((cat) => category.includes(cat.category));
  }
  return (
    <div className="max-w-2xl mx-auto py-4 animate-fade-in">
      {filtered.map((cat) => (
        <div key={cat.category} className="mb-8">
          <h2 className="text-2xl font-bold mb-4">{cat.category} элементы</h2>
          {cat.items.map((el) => (
            <ElementCard key={el.name} {...el} />
          ))}
        </div>
      ))}
    </div>
  );
}
