import "./App.css";
import { Header } from "./components/Header/Header";
import { JournalAddButton } from "./components/JournalAddButton/JournalAddButton";
import { JournalList } from "./components/JournalList/JournalList";
import { Body } from "./layout/Body/Body";
import { LeftPanel } from "./layout/LeftPanel/LeftPanel";
import { JournalForm } from "./components/JournalForm/JournalForm";
import { useState } from "react";
import { v4 } from "uuid";

const INITIAL_DATA = [
  {
    title: "Поход в Горы",
    text: "Горные походы открывают удивительные природные ландшафты",
    date: new Date(),
    id: v4(),
  },
  {
    title: "Подготовка к обновлению курсов",
    text: "Как всё было классно",
    date: new Date(),
    id: v4(),
  },
];

function App() {
  const [items, setItems] = useState(INITIAL_DATA);

  const changeDataHandler = (inputData) => {
    const newData = {
      date: new Date(inputData.date),
      title: inputData.title,
      text: inputData.text,
      id: v4(),
    };
    setItems([...items, newData]);
  };

  return (
    <div className="app">
      <LeftPanel>
        <aside className="left-panel">
          <Header />
          <JournalAddButton />
          <JournalList data={items} />
        </aside>
      </LeftPanel>
      <Body>
        <JournalForm changeData={changeDataHandler} />
      </Body>
    </div>
  );
}

export default App;
