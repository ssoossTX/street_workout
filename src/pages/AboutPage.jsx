import React from "react";

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto bg-gray-800 rounded-lg p-6 shadow-lg animate-fade-in">
      <h1 className="text-3xl font-bold mb-4">О сайте</h1>
      <p className="mb-4 text-lg">
        Добро пожаловать на обучающий сайт по воркауту! Здесь вы найдете видеоролики по различным элементам воркаута, сможете изучать технику выполнения, а также собирать собственные комбинации.
      </p>
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Создатели сайта</h2>
        <ul className="list-disc ml-6">
          <li>Главный разработчик: <span className="font-bold">ssooss</span></li>
          <li>Представитель проекта: <span className="font-bold">Ведерников Антон Викторович</span></li>
        </ul>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">Идея и назначение</h2>
        <p>
          Сайт создан для популяризации воркаута, помощи новичкам и опытным спортсменам в освоении новых элементов и построении уникальных комбинаций. Все видео предоставлены командой разработчиков и доступны для просмотра бесплатно.
        </p>
      </div>
    </div>
  );
}
