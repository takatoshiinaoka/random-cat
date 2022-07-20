import { useEffect, useState } from 'react'

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



const IndexPage = () => {
    const [catImageUrl, setCatImageUrl] = useState(
        "https://cdn2.thecatapi.com/images/bpc.jpg"
    )

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

export default IndexPage