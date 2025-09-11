import React, { useState } from "react";
import BurgerMenu from "./components/BurgerMenu";
import AboutPage from "./pages/AboutPage";
import ElementsPage from "./pages/ElementsPage";
import CombinationsPage from "./pages/CombinationsPage";
import Notification from "./components/Notification";


const TABS = {
  ABOUT: "О сайте",
  ELEMENTS: "Элементы воркаута",
  COMBINATIONS: "Комбинации"
};

const ELEMENT_CATEGORIES = ["Все", "Лёгкие элементы", "Средние элементы", "Сложные элементы"];

export default function App() {
  const [activeTab, setActiveTab] = useState(TABS.ABOUT);
  const [notification, setNotification] = useState(null);
  const [elementCategory, setElementCategory] = useState("Все");

  return (
    <div className="min-h-screen bg-gray-900 text-white relative">
      <BurgerMenu
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        elementCategory={elementCategory}
        setElementCategory={setElementCategory}
      />
      <Notification message={notification} setMessage={setNotification} />
      <main className="pt-4 px-2 sm:px-8 transition-all duration-500 animate-fade-in">
        {activeTab === TABS.ABOUT && <AboutPage />}
        {activeTab === TABS.ELEMENTS && (
          <ElementsPage
            setNotification={setNotification}
            category={elementCategory}
          />
        )}
        {activeTab === TABS.COMBINATIONS && <CombinationsPage setNotification={setNotification} />}
      </main>
    </div>
  );
}
