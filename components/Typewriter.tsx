"use client";
import React, { useState, useEffect } from 'react';

export const Typewriter = ({ words, className }: { words: string[]; className?: string }) => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [wordIdx, setWordIdx] = useState(0);

  useEffect(() => {
    const currentWord = words[wordIdx];
    let typeSpeed = isDeleting ? 30 : 70;

    if (!isDeleting && text === currentWord) {
      typeSpeed = 2000;
      setTimeout(() => setIsDeleting(true), typeSpeed);
      return;
    } else if (isDeleting && text === '') {
      setIsDeleting(false);
      setWordIdx((prev) => (prev + 1) % words.length);
      typeSpeed = 500;
      return;
    }

    const timeout = setTimeout(() => {
      setText(currentWord.substring(0, text.length + (isDeleting ? -1 : 1)));
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIdx, words]);

  return (
    <span className={className}>
      {text}
      <span className="typo-cursor"></span>
    </span>
  );
};