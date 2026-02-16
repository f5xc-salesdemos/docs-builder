import { createF5xcDocsConfig } from 'f5xc-docs-theme/config';
import UnoCSS from '@unocss/astro';
import icon from 'astro-icon';

export default createF5xcDocsConfig({
  additionalIntegrations: [UnoCSS(), icon()],
});
