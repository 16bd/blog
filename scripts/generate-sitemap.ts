#!/usr/bin/env tsx
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import fs from 'fs-extra'
import fg from 'fast-glob'
import matter from 'gray-matter'
import { targetDomain } from '../metadata'

export const DIR_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
export const DIR_PUBLIC = resolve(DIR_ROOT, 'public')

interface SitemapUrl {
  loc: string
  lastmod?: string
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority?: number
}

/**
 * 获取文件的最后修改时间
 * @param filePath 文件路径
 * @returns ISO格式的时间字符串
 */
async function getLastModified(filePath: string): Promise<string> {
  try {
    const stats = await fs.stat(filePath)
    return stats.mtime.toISOString()
  } catch {
    return new Date().toISOString()
  }
}

/**
 * 从frontmatter中获取页面标题
 * @param filePath 文件路径
 * @returns 页面标题
 */
async function getPageTitle(filePath: string): Promise<string> {
  try {
    const content = await fs.readFile(filePath, 'utf-8')
    const { data } = matter(content)
    return data.title || data.name || ''
  } catch {
    return ''
  }
}

/**
 * 生成sitemap XML内容
 * @param urls URL列表
 * @returns XML字符串
 */
function generateSitemapXml(urls: SitemapUrl[]): string {
  const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>'
  const urlsetStart = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
  const urlsetEnd = '</urlset>'

  const urlElements = urls.map(url => {
    let element = `  <url>\n    <loc>${url.loc}</loc>`
    
    if (url.lastmod) {
      element += `\n    <lastmod>${url.lastmod}</lastmod>`
    }
    
    if (url.changefreq) {
      element += `\n    <changefreq>${url.changefreq}</changefreq>`
    }
    
    if (url.priority) {
      element += `\n    <priority>${url.priority}</priority>`
    }
    
    element += '\n  </url>'
    return element
  }).join('\n')

  return `${xmlHeader}\n${urlsetStart}\n${urlElements}\n${urlsetEnd}`
}

/**
 * 主函数：生成sitemap
 */
async function generateSitemap() {
  console.log('开始生成sitemap.xml...')

  // 扫描所有markdown文件
  const markdownFiles = await fg('**/*.md', {
    onlyFiles: true,
    cwd: DIR_ROOT,
    ignore: [
      'node_modules/**',
      '.vitepress/**',
      '.obsidian/**',
      '.git/**',
      'dist/**',
      'scripts/**',
      'metadata/**',
      'ad/**',
      'toc.md',
      'README.md',
      'index.md', // 排除根目录的index.md，因为它是首页
    ],
  })

  console.log(`找到 ${markdownFiles.length} 个markdown文件`)

  const sitemapUrls: SitemapUrl[] = []

  // 添加首页
  sitemapUrls.push({
    loc: targetDomain,
    changefreq: 'daily',
    priority: 1.0,
  })

  // 处理每个markdown文件
  for (const file of markdownFiles) {
    const filePath = resolve(DIR_ROOT, file)
    const relativePath = file.replace(/\.md$/, '')
    
    // 跳过index.md文件（目录索引页）
    if (file.endsWith('index.md')) {
      continue
    }

    // 获取文件的最后修改时间
    const lastmod = await getLastModified(filePath)
    
    // 获取页面标题用于确定优先级
    const title = await getPageTitle(filePath)
    
    // 根据文件路径确定优先级和更新频率
    let priority = 0.5
    let changefreq: 'daily' | 'weekly' | 'monthly' = 'weekly'
    
    if (file.startsWith('技术专栏/')) {
      priority = 0.8
      changefreq = 'weekly'
    } else if (file.startsWith('职场感悟/')) {
      priority = 0.7
      changefreq = 'weekly'
    } else if (file.startsWith('开源推荐/')) {
      priority = 0.6
      changefreq = 'monthly'
    } else if (file.startsWith('杂谈随笔/')) {
      priority = 0.5
      changefreq = 'monthly'
    }

    sitemapUrls.push({
      loc: `${targetDomain}/${relativePath}`,
      lastmod,
      changefreq,
      priority,
    })
  }

  // 按优先级排序
  sitemapUrls.sort((a, b) => (b.priority || 0) - (a.priority || 0))

  // 生成XML内容
  const sitemapXml = generateSitemapXml(sitemapUrls)

  // 写入文件
  const sitemapPath = resolve(DIR_PUBLIC, 'sitemap.xml')
  await fs.writeFile(sitemapPath, sitemapXml, 'utf-8')

  console.log(`✅ sitemap.xml 已生成到: ${sitemapPath}`)
  console.log(`📊 包含 ${sitemapUrls.length} 个URL`)
  
  // 输出统计信息
  const stats = {
    '技术专栏': sitemapUrls.filter(url => url.loc.includes('/技术专栏/')).length,
    '职场感悟': sitemapUrls.filter(url => url.loc.includes('/职场感悟/')).length,
    '开源推荐': sitemapUrls.filter(url => url.loc.includes('/开源推荐/')).length,
    '杂谈随笔': sitemapUrls.filter(url => url.loc.includes('/杂谈随笔/')).length,
  }
  
  console.log('📈 各分类统计:')
  Object.entries(stats).forEach(([category, count]) => {
    console.log(`  ${category}: ${count} 个页面`)
  })
}

// 直接执行脚本
console.log('脚本开始执行...')
generateSitemap().catch(console.error)

export { generateSitemap }
