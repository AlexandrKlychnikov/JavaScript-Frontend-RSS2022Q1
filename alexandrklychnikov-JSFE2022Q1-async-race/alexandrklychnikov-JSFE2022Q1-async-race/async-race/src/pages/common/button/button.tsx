import React from 'react';
import style from './button.module.sass';

interface IButton {
  title: string;
}

function Button({ title }: IButton): JSX.Element {
  return <a className={style.button}>{title}</a>;
}

export default Button;
