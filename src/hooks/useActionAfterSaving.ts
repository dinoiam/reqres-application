import { useState, useEffect } from 'react';

type UseActionAfterSavingProps = { loading: boolean; error: boolean; actions: () => void };

export function useActionAfterSaving({ loading, error, actions }: UseActionAfterSavingProps): void {
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (saving && !loading && !error) {
      actions();
    }

    setSaving(loading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, error]);
}
