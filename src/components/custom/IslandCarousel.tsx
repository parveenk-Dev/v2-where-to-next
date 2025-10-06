import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type Island = {
  name: string;
  image: string;
};

const IslandCarousel = ({
  setActiveTab,
  setSelectedIsland,
  setFinderType
}: {
  setActiveTab: (value: string) => void;
  setSelectedIsland: (value: string) => void;
  setFinderType: (value: string) => void
}) => {
  const islands: Island[] = [
    // { name: "Antigua", image: "assets/images/splash/antigua.webp" },
    { name: "Barbados", image: "assets/images/splash/barbados.jpg" },
    { name: "Bahamas", image: "assets/images/splash/bahamas.webp" },
    { name: "Curacao", image: "assets/images/splash/curacao.webp" },
    { name: "Grenada", image: "assets/images/splash/grenada.jpeg" },
    { name: "Jamaica", image: "assets/images/splash/jamaica.webp" },
    { name: "Saint Lucia", image: "assets/images/splash/saintlucia.webp" },
    { name: "Saint Vincent", image: "assets/images/splash/Vincent.jpg" },
    { name: "Turks and Caicos", image: "assets/images/splash/Turks.webp" },
    { name: "Antigua", image: "assets/images/splash/antigua.webp" },
  ];

  const handleIslandClick = (islandName: string) => {
    setActiveTab("Overview");
    setFinderType(islandName)
    setSelectedIsland(islandName);
  };

  return (
    <div className="islandCarousel" id="choose-your-island">
      <h2 className="text-[#0066FF] text-4xl max-w-7xl mx-auto font-normal font-sandalsSlab  pl-3 mb-6 pt-12">
        Choose Your Island
      </h2>

      <Carousel
        opts={{ loop: true }}
        className="w-3/4 sm:w-10/12 max-w-7xl lg:w-11/12 mx-auto"
      >
        <CarouselContent className="-ml-1">
          {islands.map((island, index) => (
            <CarouselItem
              key={index}
              className="pl-1 sm:pl-2.5 lg:pl-5 md:basis-1/3 lg:basis-1/3"
              onClick={() => handleIslandClick(island.name)}
            >
              <div
                className="w-full h-[170px] lg:h-[250px] relative  rounded-3xl overflow-hidden cursor-pointer group"
                data-island={island.name.toLowerCase().replace(/\s+/g, "-")}
              >
                <img
                  src={island.image}
                  alt={island.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute font-sandalsScript font-light bottom-4 left-4 text-white text-2xl lg:text-[42px]">
                  {/* {island.name} */}
                  {island.name === "Curacao" ? "Curaçao" : island.name}
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="bg-primary  text-white border-none" />
        <CarouselNext className="bg-primary  text-white border-none" />
      </Carousel>
    </div>
  );
};

export default IslandCarousel;
