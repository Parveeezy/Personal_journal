import "./App.css";
import { Header } from "./components/Header/Header";
import { JournalAddButton } from "./components/JournalAddButton/JournalAddButton";
import { JournalList } from "./components/JournalList/JournalList";
import { Body } from "./layout/Body/Body";
import { LeftPanel } from "./layout/LeftPanel/LeftPanel";
import { JournalForm } from "./components/JournalForm/JournalForm";
import { v4 } from "uuid";
import { useLocalStorage } from "./hooks/use-localstorage.hook";
import { UserContextProvider } from "./context/user.context";
import { useState } from "react";

function App() {
  const [items, setItems] = useLocalStorage("data");
  const [selectedItem, setSelectedItem] = useState({});

  const mapItems = (items) => {
    if (!items) {
      return [];
    }
    return items.map((i) => ({
      ...i,
      date: new Date(i.date),
    }));
  };

  const changeDataHandler = (item) => {
    const newData = {
      ...item,
      date: new Date(item.date),
      id: v4(),
    };

    if (!item.id) {
      setItems([...mapItems(items), newData]);
    } else {
      setItems([
        ...mapItems(items).map((i) => {
          if (i.id === item.id) {
            return {
              ...item,
              date: new Date(item.date),
            };
          } else {
            return i
          }
        }),
      ]);
    }
  };

  const clickedPostHandler = (item) => {
    setSelectedItem(item);
  };

  return (
    <UserContextProvider>
      <div className="app">
        <LeftPanel>
          <aside className="left-panel">
            <Header />
            <JournalAddButton />
            <JournalList items={mapItems(items)} onClick={clickedPostHandler} />
          </aside>
        </LeftPanel>
        <Body>
          <JournalForm onSubmit={changeDataHandler} data={selectedItem} />
        </Body>
      </div>
    </UserContextProvider>
  );
}

export default App;
