import { useContext, useMemo } from "react";
import { UserContext } from "../../context/user.context";
import CardButton from "../CardButton/CardButton";
import { JournalItem } from "../JournalItem/JournalItem";
import "./JournalList.css";

export const JournalList = ({ items, onClick }) => {
  const { userId } = useContext(UserContext);

  const filterdItems = useMemo(
    () =>
      [...items]
        .filter((i) => i.userId === userId)
        .sort((a, b) => b.date - a.date),
    [userId, items]
  );

  return (
    <div className="journal-list">
      {filterdItems.length === 0 && (
        <div className="empty-data">Записи отсутствуют</div>
      )}
      {filterdItems.length > 0 &&
        filterdItems.map((el) => {
          return (
            <CardButton key={el.id} onClick={() => onClick(el)}>
              <JournalItem data={el} />
            </CardButton>
          );
        })}
    </div>
  );
};
