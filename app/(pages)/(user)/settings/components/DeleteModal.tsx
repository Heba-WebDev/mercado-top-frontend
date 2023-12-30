import { useAppDispatch, useAppSelector } from "@/app/hooks/store";
import { removeUser } from "@/app/store/users/slice";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { deleteAccount } from "../api-settings";
import { IDeleteAccount } from "../types-interfaces";
import { toast } from "react-toastify";
import { CustomError } from "@/app/utils/CustomError";
interface Props {
  closeModal: () => void;
}
const DeleteModal: React.FC<Props> = ({ closeModal }) => {
  const { mutateAsync } = useMutation({
    mutationFn: deleteAccount,
  });
  const user = useAppSelector((state) => state.users);
  const disptach = useAppDispatch();
  const router = useRouter();
  const handleDeleteAccount = async () => {
    try {
      const id = user[0].user_id;
      const res = await mutateAsync({ user_id: id });
      toast.success(res?.message);
      disptach(removeUser({}));
    } catch (error: unknown) {
      if (error instanceof Error) {
        const customError = error as CustomError;
        if (customError.isCustomError) {
          toast(customError.response.data.message);
        } else {
          console.error(customError.message);
        }
      }
    }
  };
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="fixed inset-0 bg-gray-500 opacity-50"></div>
        <div className="bg-white border shadow-md p-5 z-10 w-full mx-2 md:mx-0 md:w-2/3 max-w-lg relative">
          <button type="button" onClick={closeModal}>
            <Image
              src="/images/globals/close.svg"
              alt="close"
              width={25}
              height={10}
              style={{ width: "20px", height: "20px" }}
              className=" absolute top-8 right-5 bg-white rounded-full"
            />
          </button>

          <div className="flex flex-col gap-2 mt-4">
            <h3 className="border border-x-0 border-t-0 border-opacity-10 pb-2">
              Delete Account
            </h3>
            <p className=" text-gray-600 text-sm pb-4">
              Deleting your account will remove all of your information from our
              database. This cannot be undone.
            </p>
          </div>
          <button
            type="button"
            onClick={handleDeleteAccount}
            className={` py-3  px-1 bg-red-600 hover:bg-red-700 text-white rounded-lg mt-4 w-full`}
          >
            Delete Account
          </button>
        </div>
      </div>
    </>
  );
};

export default DeleteModal;
