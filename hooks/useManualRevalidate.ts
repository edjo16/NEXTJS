import { useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import { useInsigth } from '@/context/Insight';

export function useManualRevalidate() {
  const { refreshInsights } = useInsigth();

  const revalidate = useCallback(async () => {
    const toastId = toast.info('Updating content...', { autoClose: false });
    
    try {
      const response = await fetch('/api/revalidate-insights', {
        method: 'POST',
      });

      if (response.ok) {
        toast.dismiss(toastId);
        toast.success('¡Insights y Contacts are updated!', { autoClose: 2000 });
        
        // Forzar actualización del cliente
        refreshInsights();
      } else {
        toast.dismiss(toastId);
        toast.error('Error ', { autoClose: 3000 });
      }
    } catch (error) {
      toast.dismiss(toastId);
      toast.error('Conextion Error', { autoClose: 3000 });
      console.error('Error revalidating:', error);
    }
  }, [refreshInsights]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'F4') {
        event.preventDefault();
        revalidate();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [revalidate]);

  return { revalidate };
}
