<script setup lang="ts">
import { computed, onMounted, watchEffect } from 'vue'
import { useData, useRoute } from 'vitepress'
import { siteDescription, siteName, targetDomain } from '../../../metadata'

const route = useRoute()
const { page, frontmatter } = useData()

const pageUrl = computed(() => new URL(route.path, targetDomain).href)
const pageTitle = computed(() => frontmatter.value.title || page.value.title || siteName)
const pageDescription = computed(() => frontmatter.value.description || page.value.description || siteDescription)

function upsertLink(rel: string, href: string) {
  let element = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)

  if (!element) {
    element = document.createElement('link')
    element.rel = rel
    document.head.appendChild(element)
  }

  element.href = href
}

function upsertMeta(selector: string, attr: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(selector)

  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attr, key)
    document.head.appendChild(element)
  }

  element.content = content
}

function upsertJsonLd(id: string, data: Record<string, unknown>) {
  let element = document.head.querySelector<HTMLScriptElement>(`#${id}`)

  if (!element) {
    element = document.createElement('script')
    element.id = id
    element.type = 'application/ld+json'
    document.head.appendChild(element)
  }

  element.textContent = JSON.stringify(data)
}

onMounted(() => {
  watchEffect(() => {
    upsertLink('canonical', pageUrl.value)
    upsertMeta('meta[property="og:url"]', 'property', 'og:url', pageUrl.value)
    upsertMeta('meta[property="og:type"]', 'property', 'og:type', frontmatter.value.layout === 'home' ? 'website' : 'article')

    upsertJsonLd('bd-jsonld', {
      '@context': 'https://schema.org',
      '@type': frontmatter.value.layout === 'home' ? 'WebSite' : 'Article',
      name: pageTitle.value,
      headline: pageTitle.value,
      description: pageDescription.value,
      url: pageUrl.value,
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
    })
  })
})
</script>

<template>
  <span hidden />
</template>
