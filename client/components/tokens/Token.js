import { Terminal, Upload, Trash2 } from 'react-feather';
import { LocalDate, DeleteButton } from '../util';

export default function Token({ data, onDelete }) {
  const {
    token, timestamp, lifetime, scopes, id,
  } = data;
  const exp = lifetime + new Date(timestamp).getTime();

  let type = 'API';
  if (scopes.includes('upload')) {
    type = 'Upload';
  }

  const getIcon = () => {
    if (type === 'API') {
      return <Terminal size={24} />;
    }
    return <Upload size={24} />;
  };

  return (
    <div className="flex items-center p-2 m-2 text-sm bg-white border border-gray-300 rounded-xl space-x-4">
      <div className="p-1 border shrink-0 text-sky-700 justify-self-start border-sky-700 rounded-md">
        {getIcon()}
      </div>
      <div>
        <div className="text-lg font-medium text-black">
          {type}
          {' '}
          Token
        </div>
        <p>
          Expires:
          <LocalDate value={exp} />
        </p>
      </div>
      <div className="px-3 font-mono text-lg font-semibold grow">{token}</div>
      <div className="justify-self-end">
        <DeleteButton onClick={() => onDelete(id)}>
          <Trash2 size={24} />
        </DeleteButton>
      </div>
    </div>
  );
}
