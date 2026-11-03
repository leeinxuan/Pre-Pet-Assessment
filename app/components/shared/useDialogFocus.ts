"use client";

import { useEffect, useRef } from "react";
import type { RefObject } from "react";

const focusableSelector = 'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Gives modal dialogs the same baseline keyboard behaviour without coupling it
 * to a particular flow: focus enters the dialog, stays inside it, Escape
 * closes it, and focus returns to the opener afterwards.
 */
export function useDialogFocus({
  isOpen,
  dialogRef,
  onClose,
  getReturnFocus,
}: {
  isOpen: boolean;
  dialogRef: RefObject<HTMLElement | null>;
  onClose: () => void;
  getReturnFocus?: () => HTMLElement | null;
}) {
  const onCloseRef = useRef(onClose);
  const getReturnFocusRef = useRef(getReturnFocus);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    getReturnFocusRef.current = getReturnFocus;
  }, [getReturnFocus]);

  useEffect(() => {
    if (!isOpen) return;

    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const resolveReturnFocus = getReturnFocusRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusFirst = () => {
      const dialog = dialogRef.current;
      const first = dialog?.querySelector<HTMLElement>(focusableSelector);
      (first ?? dialog)?.focus();
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onCloseRef.current();
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = Array.from(dialogRef.current?.querySelectorAll<HTMLElement>(focusableSelector) ?? []);
      if (!focusable.length) {
        event.preventDefault();
        dialogRef.current?.focus();
        return;
      }
      const first = focusable[0];
      const last = focusable.at(-1)!;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const timer = window.setTimeout(focusFirst, 0);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      // Some interactions replace their opener while the dialog is open (for
      // example, a room hazard becomes an "already secured" review button).
      // Let those dialogs identify the equivalent control instead of dropping
      // keyboard focus back onto <body>.
      window.setTimeout(() => {
        const returnTarget = resolveReturnFocus?.();
        if (returnTarget?.isConnected) {
          returnTarget.focus();
        } else if (previouslyFocused?.isConnected) {
          previouslyFocused.focus();
        }
      }, 0);
    };
  }, [dialogRef, isOpen]);
}
