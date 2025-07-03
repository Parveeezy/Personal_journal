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

function App() {
  const [items, setItems] = useLocalStorage("data");

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
    setItems([...mapItems(items), newData]);
  };

  return (
    <UserContextProvider>
      <div className="app">
        <LeftPanel>
          <aside className="left-panel">
            <Header />
            <JournalAddButton />
            <JournalList data={mapItems(items)} />
          </aside>
        </LeftPanel>
        <Body>
          <JournalForm onSubmit={changeDataHandler} />
        </Body>
      </div>
    </UserContextProvider>
  );
}

export default App;
