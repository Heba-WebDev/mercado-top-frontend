import { content } from "../home/WhatWeDoContent";
import { WhatWeDoCard } from "./WhatWeDoCard";

export default function WhatWeDo() {
  return (
    <section className="py-14 px-2 container mx-auto grid gap-14">
      <div>
        <h2 className=" text-[#33A077] font-semibold text-3xl lg:text-4xl text-center">
          What We Do
        </h2>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        {content.map((card, index: number) => {
          return (
            <WhatWeDoCard
              key={index}
              title={card.title}
              description={card.description}
              link={card.link}
            />
          );
        })}
      </div>
    </section>
  );
}
