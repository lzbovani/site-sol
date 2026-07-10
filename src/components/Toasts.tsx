import { CheckIcon } from './Icons';
import { useStore } from '../context/StoreContext';

export function Toasts() {
  const { toasts } = useStore();
  return (
    <div className="toast-region" aria-live="polite" aria-atomic="true">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast toast--${toast.tone}`}>
          <CheckIcon /><span>{toast.message}</span>
        </div>
      ))}
    </div>
  );
}
