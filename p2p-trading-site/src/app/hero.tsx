

export default function Hero() {
  return (
    <div className="hero bg-base-300">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Welcome!</h1>
          <p className="py-6">Welcome to Overmind's peer 2 peer trading quest's site. This site connects to our peer trading quest. Connect your deployed peer trading module to watch your code come to life!</p>
          <div className="flex gap-2 justify-center"> 
            <a href="/view">
              <button className="btn btn-primary">View new offers</button>
            </a>
            <a href="/account">
              <button className="btn btn-secondary">View your account's offers</button>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}