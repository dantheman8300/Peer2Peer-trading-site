import Header from "./components/header";
import Hero from "./hero";


export default function Page() {
  return (
    <div className="h-screen flex flex-col">
      <Header 
        title="Aptos P2P Trading"  
      />
      <div className="flex flex-grow">
        <Hero />
      </div>
      
    </div>
  )
}