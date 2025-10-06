import { useState } from "react";

import { Button } from "../ui/button";

type Resort = {
  ResortTitle: string;
  ResortLink: string;
  Island: string;
  ResortDescription: string;
  IdealFor: { name: string; background: string; textColor?: string }[];
  IdealFor2?: { name: string; background: string; textColor?: string }[];
  IdealFor3?: { name: string; background: string; textColor?: string }[];
  Tags: string;
  Images: string;
  Beaches: string;
  Pool: string;
  Map?: string;
  Dining: string;
  watersports?: string;
  IslandTours?: string;
  City?: string;
  Tabs: { name: string; images: string[] }[];
};

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { handleBookNowClick } from "@/constants";
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import {
  BeachGoersIcon,
  FoodiesIcon,
  WaterSportsEnthusiastsIcon,
  PoolEnthusiastsIcon,
  DiversIcon,
  GolfEnthusiastsIcon,
  NaturalAttractionsIcon,
  NearbyAirportIcon,
  SecludedPrivacyIcon,
  TranquilityIcon,
  QuaintLuxuryIcon,
  PickleballLoversIcon,
  FamilyFunIcon,
  WeatherIcon,
  AdventureSeekersIcon,
} from "../icons/ResortIcons";

const ResortGallery = ({
  finderType,
  resorts,
  selectedIsland,
  showNoResults,
  activeTab,
  setActiveTab,
}: {
  finderType: string;
  resorts: Resort[];
  selectedIsland: string;
  showNoResults: boolean;
  activeTab: string;
  setActiveTab: (value: string) => void;
}) => {
  const formatDashes = (text: string) => {
    return text.replace(/\s+/g, "-");
  };

  const [activeCarouselIndex, setActiveCarouselIndex] = useState(0);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [scale, setScale] = useState(1);

  // const [activeTabImages, setActiveTabImages] = useState([]);

  // Add this helper function to determine visible page numbers

  const getVisiblePageNumbers = (total: number, current: number) => {
    // If total resorts is less than or equal to 5, show all pages
    if (total <= 5) {
      return Array.from({ length: total }, (_, i) => i);
    }

    // For more than 5 resorts, show 5 numbers centered around current page
    let start = Math.max(0, current - 2);
    const end = Math.min(total - 1, start + 4);

    // Adjust start if we're near the end to always show 5 numbers if possible
    if (end - start < 4) {
      start = Math.max(0, end - 4);
    }

    return Array.from(
      { length: Math.min(5, end - start + 1) },
      (_, i) => start + i
    );
  };

  const handleActiveCarouselIndex = (pageIndex: number) => {
    setActiveCarouselIndex(pageIndex);
    setActiveTab("Overview");
  };

  const handleZoomIn = () => {
    setScale((prev) => (prev === 1 ? 2 : 1)); // Toggle between 1x and 2x zoom
  };

  const handleZoomOut = () => {
    setScale(1); // Reset to 1x zoom
  };

  // Add navigation handlers
  const handlePrevious = () => {
    setActiveCarouselIndex((prev) => (prev > 0 ? prev - 1 : prev));
    setActiveTab("Overview");
  };

  const handleNext = () => {
    setActiveCarouselIndex((prev) =>
      prev < resorts.length - 1 ? prev + 1 : 0
    );

    setActiveTab("Overview");
  };

  // useEffect(() => setTabState("Overview"), [selectedIsland]);

  const handleTabClick = (tab: { name: string }) => {
    setActiveTab(tab.name);
    // setActiveTabImages(tab.images);
  };

  // Enhanced map scroll function with retry mechanism
  const scrollToMap = () => {
    const findAndScrollToMap = (retryCount = 0) => {
      const mapElement = document.querySelector(".map") as HTMLIFrameElement;

      if (mapElement) {
        mapElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        // Push GA4 event to dataLayer
        if (typeof window !== "undefined") {
          (window as any).dataLayer = (window as any).dataLayer || [];

          const eventData = {
            event: "Back_To_Map",
            source: "scrollToMap",
          };

          (window as any).dataLayer.push(eventData);
          console.log("GA4 Tracking Event Fired:", eventData);
        }
      } else if (retryCount < 5) {
        // Retry a few times if map element not found
        setTimeout(() => {
          findAndScrollToMap(retryCount + 1);
        }, 200);
      } else {
        console.log("Map element not found after retries");
      }
    };

    findAndScrollToMap();
  };

  const handleScrollBackToIslandSection = () => {
    const carouselElement = document.querySelector(".islandCarousel");
    if (carouselElement) {
      // Add a small delay to ensure state updates have completed

      carouselElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // Function to get the appropriate icon for each label
  const getIconForLabel = (
    label: string
  ): React.ComponentType<{ className?: string; color?: string }> => {
    const iconMap: {
      [key: string]: React.ComponentType<{
        className?: string;
        color?: string;
      }>;
    } = {
      "Beach Goers": BeachGoersIcon,
      Foodies: FoodiesIcon,
      "WaterSports Enthusiasts": WaterSportsEnthusiastsIcon,
      "Watersports Enthusiasts": WaterSportsEnthusiastsIcon,
      "Pool Enthusiasts": PoolEnthusiastsIcon,
      Divers: DiversIcon,
      "Golf Enthusiasts": GolfEnthusiastsIcon,
      "Natural Attractions": NaturalAttractionsIcon,
      "Nearby Airport": NearbyAirportIcon,
      "Secluded Privacy": SecludedPrivacyIcon,
      Tranquility: TranquilityIcon,
      "Quaint Luxury": QuaintLuxuryIcon,
      "Pickleball Lovers": PickleballLoversIcon,
      "Family Fun": FamilyFunIcon,
      "Adventure Seekers": AdventureSeekersIcon,
    };

    return iconMap[label] || WeatherIcon; // Default to WeatherIcon if no match
  };

  // Helper component to render icons
  const IconRenderer = ({ label }: { label: string }) => {
    const IconComponent = getIconForLabel(label);
    return <IconComponent className="w-4 h-4" color="#99CEFA" />;
  };

  const getCurrentTabImages = () => {
    const currentResort = resorts[activeCarouselIndex];
    const currentTab = currentResort?.Tabs?.find(
      (tab) => tab.name === activeTab
    );
    return currentTab?.images || [];
  };

  if (showNoResults) {
    return (
      <div className="mx-auto h-72  flex justify-center items-center  bg-secondary text-primary mt-5 relative overflow-hidden  pb-8 font-sandalsSlab text-2xl gallery-no-result">
        <h2
          className="cursor-pointer"
          onClick={handleScrollBackToIslandSection}
        >
          Your selections don't match any resort. Please try again.
        </h2>
      </div>
    );
  }
  return (
    <div
      className={`mx-auto flex justify-center items-center  bg-secondary relative overflow-hidden lg:pl-2.5 lg:pr-2.5  pb-8 ${
        resorts.length > 0 ? "block" : "hidden"
      }`}
    >
      {resorts.length > 1 && (
        <button
          onClick={handlePrevious}
          className={`h-10 w-10 min-w-10 rounded-full bg-primary text-white  hidden lg:flex items-center justify-center ${
            activeCarouselIndex === 0 ? "opacity-50" : ""
          }`}
          disabled={activeCarouselIndex === 0}
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
      )}

      <Carousel className="w-full max-w-7xl lg:max-w-[calc(100%-100px)] 2xl:max-w-7xl">
        <CarouselContent className=" mb-8">
          {resorts.length > 0 ? (
            <>
              {resorts.map((resort, index) => (
                <CarouselItem
                  key={index}
                  className=" lg:pl-5 basis-full w-full transition-all duration-300"
                  style={{
                    transform: `translateX(-${activeCarouselIndex * 100}%)`,
                  }}
                >
                  <div className="grid grid-cols-8  gap-4 py-11 px-8 ">
                    {/* Left Section */}
                    <div className="col-span-8 lg:col-span-3 bg-quaternary text-white rounded-3xl p-5 lg:p-6 overflow-hidden">
                      {/* Resort Image */}
                      <div className="flex lg:flex-col gap-5">
                        <div className=" overflow-hidden mb-3">
                          <img
                            src={`assets/images/Sandals_Images/${formatDashes(
                              resort.ResortTitle
                            )}/Carousel_ResortHero_Slider/${formatDashes(
                              resort.ResortTitle
                            )}_Carousel_ResortHero_Slider_1.jpg`}
                            alt={resort.ResortTitle}
                            className="w-[600px] lg:w-full h-[250px] lg:h-[240px] rounded-3xl object-cover"
                          />
                        </div>

                        <div className="">
                          {/* Resort Info */}
                          <div className="mb-8">
                            <h2 className="text-2xl font-sandalsSlab mb-2">
                              {resort.ResortTitle}
                            </h2>
                            <h4 className="text-lg  mb-5 font-sandalsSans">
                              {resort.City}
                              {resort.City && ", "}
                              {resort.Island}
                            </h4>
                            <ul className="space-y-3 text-sm opacity-90">
                              {resort.ResortDescription.split("\n").map(
                                (item, index) =>
                                  item.length > 0 && (
                                    <li
                                      key={index}
                                      className="flex items-start font-sandalsSans"
                                    >
                                      <span className="mr-2">•</span>
                                      {item}
                                    </li>
                                  )
                              )}
                            </ul>
                          </div>

                          <div className="text-[#99CEFA] mb-8">
                            <h2 className="text-xl lg:text-2xl font-sandalsSlab mb-4">
                              Ideal For
                            </h2>
                            <div
                              className="flex flex-wrap sm:flex-nowrap items-center gap-2 font-sandalsSans text-[12px]"
                              style={
                                {
                                  "--icon-color": "#99CEFA",
                                } as React.CSSProperties
                              }
                            >
                              {[
                                resort.IdealFor?.[0]?.name,
                                resort.IdealFor2?.[0]?.name,
                                resort.IdealFor3?.[0]?.name,
                              ]
                                .filter(Boolean)
                                .map((label, index, array) => (
                                  <div
                                    key={index}
                                    className="flex items-center gap-2"
                                  >
                                    <span className="whitespace-nowrap flex items-center gap-2">
                                      <IconRenderer label={label || ""} />{" "}
                                      <span className="text-[#99CEFA] text-[11px] font-light">
                                        {" "}
                                        {label}
                                      </span>
                                    </span>
                                    {index < array.length - 1 && <span>|</span>}
                                  </div>
                                ))}
                            </div>
                          </div>

                          {/* Book Now Button */}
                          <Button
                            onClick={() => {
                              handleBookNowClick(resort, {}, finderType);
                            }}
                            className="w-full"
                          >
                            Book Now
                          </Button>
                          <p className="mt-2 text-sm font-medium">
                            Up to 12% off. Only available on resort.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Right Section */}
                    <div className="col-span-8 lg:col-span-5">
                      {/* Tabs */}
                      <div className="mt-5 lg:mt-0 w-full">
                        <div className="flex flex-wrap gap-4 justify-between items-center mb-5">
                          <div className="flex flex-wrap gap-4 xl:gap-6">
                            {resort?.Tabs?.map((tab: { name: string }) => {
                              const isActiveTab = activeTab === tab.name;
                              return (
                                <div key={tab.name}>
                                  <Button
                                    onClick={() => handleTabClick(tab)}
                                    variant="ghost"
                                    size="sm"
                                    className={`text-black rounded-none ${
                                      isActiveTab
                                        ? "border-b-4 border-primary"
                                        : "border-b-4 border-transparent"
                                    }`}
                                  >
                                    {tab.name}
                                  </Button>
                                </div>
                              );
                            })}
                          </div>

                          <div className="flex flex-col md:flex-row gap-2.5 w-full md:w-auto shrink-0">
                            <Button
                              variant="outline"
                              onClick={scrollToMap}
                              className="whitespace-nowrap"
                            >
                              Back To Map
                            </Button>
                            <Button
                              onClick={() =>
                                handleBookNowClick(resort, {}, finderType)
                              }
                              variant="default"
                              className="whitespace-nowrap"
                            >
                              Book Now
                            </Button>
                          </div>
                        </div>
                        <p className="mb-3 text-sm text-right font-medium">
                          Up to 12% off. Only available on resort.
                        </p>
                        <div className="grid grid-cols-4 gap-4">
                          {resort.Tabs.find(
                            (tab: { name: string }) => tab.name === activeTab
                          )?.images?.length ? (
                            <>
                              {" "}
                              {resort.Tabs.find(
                                (tab: { name: string }) =>
                                  tab.name === activeTab
                              )?.images?.map((img: string, index: number) => {
                                return (
                                  <div
                                    className={`${
                                      activeTab === "Map"
                                        ? "col-span-4"
                                        : "col-span-2"
                                    }`}
                                    key={index + img}
                                  >
                                    <img
                                      src={img}
                                      alt={`${resort.ResortTitle} ${activeTab}`}
                                      className={`${
                                        activeTab === "Map"
                                          ? "h-[900px] lg:h-[930px]"
                                          : "h-[250px]"
                                      } w-full object-cover rounded-3xl cursor-pointer`}
                                      onClick={() => {
                                        setSelectedImage(index);
                                        setIsPreviewOpen(true);
                                        setScale(1); // Reset zoom when opening new image
                                      }}
                                      onError={(e) => {
                                        const target =
                                          e.target as HTMLImageElement;
                                        target.parentElement!.style.display =
                                          "none";
                                      }}
                                    />
                                  </div>
                                );
                              })}
                            </>
                          ) : (
                            <h3 className="col-span-4 text-center mt-28 text-xl font-sandalsSlab ">
                              No data available for {activeTab}.
                            </h3>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </>
          ) : (
            <>
              {selectedIsland && (
                <>
                  <div className="mx-auto h-72  flex justify-center items-center  bg-secondary text-primary mt-5 relative overflow-hidden  pb-8 font-sandalsSlab text-2xl gallery-no-result">
                    <h2>
                      Oops, we couldn't find a resort like this, and try again
                    </h2>
                  </div>
                </>
              )}
            </>
          )}
        </CarouselContent>

        {/* Only show pagination indicators when there are multiple resorts */}
        {resorts.length > 1 && (
          <div className="flex items-center justify-center mt-10">
            <div className="absolute bottom-4 w-full flex gap-2 justify-center items-center">
              <button
                onClick={handlePrevious}
                className="h-10 w-10 rounded-full bg-primary text-white flex disabled:opacity-50 items-center justify-center"
                disabled={activeCarouselIndex === 0}
              >
                <ArrowLeft className="h-4 w-4" />
              </button>

              {getVisiblePageNumbers(resorts.length, activeCarouselIndex).map(
                (pageIndex) => (
                  <button
                    key={pageIndex}
                    // onClick={() => setActiveCarouselIndex(pageIndex)}
                    onClick={() => handleActiveCarouselIndex(pageIndex)}
                    className={`text-primary cursor-pointer text-xs font-medium h-10 w-10 flex items-center justify-center rounded-full border-[1.5px] border-primary ${
                      activeCarouselIndex === pageIndex
                        ? "bg-primary text-white"
                        : "bg-transparent"
                    }`}
                  >
                    {(pageIndex + 1).toString().padStart(2, "0")}
                  </button>
                )
              )}

              {resorts.length > 5 &&
                activeCarouselIndex < resorts.length - 3 && (
                  <span className="text-primary px-2">...</span>
                )}

              <button
                onClick={handleNext}
                className="h-10 w-10 rounded-full bg-primary disabled:opacity-50 text-white flex items-center justify-center"
                disabled={resorts.length === 1}
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </Carousel>

      {/* Only show external navigation button when there are multiple resorts */}
      {resorts.length > 1 && (
        <button
          onClick={handleNext}
          className={`h-10 w-10 min-w-10 rounded-full bg-primary disabled:opacity-50 text-white hidden lg:flex items-center justify-center `}
          disabled={resorts.length === 1}
        >
          <ArrowRight className="h-4 w-4" />
        </button>
      )}
      {isPreviewOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsPreviewOpen(false);
            }
          }}
        >
          <div className="relative w-full h-full flex flex-col items-center justify-center">
            {/* Close button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsPreviewOpen(false);
              }}
              className="absolute top-4 right-4 z-10 text-white p-2 hover:bg-white/10 rounded-full"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Zoom controls */}
            <div className="absolute top-5 right-16 flex gap-3 z-10">
              <button
                onClick={handleZoomOut}
                className="h-8 w-8 rounded-lg bg-black text-white flex items-center justify-center disabled:opacity-50 hover:bg-black/70"
                disabled={scale === 1}
              >
                <ZoomOut className="h-5 w-5" />
              </button>
              <button
                onClick={handleZoomIn}
                className="h-8 w-8 rounded-lg bg-black text-white flex items-center justify-center disabled:opacity-50 hover:bg-black/70"
                disabled={scale === 2}
              >
                <ZoomIn className="h-5 w-5" />
              </button>
            </div>

            {/* Navigation buttons */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage((prev) =>
                  prev > 0 ? prev - 1 : getCurrentTabImages().length - 1
                );
              }}
              className="absolute left-4 z-10 text-white p-2 hover:bg-white/10 rounded-full"
            >
              <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
            </button>

            {/* Main Image */}
            <div
              className="w-full h-full flex items-center justify-center p-4 md:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={getCurrentTabImages()[selectedImage]}
                alt={`${resorts[activeCarouselIndex].ResortTitle} ${activeTab}`}
                className="max-w-[90vw] max-h-[80vh] object-contain transition-transform duration-200 cursor-zoom-in"
                style={{ transform: `scale(${scale})` }}
                onClick={(e) => e.stopPropagation()}
              />
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage((prev) =>
                  prev < getCurrentTabImages().length - 1 ? prev + 1 : 0
                );
              }}
              className="absolute right-4 z-10 text-white p-2 hover:bg-white/10 rounded-full"
            >
              <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
            </button>

            {/* Thumbnail carousel */}
            <div className="absolute bottom-4 flex justify-center gap-2 px-4 overflow-x-auto max-w-full">
              {getCurrentTabImages().map((img: string, index: number) => (
                <div
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-16 h-16 md:w-20 md:h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                    index === selectedImage
                      ? "border-blue-600"
                      : "border-transparent hover:border-blue-400"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${resorts[activeCarouselIndex].ResortTitle} ${activeTab} thumbnail`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResortGallery;
