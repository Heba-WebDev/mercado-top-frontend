import Image from "next/image";
import { useEffect, useState } from "react";
import { FormikProps } from "formik";
import { FormValues } from "../interfaces";

interface ProductTitleProps {
  formik: FormikProps<FormValues>;
}

export default function ProductImages({ formik }: ProductTitleProps) {
  const [images, setImages] = useState<File[]>([]);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (
      images.length < 3 &&
      event.currentTarget.files &&
      event.currentTarget.files.length > 0
    ) {
      const files = Array.from(event.currentTarget.files);
      setImages((prevState) => [...prevState, ...files]);

      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setSelectedImages((prevState) => [
            ...prevState,
            reader.result as string,
          ]);
          formik.setFieldValue("photos", images);
        }
        if (formik.values.photo_1 === null) {
          formik.setFieldValue("photo_1", files[0]);
        } else if (formik.values.photo_2 === null) {
          formik.setFieldValue("photo_2", files[0]);
        } else if (formik.values.photo_3 === null) {
          formik.setFieldValue("photo_3", files[0]);
        }
      };
      reader.readAsDataURL(files[0]);
    }
  };
  const deleteImage = (index: number) => {
    const filteredImages = images?.filter((x, i) => i !== index);
    const filteredSelectedImages = selectedImages?.filter(
      (x, i) => i !== index
    );
    setImages(filteredImages);
    setSelectedImages(filteredSelectedImages);
    formik.setFieldValue("photo_1", null);
    formik.setFieldValue("photo_2", null);
    formik.setFieldValue("photo_3", null);

    if (filteredImages[0]) {
      formik.setFieldValue("photo_1", filteredImages[0]);
    }
    if (filteredImages[1]) {
      formik.setFieldValue("photo_2", filteredImages[1]);
    }
    if (filteredImages[2]) {
      formik.setFieldValue("photo_3", filteredImages[2]);
    }
  };
  useEffect(() => {
    console.log(images);
  }, [images]);

  return (
    <>
      <div className="flex flex-col gap-2">
        <label htmlFor="photos">
          {formik.touched.photo_1 && formik.errors.photo_1 ? (
            <p className=" text-red-600">{formik.errors.photo_1 as string}</p>
          ) : (
            "Product Image"
          )}
        </label>
        <input
          id="photos"
          name="photos"
          type="file"
          accept="image/*"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            // formik.setFieldValue("photos", files);
            handleAvatarChange(event);
          }}
          className="hidden border focus:bg-[#33A077] focus:bg-opacity-10 py-3  px-2 rounded-lg focus:outline-[#33A077]"
        />
        <button
          type="button"
          onClick={() => {
            const inputElement = document.getElementById("photos");
            if (inputElement) {
              inputElement.click();
            }
          }}
          className="bg-gray-100 border py-10 px-4  focus:outline-[#33A077] rounded-lg"
        >
          <p className=" text-gray-500">
            <span className=" text-green-600">Click here</span> or drag and drop
            to upload the image
          </p>
          <p className=" text-gray-500 text-xs pt-1">
            JPG, PNG, SVG or WebP (max. 800x400px)
          </p>
        </button>
        {selectedImages &&
          selectedImages.map((avatar, index) => (
            <div key={index} className=" pb-6 pt-4 flex items-center gap-2">
              <div>
                <Image
                  src={avatar ? avatar : "/images/market/img-preview.svg"}
                  alt=""
                  width={24}
                  height={30}
                  style={{ width: "30px", height: "auto" }}
                  className="rounded"
                />
              </div>
              <div className="flex items-center justify-between w-full relative">
                {images[index].name && images[index].size && (
                  <>
                    <p>
                      {images[index].name.length > 20
                        ? `${images[index].name.slice(0, 16)}${images[
                            index
                          ].name.slice(images[index].name.indexOf("."))}`
                        : images[index].name}
                    </p>
                    <p>{(images[index].size / 1000).toFixed(2)} kB</p>
                  </>
                )}
                <div className=" opacity-80 absolute h-1 top-6 w-full bg-green-600 "></div>
              </div>
              <button
                type="button"
                aria-label="Delete selected image"
                onClick={() => {
                  deleteImage(index);
                }}
              >
                <Image
                  src="/images/globals/remove.svg"
                  alt="remove uploaded avatar"
                  width={16}
                  height={16}
                  style={{ width: "25px", height: "auto" }}
                  className=" w-full"
                />
              </button>
            </div>
          ))}
      </div>
    </>
  );
}

{
  /*
  const [selectedAvatar, setSelectedAvatar] = useState<string[] | null>(null);
  const [imgPreview, setImgPreview] = useState<
    { file_name: string; size: number }[]
  >([]);
    const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files && event.currentTarget.files.length > 0) {
      const newFiles = Array.from(event.currentTarget.files).slice(0, 3);
      const existingFiles = initialValues.photos ? initialValues.photos : [];
      const allFiles = [...existingFiles, ...newFiles];

      const filePreviews = allFiles.map((file) => {
        return {
          file_name: file.name,
          size: Number((file.size / (1024 * 1024)).toFixed(2)),
        };
      });
      setImgPreview(filePreviews);

      const readers = allFiles.map((file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        return new Promise<string | null>((resolve, reject) => {
          reader.onloadend = () => resolve(reader.result as string | null);
          reader.onerror = reject;
        });
      });

      Promise.all(readers).then((images) => {
        const validImages = images.filter((img): img is string => img !== null);
        setSelectedAvatar(validImages);
      });
    }
  };
    <div className="flex flex-col gap-2">
            <label htmlFor="photos">
              {formik.touched.photos && formik.errors.photos ? (
                <p className=" text-red-600">
                  {formik.errors.photos as string}
                </p>
              ) : (
                "Product Image"
              )}
            </label>
            <input
              id="photos"
              name="photos"
              type="file"
              accept="image/*"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                if (event.currentTarget.files) {
                  formik.setFieldValue("photos", event.currentTarget.files[0]);
                }
                handleAvatarChange(event);
              }}
              className="hidden border focus:bg-[#33A077] focus:bg-opacity-10 py-3  px-2 rounded-lg focus:outline-[#33A077]"
            />
            <button
              type="button"
              onClick={() => {
                const inputElement = document.getElementById("photos");
                if (inputElement) {
                  inputElement.click();
                }
              }}
              className="bg-gray-100 border py-10 px-4  focus:outline-[#33A077] rounded-lg"
            >
              <p className=" text-gray-500">
                <span className=" text-green-600">Click here</span> or drag and
                drop to upload the image
              </p>
              <p className=" text-gray-500 text-xs pt-1">
                JPG, PNG, SVG or WebP (max. 800x400px)
              </p>
            </button>
            {selectedAvatar &&
              selectedAvatar.map((avatar, index) => (
                <div key={index} className=" pb-6 pt-4 flex items-center gap-2">
                  <div>
                    <Image
                      src={avatar ? avatar : "/images/market/img-preview.svg"}
                      alt=""
                      width={24}
                      height={30}
                      style={{ width: "30px", height: "auto" }}
                      className="rounded"
                    />
                  </div>
                  <div className="flex items-center justify-between w-full relative">
                    {imgPreview[index].file_name && imgPreview[index].size && (
                      <>
                        <p>{imgPreview[index].file_name}</p>
                        <p>{imgPreview[index].size} MB</p>
                      </>
                    )}
                    <div className=" opacity-80 absolute h-1 top-6 w-full bg-green-600 "></div>
                  </div>
                  <button
                    type="button"
                    aria-label="Delete selected image"
                    onClick={() => {
                      const newAvatars = [...selectedAvatar];
                      newAvatars.splice(index, 1);
                      setSelectedAvatar(newAvatars);

                      const newPreviews = [...imgPreview];
                      newPreviews.splice(index, 1);
                      setImgPreview(newPreviews);
                    }}
                  >
                    <Image
                      src="/images/globals/remove.svg"
                      alt="remove uploaded avatar"
                      width={16}
                      height={16}
                      style={{ width: "28px", height: "auto" }}
                      className=" w-full"
                    />
                  </button>
                </div>
              ))}
          </div>

    */
}
