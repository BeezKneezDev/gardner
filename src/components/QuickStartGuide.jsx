import React from "react";

const QuickStartGuide = () => {
  const images = Array.from({ length: 10 }, (_, index) => index + 1); // Creates an array [1, 2, 3, ..., 10]

  return (
    <section className=" bg-white text-center border-t-2 pt-32">
      <h3 className="text-7xl  font-bold mb-4 text-slate-600">
        Quick Start <span className="text-green-600">Guide</span>
      </h3>
      <p className="text-2xl text-gray-700 mb-8">
        Get started with these essential tips and tricks to kickstart your
        gardening journey. Click on any image to learn more!
      </p>
      <div className="grid grid-cols-5 gap-2">
        {images.map((index) => (
          <div
            key={index}
            className="relative overflow-hidden"
            style={{
              backgroundImage: `url(/images/${index}.jpg)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              width: "100%",
              paddingTop: "100%", // Maintain aspect ratio (1:1 in this case)
            }}
          >
            {/* Optionally, you can add content inside the div if needed */}
            {/* <p>Content here</p> */}
          </div>
        ))}
      </div>
    </section>
  );
};

export default QuickStartGuide;
