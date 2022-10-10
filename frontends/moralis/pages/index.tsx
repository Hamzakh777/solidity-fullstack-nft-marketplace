import type { NextPage } from "next"
import Head from "next/head"
import { BasicLayout } from "../layouts/BasicLayout"

const Home: NextPage = () => {
  return (
    <BasicLayout>
      <div>
        <Head>
          <title>NFT Marketplace</title>
          <meta name="description" content="NFT Marketplace" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
      </div>
    </BasicLayout>
  )
}

export default Home
