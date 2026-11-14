// src/ui/panels/hideBiomeTip.js
import { byId } from '@/utils';

/** Oculta la etiqueta de bioma. */
export const hideBiomeTip = () => {
  byId('tip').hidden = true;
};
