import breaks from '@bytemd/plugin-breaks';
import frontmatter from '@bytemd/plugin-frontmatter';
import gfm from '@bytemd/plugin-gfm';
import gfm_zhHans from '@bytemd/plugin-gfm/locales/zh_Hans.json';
import highlightSSR from '@bytemd/plugin-highlight-ssr';
import mediumZoom from '@bytemd/plugin-medium-zoom';
import { type EditorProps } from '@bytemd/react';
import { merge } from 'lodash-es';

import { codeBlockPlugin, prettyLinkPlugin } from './plugins';

export const plugins = [
  breaks(),//自动换行插件。
  frontmatter(),//支持 YAML 前置内容插件
  mediumZoom(),//图片放大插件。
  gfm({ locale: gfm_zhHans }),//GitHub Flavored Markdown (GFM) 插件，带有中文简体的本地化。
  highlightSSR(),//代码高亮插件（服务器端渲染）。
  prettyLinkPlugin(),//自定义的美化链接插件。
  codeBlockPlugin(),//自定义的代码块插件。
];

export const sanitize: EditorProps['sanitize'] = (schema) => {
  const customerSchema = merge(schema, {
    tagNames: ['iframe'],
    attributes: {
      iframe: [
        'src',
        'style',
        'title',
        'all',
        'sandbox',
        'scrolling',
        'border',
        'frameborder',
        'framespacing',
        'allowfullscreen',
      ],
    },
  } as typeof schema);

  return customerSchema;
};
