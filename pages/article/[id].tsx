import fs from 'fs'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect } from 'react'
import { remark } from 'remark';
import html from 'remark-html';
import matter from "gray-matter";
import article from '../../styles/article.module.scss';

type Hoge = {
  contentHtml: string,
  matterResult: any
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

  return  {
    props: {
      contentHtml
    }
  }
}

const Home: NextPage<Hoge> = ({ matterResult, contentHtml }) => {
  useEffect(() => {
  }, [])
  return (
    <div className={article.wrapper}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={article.main}>
        <div className={article.container} dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </main>
    </div>
  )
}

export default Home