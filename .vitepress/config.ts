import process from 'node:process'
import { defineConfig } from 'vitepress'
import MarkdownItFootnote from 'markdown-it-footnote'
import MarkdownItMathjax3 from 'markdown-it-mathjax3'

import { BiDirectionalLinks } from '@nolebase/markdown-it-bi-directional-links'
import { InlineLinkPreviewElementTransform } from '@nolebase/vitepress-plugin-inline-link-preview/markdown-it'
import { buildEndGenerateOpenGraphImages } from '@nolebase/vitepress-plugin-og-image/vitepress'
import { UnlazyImages } from '@nolebase/markdown-it-unlazy-img'

import { discordLink, githubRepoLink, plainTargetDomain, siteDescription, siteName, targetDomain } from '../metadata'
import { creatorNames, creatorUsernames } from './creators'
import docsMetadata from './docsMetadata.json'
import type { DefaultTheme } from 'vitepress'
import type { HeadConfig } from 'vitepress'

const adsensePublisherId = 'ca-pub-8880838852405341'

function pagePathFromRelativePath(relativePath: string) {
  if (!relativePath || relativePath === 'index.md')
    return '/'

  const pagePath = relativePath
    .replace(/(^|\/)index\.md$/, '$1')
    .replace(/\.md$/, '')
    .split('/')
    .map(segment => encodeURIComponent(segment))
    .join('/')

  return `/${pagePath}`
}

function pageUrlFromRelativePath(relativePath: string) {
  return new URL(pagePathFromRelativePath(relativePath), `${targetDomain}/`).href
}

export default defineConfig({
  vue: {
    template: {
      transformAssetUrls: {
        video: ['src', 'poster'],
        source: ['src'],
        img: ['src'],
        image: ['xlink:href', 'href'],
        use: ['xlink:href', 'href'],
        NolebaseUnlazyImg: ['src'],
      },
    },
  },
  lang: 'zh-CN',
  title: siteName,
  description: siteDescription,
  ignoreDeadLinks: true,
  head: [
    ['meta', {
      name: 'theme-color',
      content: '#ffffff',
    }],
    [
      'link',
      {
        rel: 'apple-touch-icon',
        href: '/apple-touch-icon.png',
        sizes: '180x180',
      },
    ],
    ['link', {
      rel: 'icon',
      href: '/logo.svg',
      type: 'image/svg+xml',
    }],
    [
      'link',
      {
        rel: 'alternate icon',
        href: '/favicon.ico',
        type: 'image/png',
        sizes: '16x16',
      },
    ],
    ['meta', {
      name: 'author',
      content: creatorNames.join(', '),
    }],
    [
      'meta',
      {
        name: 'keywords',
        content:
          ['markdown', 'knowledge-base', '知识库', 'vitepress', 'obsidian', 'notebook', 'notes', ...creatorUsernames].join(', '),
      },
    ],

    ['meta', {
      property: 'og:title',
      content: siteName,
    }],
    [
      'meta',
      {
        property: 'og:image',
        content: `${targetDomain}/og.png`,
      },
    ],
    ['meta', {
      property: 'og:description',
      content: siteDescription,
    }],
    ['meta', {
      property: 'og:site_name',
      content: siteName,
    }],

    ['meta', {
      name: 'twitter:card',
      content: 'summary_large_image',
    }],
    ['meta', {
      name: 'twitter:creator',
      content: creatorUsernames.join(', '),
    }],
    [
      'meta',
      {
        name: 'twitter:image',
        content: `${targetDomain}/og.png`,
      },
    ],

    [
      'link',
      {
        rel: 'mask-icon',
        href: '/safari-pinned-tab.svg',
        color: '#927baf',
      },
    ],
    ['link', {
      rel: 'manifest',
      href: '/site.webmanifest',
    }],
    ['meta', {
      name: 'msapplication-TileColor',
      content: '#603cba',
    }],
    // Baidu
    ['meta', {
      name: 'baidu-site-verification',
      content: 'codeva-ad5e4QVWIp',
    }],
    // Google AdSense
    ['meta', {
      name: 'google-adsense-account',
      content: adsensePublisherId,
    }],
    ['script', { async: 'true', src: `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsensePublisherId}`, crossorigin: 'anonymous' }],
    ...(process.env.VITE_ENABLE_MONDIAD === 'true'
      ? [
          ['meta', {
            name: 'mnd-ver',
            content: 'lbll2shvnggovba1gpbdra',
          }],
          ['script', { async: 'true', src: 'https://ss.mrmnd.com/banner.js' }],
        ] as HeadConfig[]
      : []),
    // Proxying Plausible through Netlify | Plausible docs
    // https://plausible.io/docs/proxy/guides/netlify
    ['script', { defer: 'true', 'data-domain': plainTargetDomain, 'data-api': '/api/v1/page-external-data/submit', src: '/assets/page-external-data/js/script.js' }],
    
    // // PopCash Advertising
    // ['meta', {
    //   name: 'ppck-ver',
    //   content: '372c616635b8ad3fb61918ab8103ae1b',
    // }],
    // ['script', { 'type': 'text/javascript' }, `
    //   var uid = '491706';
    //   var wid = '742094';
    //   var pop_fback = 'up';
    //   var pop_tag = document.createElement('script');pop_tag.src='//cdn.popcash.net/show.js';document.body.appendChild(pop_tag);
    //   pop_tag.onerror = function() {pop_tag = document.createElement('script');pop_tag.src='//cdn2.popcash.net/show.js';document.body.appendChild(pop_tag)};
    // `],

  ],
  transformHead({ pageData }) {
    const url = pageUrlFromRelativePath(pageData.relativePath)
    const isHome = pageData.relativePath === 'index.md'
    const title = pageData.title || siteName
    const description = pageData.description || siteDescription

    return [
      ['link', { rel: 'canonical', href: url }],
      ['meta', { property: 'og:url', content: url }],
      ['meta', { property: 'og:type', content: isHome ? 'website' : 'article' }],
      ['script', { type: 'application/ld+json' }, JSON.stringify({
        '@context': 'https://schema.org',
        '@type': isHome ? 'WebSite' : 'Article',
        name: title,
        headline: title,
        description,
        url,
        image: `${targetDomain}/og.png`,
        publisher: {
          '@type': 'Organization',
          name: siteName,
          logo: {
            '@type': 'ImageObject',
            url: `${targetDomain}/logo.svg`,
          },
        },
        inLanguage: 'zh-CN',
      })],
    ]
  },
  themeConfig: {
    outline: { label: '页面大纲', level: 'deep' },
    darkModeSwitchLabel: '切换主题',
    // editLink: {
    //   pattern: `${githubRepoLink}/tree/main/:path`,
    //   text: '编辑本页面',
    // },
    footer: {
      message: '用 <span style="color: #e25555;">&#9829;</span> 撰写    <a href="/ad/privacy_policy.html">隐私政策</a> ',
      copyright:
        ' © 2025 百搭',
    },
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档',
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                },
              },
            },
          },
        },

        // Add title ang tags field in frontmatter to search
        // You can exclude a page from search by adding search: false to the page's frontmatter.
        _render(src, env, md) {
          // without `md.render(src, env)`, the some information will be missing from the env.
          let html = md.render(src, env)
          let tagsPart = ''
          let headingPart = ''
          let contentPart = ''
          let fullContent = ''
          const sortContent = () => [headingPart, tagsPart, contentPart] as const
          let { frontmatter, content } = env

          if (!frontmatter)
            return html

          if (frontmatter.search === false)
            return ''

          contentPart = content ||= src

          const headingMatch = content.match(/^#{1} .*/m)
          const hasHeading = !!(headingMatch && headingMatch[0] && headingMatch.index !== undefined)

          if (hasHeading) {
            const headingEnd = headingMatch.index! + headingMatch[0].length
            headingPart = content.slice(0, headingEnd)
            contentPart = content.slice(headingEnd)
          }
          else if (frontmatter.title) {
            headingPart = `# ${frontmatter.title}`
          }

          const tags = frontmatter.tags
          if (tags && Array.isArray(tags) && tags.length)
            tagsPart = `Tags: #${tags.join(', #')}`

          fullContent = sortContent().filter(Boolean).join('\n\n')

          html = md.render(fullContent, env)

          return html
        },
      },
    },
    nav: [
      { text: '主页', link: '/' },
      { text: '技术专栏', link: '/技术专栏/' },
      { text: '职场感悟', link: '/职场感悟/' },
      { text: '开源推荐', link: '/开源推荐/' },
      { text: '杂谈随笔', link: '/杂谈随笔/' },
      { text: '最近更新', link: '/toc' },
    ],
    sidebar: docsMetadata.sidebar,
  },
  markdown: {
    theme: {
      light: 'github-light',
      dark: 'one-dark-pro',
    },
    math: true,
    config: (md) => {
      md.use(MarkdownItFootnote)
      md.use(MarkdownItMathjax3)
      md.use(BiDirectionalLinks({
        dir: process.cwd(),
      }))
      md.use(UnlazyImages(), {
        imgElementTag: 'NolebaseUnlazyImg',
      })
      md.use(InlineLinkPreviewElementTransform, {
        tag: 'VPNolebaseInlineLinkPreview',
      })
    },
  },
  async buildEnd(siteConfig) {
    if (process.env.VITE_ENABLE_OG_IMAGE !== 'true')
      return

    await buildEndGenerateOpenGraphImages({
      baseUrl: targetDomain,
      category: {
        byLevel: 2,
      },
    })(siteConfig)
  },
})
