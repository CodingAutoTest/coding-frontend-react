// src/hooks/useIamportScript.ts
import { useEffect } from 'react';

const useIamportScript = () => {
  useEffect(() => {
    const scriptId = 'iamport-payment-script';
    if (document.getElementById(scriptId)) return;

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = 'https://cdn.iamport.kr/js/iamport.payment-1.2.0.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);
};

export default useIamportScript;
