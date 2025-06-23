import s from "./JournalForm.module.css";
import { Button } from "../Button/Button";
import { useState } from "react";
import cn from "classnames";

export const JournalForm = ({ changeData }) => {
  const [formValidState, setFormValidState] = useState({
    title: true,
    text: true,
    date: true,
  });

  const addJournalItem = (event) => {
    event.preventDefault();
    const formProps = Object.fromEntries(new FormData(event.target));
    let isFormValid = true;

    if (!formProps?.title?.trim().length) {
      setFormValidState((state) => ({ ...state, title: false }));
      isFormValid = false;
    } else {
      setFormValidState((state) => ({ ...state, title: true }));
      isFormValid = true;
    }

    if (!formProps.date) {
      setFormValidState((state) => ({ ...state, date: false }));
      isFormValid = false;
    } else {
      setFormValidState((state) => ({ ...state, date: true }));
      isFormValid = true;
    }

    if (!formProps?.text?.trim().length) {
      setFormValidState((state) => ({ ...state, text: false }));
      isFormValid = false;
    } else {
      setFormValidState((state) => ({ ...state, text: true }));
      isFormValid = true;
    }

    if (!isFormValid) {
      return;
    }
    changeData(formProps);
  };

  return (
    <form action="" className={s["journal-form"]} onSubmit={addJournalItem}>
      <div>
        <input
          type="text"
          name="title"
          className={cn(s["input-title"], {
            [s["invalid"]]: !formValidState.title,
          })}
          placeholder="Введите текст..."
        />
      </div>
      <div className={s["form-row"]}>
        <label for="date" className={s["form-label"]}>
          <img src="../src/assets/calendar.svg" alt="calendar" />
          <span>Дата</span>
        </label>
        <input
          type="date"
          name="date"
          id="date"
          className={cn(s["input"], {
            [s["invalid"]]: !formValidState.date,
          })}
        />
      </div>
      <div className={s["form-row"]}>
        <label for="tag" className={s["form-label"]}>
          <img src="../src/assets/folder.svg" alt="folder icon" />
          <span>Метки</span>
        </label>
        <input type="text" name="tag" id="tag" className={s["input"]} />
      </div>
      <textarea
        name="text"
        id=""
        cols="30"
        rows={10}
        className={cn(s["input"], {
          [s["invalid"]]: !formValidState.text,
        })}
      ></textarea>
      <Button text={"Сохранить"} />
    </form>
  );
};
