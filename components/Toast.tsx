
'use client'



import { useEffect, useState } from 'react';



interface ToastProps {

  message: string;

  onClose: () => void;

  isVisible: boolean; // 控制显示的 prop

}



export default function Toast({ message, onClose, isVisible }: ToastProps) {

  const [opacity, setOpacity] = useState(0);



  useEffect(() => {

    if (isVisible) {

      setOpacity(1);

      const hideTimer = setTimeout(() => {

        setOpacity(0);

        onClose();

      }, 3000); // 3秒后隐藏



      return () => clearTimeout(hideTimer);

    }

  }, [isVisible, onClose]);



  return (

    <div

      className="fixed top-4 left-1/2 transform -translate-x-1/2 mt-4 p-4 bg-foreground/10 text-foreground text-center rounded-md"

      style={{ transition: 'opacity 300ms ease-in-out', opacity }}

    >

      {message}

    </div>

  );

}
