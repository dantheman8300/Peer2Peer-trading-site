import OfferCardInput from "./offerCardInput";
import CreatedOfferList from "./createdOfferList";
import AcceptedOfferList from "./acceptedOfferList";
import ArbiterOfferList from "./arbitratedOfferList";


export default function CreateSection() {
  return (
    <div className="flex flex-col items-center">
      <OfferCardInput />
      <div className="m-10">
        {/* <h1 className="text-3xl font-bold text-center">Your Offers</h1> */}
        <div className="flex flex-row flex-wrap justify-center gap-4 overflow-x-auto">
          <CreatedOfferList />
          <AcceptedOfferList />
          <ArbiterOfferList />
        </div>
      </div>
    </div>
  )
}