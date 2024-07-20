import React from "react";

function Intro() {
  return (
    <section className="my-8 md:py-20 flex flex-col md:flex-row mx- ">
      <div className="p-20 md:w-2/5 md:pr-8 mb-4 md:mb-0 ">
        <h2 className="text-8xl text-green-600 font-bold mb-4">
          Welcome to Beezkneez Kiwi Gardener
        </h2>
        <h4 className="text-4xl ">
          At Beezkneez Kiwi Gardener, we're passionate about helping beginners
          in New Zealand start and maintain their own gardens.
        </h4>
      </div>
      <div className="md:w-3/5 m-auto p-20 pr-40">
        <p className=" text-2xl text-gray-700">
          From tips and tricks to in-depth guides, we have everything you need
          to grow your green thumb. Join us on this journey and let's make
          gardening fun and accessible for everyone! Nullam dictum felis eu pede
          mollis pretium. Nulla sit amet est. Nunc sed turpis. Pellentesque
          posuere. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Ut
          a nisl id ante tempus hendrerit. Vestibulum purus quam, scelerisque
          ut, mollis sed, nonummy id, metus. Maecenas tempus, tellus eget
          condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem
          neque sed ipsum. Pellentesque posuere. Donec venenatis vulputate
          lorem.
        </p>
      </div>
    </section>
  );
}

export default Intro;
