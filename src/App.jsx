import "./App.css";
import { Header } from "./components/Header/Header";
import { JournalAddButton } from "./components/JournalAddButton/JournalAddButton";
import { JournalList } from "./components/JournalList/JournalList";
import { Body } from "./layout/Body/Body";
import { LeftPanel } from "./layout/LeftPanel/LeftPanel";
import { JournalForm } from "./components/JournalForm/JournalForm";
import { useEffect, useState } from "react";
import { v4 } from "uuid";

function App() {
  const [items, setItems] = useState([]);
  const data = JSON.parse(localStorage.getItem("data"));

  useEffect(() => {
    if (data) {
      setItems(data.map(item => ({
        ...item,
        date: new Date(item.date)
      })));
    }
  }, []);

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
