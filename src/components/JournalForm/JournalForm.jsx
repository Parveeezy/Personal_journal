import s from "./JournalForm.module.css";
import { Button } from "../Button/Button";
import { useEffect, useReducer, useRef, useState } from "react";
import cn from "classnames";
import { formReducer, INITIAL_STATE } from "./JournalForm.state.js";

export const JournalForm = ({ onSubmit }) => {
  const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
  const { isValid, isFormReadyToSubmit, values } = formState;
  const titleRef = useRef();
  const dateRef = useRef();
  const textRef = useRef();

  const focusError = (isValid) => {
    switch (true) {
      case !isValid.title:
        titleRef.current.focus();
        break;
      case !isValid.date:
        dateRef.current.focus();
        break;
      case !isValid.text:
        textRef.current.focus();
        break;
    }
  };

  useEffect(() => {
    let timerId;
    if (!isValid.date || !isValid.text || !isValid.title) {
      focusError(isValid);
      timerId = setTimeout(() => {
        dispatchForm({ type: "RESET_VALIDATY" });
      }, 2000);
    }
    return () => {
      clearTimeout(timerId);
    };
  }, [isValid]);

  useEffect(() => {
    if (isFormReadyToSubmit) {
      onSubmit(values);
      dispatchForm({ type: "CLEAR" });
    }
  }, [isFormReadyToSubmit, onSubmit, values]);

  const onChange = (e) => {
    dispatchForm({
      type: "SET_VALUE",
      payload: { [e.target.name]: e.target.value },
    });
  };

  const addJournalItem = (event) => {
    event.preventDefault();
    dispatchForm({ type: "SUBMIT" });
  };

  return (
    <form action="" className={s["journal-form"]} onSubmit={addJournalItem}>
      <div>
        <input
          type="text"
          name="title"
          className={cn(s["input-title"], {
            [s["invalid"]]: !isValid.title,
          })}
          placeholder="Введите текст..."
          value={values.title}
          onChange={onChange}
          ref={titleRef}
        />
      </div>
      <div className={s["form-row"]}>
        <label htmlFor="date" className={s["form-label"]}>
          <img src="../src/assets/calendar.svg" alt="calendar" />
          <span>Дата</span>
        </label>
        <input
          type="date"
          name="date"
          id="date"
          className={cn(s["input"], {
            [s["invalid"]]: !isValid.date,
          })}
          value={values.date}
          onChange={onChange}
          ref={dateRef}
        />
      </div>
      <div className={s["form-row"]}>
        <label htmlFor="tag" className={s["form-label"]}>
          <img src="../src/assets/folder.svg" alt="folder icon" />
          <span>Метки</span>
        </label>
        <input
          type="text"
          name="tag"
          id="tag"
          className={s["input"]}
          value={values.tag}
          onChange={onChange}
        />
      </div>
      <textarea
        name="text"
        id=""
        cols="30"
        rows={10}
        className={cn(s["input"], {
          [s["invalid"]]: !isValid.text,
        })}
        value={values.text}
        onChange={onChange}
        ref={textRef}
      ></textarea>
      <Button text={"Сохранить"} />
    </form>
  );
};
