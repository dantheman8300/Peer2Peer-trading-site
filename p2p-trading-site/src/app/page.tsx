import Header from "./components/header";
import Hero from "./hero";


export default function Page() {
  return (
    <div className="min-h-screen flex flex-col bg-base-300">
      <Header 
        title="Aptos P2P Trading"  
      />
      <div className="m-10">
        <Hero />
      </div>
      
    </div>
  )
}