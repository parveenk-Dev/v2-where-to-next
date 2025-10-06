import { useEffect, useState, useCallback } from "react";
import { Button } from "../ui/button";
import { ChevronsDown, ArrowRight, ArrowLeft } from "lucide-react";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselImages = [
    "assets/Carousel/Home-page-carousel_1.jpg",
    "assets/Carousel/Home-page-carousel_2.jpg",
    "assets/Carousel/Home-page-carousel_3.jpg",
    "assets/Carousel/Home-page-carousel_4.jpg",
    "assets/Carousel/Home-page-carousel_5.jpg",
    "assets/Carousel/Home-page-carousel_6.jpg",
  ];

  // Manual navigation functions
  const goToPreviousSlide = useCallback(() => {
    setCurrentSlide((prev) =>
      prev === 0 ? carouselImages.length - 1 : prev - 1
    );
  }, [carouselImages.length]);

  const goToNextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  }, [carouselImages.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        goToPreviousSlide();
      } else if (event.key === "ArrowRight") {
        goToNextSlide();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [goToPreviousSlide, goToNextSlide]);

  window.addEventListener("scroll", function () {
    const topSection = document?.querySelector(".top-section");
    const stickyImage = document?.querySelector(".sticky-image") as HTMLElement;

    const topSectionHeight = (topSection as HTMLElement)?.offsetHeight;
    const scrollY = window.scrollY;

    // Check if the top-section has scrolled out of view
    if (scrollY >= topSectionHeight) {
      // Reverse the scroll: move the image down as you scroll more
      stickyImage.style.transform = `translateY(-${
        scrollY - topSectionHeight
      }px)`;
    } else {
      // Keep the image in its place as the top-section scrolls
      stickyImage.style.transform = `translateY(0)`;
    }
  });

  const handlePageRefresh = () => {
    // Get the protocol and host
    const baseUrl = window.location.protocol + "//" + window.location.host;

    // Redirect to the base URL
    window.location.href = baseUrl;
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });

      // Dispatch custom event after scrolling completes
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent("programmaticScrollComplete"));
      }, 1000); // Adjust timing based on your scroll animation duration
    }
  };

  return (
    <>
      <div className="relative h-[130vh] overflow-hidden">
        <div className="top-section ">
          <section className="w-full  top-0 left-0 z-10 absolute bg-[#f8f0db]">
            <div className="flex flex-col items-center pt-4   ">
              <img
                src="assets/images/sandalsLogo.svg"
                loading="lazy"
                alt="Sandals Logo"
                className="w-250px cursor-pointer"
                onClick={() => handlePageRefresh()}
              />

              <h1
                className="text-[#0057ff] font-sandalsScript pt-16 mb-24 text-[50px] md:text-7xl font-normal cursor-pointer"
                onClick={() => scrollToSection("choose-your-island")}
              >
                Where To Next?
              </h1>
              {/* <div className="relative">
                <Button
                  onClick={() => handleHeroBookNowClick()}
                  variant="default"
                  className="absolute z-40 left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 w-36"
                >
                  Book Now
                </Button>
              </div> */}
              <div className="flex gap-4 sm:gap-5 -mb-7">
                <Button
                  variant="default"
                  onClick={() => scrollToSection("explore-map")}
                  className="w-44 px-14"
                >
                  Explore the Map
                  <ChevronsDown />
                </Button>
                <Button
                  variant="default"
                  onClick={() => scrollToSection("resort-filter")}
                  className="w-44 px-14"
                >
                  Help Me Choose
                  <ChevronsDown />
                </Button>
                <Button
                  variant="default"
                  onClick={() => scrollToSection("choose-your-island")}
                  className="w-48 bg-[#f8f0db] text-primary border-primary"
                >
                  New To Sandals?
                  <ChevronsDown />
                </Button>
              </div>
            </div>
          </section>
        </div>

        <section className="w-full sticky-image h-screen relative">
          <div className="w-full h-full">
            {carouselImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Slide ${index + 1}`}
                className={`
                   top-0 left-0 w-full h-full object-contain
                  transition-opacity duration-500 ease-in-out
                  ${currentSlide === index ? "opacity-100" : "opacity-0"}
                  ${index === 0 ? "relative" : "absolute"}
              
                `}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goToPreviousSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-primary disabled:opacity-50 text-white flex items-center justify-center"
            aria-label="Previous image"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>

          <button
            onClick={goToNextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-primary disabled:opacity-50 text-white flex items-center justify-center"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </section>
      </div>
    </>
  );
};

export default Hero;
