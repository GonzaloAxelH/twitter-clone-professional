import Link from 'next/link';
import { useState, useEffect, useRef, useId } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import cn from 'clsx';
import { toast } from 'react-hot-toast';
import { addDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { tweetsCollection } from '@lib/firebase/collection';
import { useAuth } from '@lib/context/auth-context';
import type { Variants} from 'framer-motion';
import type { User } from '@lib/types/user';
import type { FilesWithId, ImagesPreview } from '@lib/types/file';
export const variants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 }
};
import type { ReactNode } from 'react';
type InputProps = {
  modal?: boolean;
  reply?: boolean;
  parent?: {
    id: string;
    uisername: string;
  };
  disabled?: boolean;
  children?: ReactNode;
  replyModal?: boolean;
  closeModal?: () => void;
};

export function Input({
  modal,
  reply,
  disabled,
  parent,
  children,
  replyModal,
  closeModal
}: InputProps): JSX.Element {
  const [selectedImages, setSelectedImages] = useState<FilesWithId>([]);
  const [imagesPreview, setImagesPreview] = useState<ImagesPreview>([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState<boolean>(false);

  const { user, isAdmin } = useAuth();
  const { name, username, photoURL } = user as User;

  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (modal) inputRef.current?.focus();
    //return cleanImage;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <form
      className={cn('flex flex-col', {
        '-mx-4': reply,
        'gap-2': replyModal,
        'cursor-not-allowed': disabled
      })}
      onSubmit={() => null}
    >
      {loading && (
        <motion.i className='h-1 animate-pulse bg-main-accent' {...variants} />
          )}
          {children}

    </form>
  );
}
