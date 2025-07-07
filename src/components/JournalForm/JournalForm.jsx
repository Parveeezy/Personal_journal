import cn from "classnames";
import { useContext, useEffect, useReducer, useRef } from "react";
import deleteIcon from '../../../public/delete.svg'
import { Button } from "../Button/Button";
import { Input } from "../Input/Input.jsx";
import s from "./JournalForm.module.css";
import { formReducer, INITIAL_STATE } from "./JournalForm.state.js";
import { UserContext } from "../../context/user.context.jsx";


export const JournalForm = ({ data, onSubmit, deletePostItem }) => {
  const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
  let { isValid, isFormReadyToSubmit, values } = formState;
  const titleRef = useRef();
  const dateRef = useRef();
  const textRef = useRef();
  const { userId } = useContext(UserContext);

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
    if (!data) {
      dispatchForm({ type: "CLEAR" });
      dispatchForm({ type: "SET_VALUE", payload: { userId } });
    }
  }, [data, userId]);

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
      dispatchForm({ type: "SET_VALUE", payload: { userId } });
    }
  }, [isFormReadyToSubmit, onSubmit, values, userId]);

  useEffect(() => {
    dispatchForm({
      type: "SET_VALUE",
      payload: { userId },
    });
  }, [userId]);

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

  const onDeletePostItemHandler = (id) => {
    deletePostItem(id);
    dispatchForm({ type: "CLEAR" });
    dispatchForm({ type: "SET_VALUE", payload: { userId } });
  };

  return (
    <form action="" className={s["journal-form"]} onSubmit={addJournalItem}>
      <div className={s["form-row"]}>
        <Input
          type="text"
          name="title"
          appearence="title"
          placeholder="Введите текст..."
          value={values.title}
          onChange={onChange}
          ref={titleRef}
          isValid={isValid.title}
        />
        {data?.id && (
          <button
            className={s["delete"]}
            type="button"
            onClick={() => onDeletePostItemHandler(data.id)}
          >
            <img src={deleteIcon} alt="delete" />
          </button>
        )}
      </div>
      <div className={s["form-row"]}>
        <label htmlFor="date" className={s["form-label"]}>
          <img src="../src/assets/calendar.svg" alt="calendar" />
          <span>Дата</span>
        </label>
        <Input
          type="date"
          name="date"
          id="date"
          appearence="date"
          isValid={isValid.date}
          value={
            values.date ? new Date(values.date).toISOString().slice(0, 10) : ""
          }
          onChange={onChange}
          ref={dateRef}
        />
      </div>
      <div className={s["form-row"]}>
        <label htmlFor="tag" className={s["form-label"]}>
          <img src="../src/assets/folder.svg" alt="folder icon" />
          <span>Метки</span>
        </label>
        <Input
          type="text"
          name="tag"
          id="tag"
          appearence="tag"
          value={values.tag}
          onChange={onChange}
          isValid={isValid.tag}
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
