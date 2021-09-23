import { useState, useEffect } from 'react';

export function useActionAfterSaving(loading: boolean, error: boolean, actions: () => void): void {
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (saving && !loading && !error) {
      actions();
    }

    setSaving(loading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, error]);
}
