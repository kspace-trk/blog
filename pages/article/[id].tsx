import fs from 'fs'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect } from 'react'
import { remark } from 'remark';
import html from 'remark-html';
import matter from "gray-matter";
import article from '../../styles/article.module.scss';
import axios from "axios";

type Hoge = {
  contentHtml: string,
  matterResult: any,
  articleTitle: string
}

export async function getStaticPaths() {
  const fileNames = fs.readdirSync('./public/articles');
  const pathNames: string[] = []
  const paths: any = []
  fileNames.forEach((elem) => {
    paths.push({
      params: {
        id: elem.replace(/.md/g, '')
      }
    })
  })
  return {
    paths,
    fallback: false // false or 'blocking'
  };
}

export const getStaticProps = async (context: any) => {
  const article = fs.readFileSync('./public/articles/' + context.params.id + '.md')
  // Use gray-matter to parse the post metadata section
  const matterResult = matter(article);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  const articleTitle: String = matterResult.content.split(/\r\n|\n/)[0].replace(/# /g, '')

  return  {
    props: {
      contentHtml,
      articleTitle
    }
  }
}

const Home: NextPage<Hoge> = ({ matterResult, contentHtml, articleTitle }) => {
  useEffect(() => {
    const hoge = async () => {
      await axios.post('https://access-to-webhook.k-space.workers.dev/');
    }
    hoge();
  }, [])
  return (
    <div className={article.wrapper}>
      <Head>
        <title>{articleTitle}</title>
        <meta property="og:title" content={articleTitle} />
        <meta property="og:description" content="わいの日記です。ぼちぼち自分用のメモにもなってます。" />
        {/* <meta property="og:image" content="OGP画像のURL" /> */}
        {/* <meta name="twitter:card" content="summary_large_image" /> */}
      </Head>

      <main className={article.main}>
        <div className={article.container} dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </main>
    </div>
  )
}

export default Home
