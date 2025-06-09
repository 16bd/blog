export interface SocialEntry {
  type: 'github' | 'twitter' | 'email'
  icon: string
  link: string
}

export interface Creator {
  avatar: string
  name: string
  username?: string
  title?: string
  org?: string
  desc?: string
  links?: SocialEntry[]
  nameAliases?: string[]
  emailAliases?: string[]
}

const getAvatarUrl = (name: string) => `https://github.com/${name}.png`

export const creators: Creator[] = [
  {
    name: '蛋蛋',
    avatar: '',
    username: 'dandan',
    title: '百搭 原始创作者',
    desc: '开发者，专注于基础设施维护，数据分析，后端、DevOps 开发',
  },
  {
    name: '忧伤',
    avatar: '',
    username: 'youshang',
    title: '百搭 原始创作者',
    desc: '开源开发者，专注于前端，以及前端相关工具库和工具链开发',
  },
].map<Creator>((c) => {
  c.avatar = c.avatar || getAvatarUrl(c.username)
  return c as Creator
})

export const creatorNames = creators.map(c => c.name)
export const creatorUsernames = creators.map(c => c.username || '')
