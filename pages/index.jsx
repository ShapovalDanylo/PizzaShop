import axios from 'axios'
import Head from 'next/head'
import Image from 'next/image'
import ProductList from '../components/ProductList/ProductList'
import Slider from '../components/Slider/Slider'

export default function Home({ productList }) {

  return (
    <div>
      <Head>
        <title>Pizza Store</title>
        <meta name="description" content="The Best Pizza Store" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Slider />
      <ProductList 
        productList={productList}
      />
    </div>
  )
}

export const getServerSideProps = async () => {
  const resp = await axios.get("http://localhost:3000/api/products");
  return {
    props: {
      productList: resp.data
    }
  }
}