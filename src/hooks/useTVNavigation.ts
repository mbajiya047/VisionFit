import { useEffect, useCallback } from 'react';
import { tvAudio } from '../services/audioService';

interface NavigationOptions {
  onBack?: () => void;
  onSelect?: () => void;
  onPlayPause?: () => void;
  enabled?: boolean;
}

export function useTVNavigation(options: NavigationOptions = {}) {
  const { onBack, onPlayPause, enabled = true } = options;

  // Find all focusable elements currently visible in the DOM
  const getFocusableElements = useCallback((): HTMLElement[] => {
    const selector = 'button:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled]), a[href], input:not([disabled]), [data-tv-focus="true"]';
    const elements = Array.from(document.querySelectorAll<HTMLElement>(selector));
    return elements.filter(el => {
      // Must be visible
      const rect = el.getBoundingClientRect();
      const style = window.getComputedStyle(el);
      return (
        rect.width > 0 &&
        rect.height > 0 &&
        style.display !== 'none' &&
        style.visibility !== 'hidden' &&
        style.opacity !== '0'
      );
    });
  }, []);

  // Spatial direction calculation (find closest element in vector direction)
  const findNextSpatialElement = useCallback((
    currentEl: HTMLElement,
    direction: 'up' | 'down' | 'left' | 'right'
  ): HTMLElement | null => {
    const focusables = getFocusableElements();
    const currentRect = currentEl.getBoundingClientRect();
    const currentCenter = {
      x: currentRect.left + currentRect.width / 2,
      y: currentRect.top + currentRect.height / 2,
    };

    let bestCandidate: HTMLElement | null = null;
    let minDistance = Infinity;

    for (const el of focusables) {
      if (el === currentEl) continue;
      const rect = el.getBoundingClientRect();
      const center = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      };

      const dx = center.x - currentCenter.x;
      const dy = center.y - currentCenter.y;

      let isCandidate = false;

      switch (direction) {
        case 'up':
          if (dy < -5) {
            // prioritize vertical alignment, penalize horizontal deviation
            const dist = Math.abs(dy) * 1.0 + Math.abs(dx) * 2.2;
            if (dist < minDistance) {
              minDistance = dist;
              bestCandidate = el;
            }
          }
          break;
        case 'down':
          if (dy > 5) {
            const dist = dy * 1.0 + Math.abs(dx) * 2.2;
            if (dist < minDistance) {
              minDistance = dist;
              bestCandidate = el;
            }
          }
          break;
        case 'left':
          if (dx < -5) {
            const dist = Math.abs(dx) * 1.0 + Math.abs(dy) * 2.5;
            if (dist < minDistance) {
              minDistance = dist;
              bestCandidate = el;
            }
          }
          break;
        case 'right':
          if (dx > 5) {
            const dist = dx * 1.0 + Math.abs(dy) * 2.5;
            if (dist < minDistance) {
              minDistance = dist;
              bestCandidate = el;
            }
          }
          break;
      }
    }

    return bestCandidate;
  }, [getFocusableElements]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!enabled) return;

    // Handle Fire TV Back key
    if (e.key === 'Escape' || e.key === 'Backspace' || e.key === 'GoBack') {
      if (onBack) {
        e.preventDefault();
        tvAudio.playNavTick();
        onBack();
        return;
      }
    }

    // Media Play/Pause
    if (e.key === 'MediaPlayPause' || (e.code === 'Space' && e.target === document.body)) {
      if (onPlayPause) {
        e.preventDefault();
        tvAudio.playNavTick();
        onPlayPause();
        return;
      }
    }

    const directionMap: Record<string, 'up' | 'down' | 'left' | 'right'> = {
      ArrowUp: 'up',
      ArrowDown: 'down',
      ArrowLeft: 'left',
      ArrowRight: 'right',
    };

    const direction = directionMap[e.key];
    if (!direction) return;

    e.preventDefault();

    const activeEl = document.activeElement as HTMLElement;
    const focusables = getFocusableElements();

    if (!activeEl || activeEl === document.body || !focusables.includes(activeEl)) {
      // Nothing focused, focus the first available element
      if (focusables.length > 0) {
        focusables[0].focus();
        tvAudio.playNavTick();
        focusables[0].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
      return;
    }

    const nextEl = findNextSpatialElement(activeEl, direction);
    if (nextEl) {
      nextEl.focus();
      tvAudio.playNavTick();
      nextEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [enabled, onBack, onPlayPause, getFocusableElements, findNextSpatialElement]);

  // Support Gamepad API (Fire TV Game Controller / D-pad)
  useEffect(() => {
    let animId: number;
    let lastButtonState: boolean[] = [];

    const pollGamepad = () => {
      const gamepads = navigator.getGamepads ? navigator.getGamepads() : [];
      const gp = gamepads[0];
      if (gp) {
        // D-pad indices: 12 (up), 13 (down), 14 (left), 15 (right), 0 (A/select), 1 (B/back)
        const buttons = [
          gp.buttons[12]?.pressed, // Up
          gp.buttons[13]?.pressed, // Down
          gp.buttons[14]?.pressed, // Left
          gp.buttons[15]?.pressed, // Right
          gp.buttons[0]?.pressed,  // Select (A)
          gp.buttons[1]?.pressed,  // Back (B)
        ];

        if (buttons[0] && !lastButtonState[0]) {
          window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
        }
        if (buttons[1] && !lastButtonState[1]) {
          window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
        }
        if (buttons[2] && !lastButtonState[2]) {
          window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
        }
        if (buttons[3] && !lastButtonState[3]) {
          window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
        }
        if (buttons[4] && !lastButtonState[4]) {
          const activeEl = document.activeElement as HTMLElement;
          if (activeEl) activeEl.click();
        }
        if (buttons[5] && !lastButtonState[5]) {
          if (onBack) onBack();
        }

        lastButtonState = buttons;
      }
      animId = requestAnimationFrame(pollGamepad);
    };

    animId = requestAnimationFrame(pollGamepad);
    return () => cancelAnimationFrame(animId);
  }, [onBack]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);
}
