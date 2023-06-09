import React from 'react';

export function BigButton(props) {
  const {
    onClick, children, className, disabled,
  } = props;
  const classes = `
    px-8 py-4 text-2xl rounded-xl
    text-gray-100 bg-main-200 enabled:hover:bg-main-200
    enabled:hover:text-white focus:outline-none focus:ring-2
    focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white
    disabled:opacity-50 
    ${className}`;

  return (
    <button
      disabled={disabled}
      type="button"
      className={classes}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export function Button({ onClick, children, className }) {
  const classes = `
    px-4 py-2 text-lg rounded-lg
    focus:outline-none 
    ${className}`;
  return (
    <button type="button" className={classes} onClick={onClick}>
      {children}
    </button>
  );
}

export function MutedButton({ onClick, children, className }) {
  const classes = `
    px-3 py-2 rounded
    border border-gray-400
    text-gray-800 bg-gray-100 hover:bg-gray-400
    hover:text-white focus:outline-none 
    ${className}`;
  return (
    <button type="button" className={classes} onClick={onClick}>
      {children}
    </button>
  );
}
export function ColoredButton({ onClick, children, className }) {
  const classes = `
    px-3 py-2 text-lg rounded
    text-gray-100 bg-main-200 hover:bg-main-200
    hover:text-white focus:outline-none focus:ring-2
    focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white
    ${className}`;
  return (
    <button type="button" className={classes} onClick={onClick}>
      {children}
    </button>
  );
}

export function SmallButton({ onClick, children, className }) {
  const classes = `
    px-2 py-1 text-sm rounded
    text-gray-100 bg-main-200 hover:bg-main-200
    focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white
    ${className}`;
  return (
    <button type="button" className={classes} onClick={onClick}>
      {children}
    </button>
  );
}

export function DeleteButton({ onClick, children, className }) {
  const classes = `
    px-2 py-1 text-sm rounded
    text-gray-100 bg-danger hover:bg-rose-600
    hover:text-white focus:outline-none focus:ring-2
    focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white
    ${className}`;
  return (
    <button type="button" className={classes} onClick={onClick}>
      {children}
    </button>
  );
}

export function LoginButton(props) {
  const { onClick } = props;

  return (
    <div className="inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
      <button
        type="button"
        onClick={onClick}
        className="px-5 py-2 rounded-full text-gray-100 bg-main-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
      >
        Sign In
      </button>
    </div>
  );
}

export function LogoutButton(props) {
  const { user, onClick } = props;
  const { name } = user;
  return (
    <div className="inset-y-0 right-0 flex items-center pr-2 sm:inset-auto sm:ml-6 sm:pr-0">
      <span className="hidden text-gray-400 md:block">Logged in as </span>
      <span className="px-1 text-gray-400">{name}</span>
      <button
        type="button"
        onClick={onClick}
        className="px-5 py-2 rounded-full text-gray-1000 bg-main-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
      >
        Sign out
      </button>
    </div>
  );
}
export function UserButton(props) {
  const { user, signIn, signOut } = props;
  if (user) {
    return <LogoutButton user={user} onClick={signOut} />;
  }
  return <LoginButton onClick={signIn} />;
}
