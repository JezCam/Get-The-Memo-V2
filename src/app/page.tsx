import Image from 'next/image'
import Pieces from './components/pieces'

export default function Home() {
    return (
        <main className="h-[100vh] bg-[#131828] flex items-center justify-center">
            <div className="bg-[#2e3349] h-full flex items-center p-10">
                <Pieces />
            </div>
        </main>
    )
}
