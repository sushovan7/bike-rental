function Accordion() {
  return (
    <div className=" container mb-20 flex flex-col gap-2 mx-auto p-4 sm:w-[80%] md:[w-60%]">
      <h1 className="text-2xl text-center mb-10 font-bold">FAQ</h1>
      <div className="collapse collapse-plus bg-base-200">
        <input type="radio" name="my-accordion-3" defaultChecked />
        <div className="collapse-title text-lg font-medium">
          How do I rent a bike?
        </div>
        <div className="collapse-content text-sm text-gray-400">
          <p>
            Simply browse our bike selection, choose your preferred model, and
            select the rental duration. Complete your booking through our secure
            payment process, and your bike will be ready for pickup or delivery.
          </p>
        </div>
      </div>
      <div className="collapse collapse-plus bg-base-200">
        <input type="radio" name="my-accordion-3" />
        <div className="collapse-title text-lg font-medium">
          Can I buy a bike through the app?
        </div>
        <div className="collapse-content text-sm text-gray-400">
          <p>
            Yes! You can easily browse our collection of bikes available for
            purchase. Once you find the one you like, you can make a secure
            payment and have it delivered to your doorstep.
          </p>
        </div>
      </div>
      <div className="collapse collapse-plus bg-base-200">
        <input type="radio" name="my-accordion-3" />
        <div className="collapse-title text-lg font-medium">
          How are the bikes maintained?
        </div>
        <div className="collapse-content text-sm text-gray-400">
          <p>
            All our bikes are regularly inspected and maintained by professional
            technicians to ensure they are in top condition. Each bike is
            thoroughly cleaned, checked for safety, and tuned before being
            rented or sold.
          </p>
        </div>
      </div>
      <div className="collapse collapse-plus bg-base-200 ">
        <input type="radio" name="my-accordion-3" defaultChecked />
        <div className="collapse-title text-lg font-medium">
          What types of bikes are available for rent or purchase?
        </div>
        <div className="collapse-content text-sm text-gray-400">
          <p>
            We offer a wide range of bikes, including mountain bikes, road
            bikes, city bikes, and electric bikes. Whether you&apos;re looking
            to rent for a day or buy for the long term, we have the perfect bike
            for you.
          </p>
        </div>
      </div>
      <div className="collapse collapse-plus bg-base-200">
        <input type="radio" name="my-accordion-3" defaultChecked />
        <div className="collapse-title text-lg font-medium">
          Are there any delivery or pick-up options?
        </div>
        <div className="collapse-content text-sm text-gray-400">
          <p>
            Yes! We offer both delivery and pick-up options for your
            convenience. You can choose your preferred method during checkout,
            and we&apos;ll make sure your bike arrives or is picked up at the
            designated time and location.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Accordion;
