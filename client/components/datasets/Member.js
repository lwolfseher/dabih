import React from 'react';
import { Trash2, User } from 'react-feather';
import { Switch } from '@headlessui/react';
import { DeleteButton } from '../util';
import { useDatasets } from './Context';

export default function Member({ data, dataset }) {
  const { mnemonic } = dataset;
  const {
    sub, name, permission,
  } = data;
  const { setAccess } = useDatasets();
  const enabled = permission === 'write';
  const removed = permission === 'none';
  const canEdit = dataset.permission === 'write';

  const toggle = async () => {
    if (!canEdit) {
      return;
    }
    if (enabled) {
      await setAccess(mnemonic, sub, 'read');
    } else {
      await setAccess(mnemonic, sub, 'write');
    }
  };
  const onDelete = async () => setAccess(mnemonic, sub, 'none');

  const getSwitch = () => {
    if (removed) {
      return (
        <span className="px-3 font-semibold text-gray-mid whitespace-nowrap">
          Access removed
        </span>
      );
    }
    if (!canEdit) {
      return <span className="px-3 text-gray-mid">{permission}</span>;
    }
    return (
      <>
        <div className="text-xs text-center">Can edit</div>
        <div className="px-2 text-center justify-self-end">
          <Switch
            checked={enabled}
            onChange={toggle}
            className={`${enabled ? 'bg-main-mid' : 'bg-gray-mid'}
          relative inline-flex h-[28px] w-[52px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
          >
            <span className="sr-only">User write permission</span>
            <span
              aria-hidden="true"
              className={`${enabled ? 'translate-x-6' : 'translate-x-0'}
            pointer-events-none inline-block h-[24px] w-[24px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
            />
          </Switch>
        </div>
      </>
    );
  };

  const getDelete = () => {
    if (!canEdit || removed) {
      return null;
    }
    return (
      <div>
        <DeleteButton onClick={onDelete}>
          <Trash2 size={18} />
        </DeleteButton>
      </div>
    );
  };

  return (
    <div className="flex items-center mx-auto text-sm bg-white border-b border-gray-mid space-x-4">
      <div className="px-2 shrink-0 text-main-mid justify-self-start">
        <User size={20} />
      </div>
      <div className="container font-semibold text-main-mid mx-auto">{name}</div>
      {getDelete()}
      {getSwitch()}
    </div>
  );
}
