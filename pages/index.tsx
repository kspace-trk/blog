import fs from 'fs'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect } from 'react'
import styles from '../styles/Home.module.scss'
import { remark } from 'remark';
import html from 'remark-html';
import matter from "gray-matter";
import Link from 'next/link'
import axios from "axios";

type Hoge = {
  pathNames: string[],
  articles: {
    title: string,
    content: string
  }[]
}

export const getStaticProps = async () => {
  const fileNames = fs.readdirSync('./public/articles');
  const articles: string[] = []
  const pathNames: string[] = []
  fileNames.forEach(async (elem) => {
    const article = fs.readFileSync('./public/articles/' + elem)
    const matterResult: any = matter(article);
    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
    const contentHtml = processedContent.toString();
    const hoge: any = {
      title: matterResult.content.split(/\r\n|\n/)[0].replace(/# /g, ''),
      content: contentHtml
    }
    fileNames.forEach((elem) => {
      pathNames.push(elem.replace(/.md/g, ''))
    })
    articles.push(hoge)
  })
  return  {
    props: {
      pathNames,
      articles
    }
  }
}

const Home: NextPage<Hoge> = ({ pathNames, articles }) => {
  useEffect(() => {
    const hoge = async () => {
      await axios.post('https://access-to-webhook.k-space.workers.dev/');
    }
    hoge();
  }, [])
  return (
    <div className={styles.container}>
      <Head>
        <title>わいの日記</title>
        <meta property="og:title" content="わいの日記" />
        <meta property="og:description" content="わいの日記です。ぼちぼち自分用のメモにもなってます。" />
        {/* <meta property="og:image" content="OGP画像のURL" /> */}
        {/* <meta name="twitter:card" content="summary_large_image" /> */}
      </Head>

      <main className={styles.main}>
        <h1>わいの日記</h1>
        <div className={styles['article-wrapper']}>
          {articles.map((elem, index) => {
            return (
              <Link href={"/article/" + pathNames[index]} key={index}>
                {elem.title}
              </Link>
            )
          })}
      </div>
      </main>
    </div>
  )
}

export default Home
