import Image from "next/image";
import { useState } from "react";

type props = {
  photo_1: string | undefined;
  photo_2: string | undefined | null;
  photo_3: string | undefined | null;
  title: string | undefined;
};

export default function ImagePreview({
  photo_1,
  photo_2,
  photo_3,
  title,
}: props) {
  const photos = [photo_1, photo_2, photo_3].filter(Boolean);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const handleNext = () => {
    // The modulo operator (%) is used to cycle back to the first photo
    // after the last photo and vice versa
    setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % photos.length);
  };

  const handlePrev = () => {
    setCurrentPhotoIndex(
      (prevIndex) => (prevIndex - 1 + photos.length) % photos.length
    );
  };
  return (
    <section>
      <div className="relative flex flex-col items-center justify-center bg-slate-50 ">
        <Image
          src={photos[currentPhotoIndex] as string}
          alt={title as string}
          width={400}
          height={450}
          style={{ width: "auto" }}
          className=" h-[380px]"
        />

        {photos.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              disabled={currentPhotoIndex === 0}
              className=" absolute left-3"
            >
              <Image
                src={
                  currentPhotoIndex === 0
                    ? "/images/market/in-active-first.svg"
                    : "/images/market/active-first.svg"
                }
                alt="previous image"
                width={15}
                height={15}
                style={{ width: "auto", height: "auto" }}
              />
            </button>
            <button
              onClick={handleNext}
              disabled={currentPhotoIndex === photos.length - 1}
              className=" absolute right-3"
            >
              <Image
                src={
                  currentPhotoIndex === photos.length - 1
                    ? "/images/market/inactive-last.svg"
                    : "/images/market/active-last.svg"
                }
                alt="next image"
                width={15}
                height={15}
                style={{ width: "auto", height: "auto" }}
              />
            </button>
          </>
        )}
      </div>
    </section>
  );
}
