import { useEffect, useState } from 'react'
import type { NextPage, GetServerSideProps } from 'next'

interface CatCategory {
    id: number
    name: string
}

interface SearchCatImage {
    breeds: string[]
    categories: CatCategory
    id: string
    url: string
    width: number
    height: number
}

type SearchCatImageResponse = SearchCatImage[]



const fetchCatImage = async (): Promise<SearchCatImage> => {
    const res = await fetch("https://api.thecatapi.com/v1/images/search")
    const result = await res.json() as SearchCatImageResponse
        // 「as」:TypeScriptには、型推論を上書きする機能があります。その機能を型アサーション(type assertion)と言います。
    return result[0]
}

interface IndexPageProps {
    initialCatImageUrl: string
}

const IndexPage: NextPage<IndexPageProps> = ({initialCatImageUrl}) => {
    const [catImageUrl, setCatImageUrl] = useState(initialCatImageUrl)

    const handleClick = async() => {
        const image = await fetchCatImage()
        setCatImageUrl(image.url)
    }

    return (
        <>
            <button onClick={handleClick}>きょうのにゃんこ🐱</button>
            <div style={{ marginTop: 8 }}>
                <img src={catImageUrl} />
            </div>
        </>
    )
}

export const getServerSideProps: GetServerSideProps<
    IndexPageProps
> = async () => {
    const catImage = await fetchCatImage()
    return{
        props: {
            initialCatImageUrl: catImage.url
        }
    }
}

export default IndexPage