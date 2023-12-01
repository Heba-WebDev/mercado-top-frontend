import { content } from "../home/WhatWeDoContent";
import { WhatWeDoCard } from "./WhatWeDoCard";

export default function WhatWeDo() {
  return (
    <section className="py-14 px-2 container mx-auto grid gap-14">
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
