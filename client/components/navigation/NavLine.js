import React from 'react';

export default function NavLine({ state }) {
  if (state === 'complete') {
    return <div className="flex-auto mx-3 border-t-2 border-blue" />;
  }
  if (state === 'active' || state === 'enabled') {
    return <div className="flex-auto mx-3 border-t-2 border-blue" />;
  }
  return <div className="flex-auto mx-3 border-t-2 border-gray-400" />;
}
