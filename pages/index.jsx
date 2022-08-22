import axios from 'axios'
import Head from 'next/head'
import { useEffect } from 'react'
import { useState } from 'react'
import AddButton from '../components/AddButton/AddButton'
import AddComponent from '../components/AddComponent/AddComponent'
import ProductList from '../components/ProductList/ProductList'
import Slider from '../components/Slider/Slider'

export default function Home({ productList, isAdmin }) {

  const [modal, setModal] = useState(false)

  useEffect(() => {
    modal ? document.body.style.overflow = 'hidden' : document.body.style.overflow = 'visible'
  }, [modal])

  return (
    <div>
      <Head>
        <title>Pizza Store</title>
        <meta name="description" content="The Best Pizza Store" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Slider />
      {isAdmin && <AddButton setModal={setModal}/>}
      <ProductList 
        productList={productList}
      />
      {modal && <AddComponent setModal={setModal}/>}
    </div>
  )
}

export const getServerSideProps = async context => {
  const myCookie = context.req?.cookies || ""
  let isAdmin = false
  if (myCookie.token === process.env.AUTH_TOKEN) {
    isAdmin = true
  }
  const resp = await axios.get("http://localhost:3000/api/products")
  return {
    props: {
      productList: resp.data,
      isAdmin
    }
  }
}