import { useState } from "react";
import DeleteModal from "./DeleteModal";
export default function DeleteAccount() {
  const [showDeleteAccountModal, setDeleteAccountModal] = useState(false);
  const handleCloseModal = () => {
    setDeleteAccountModal(!showDeleteAccountModal);
  };
  return (
    <section className="relative">
      <div className="border p-7 flex flex-col gap-3">
        <h3 className="font-semibold text-sm">Delete Account</h3>
        <p className="text-sm max-w-[58ch]">
          Would you like to delete your Mercado Top account? Deleting your
          account will remove all of your content and data associated with it.
        </p>
        <button
          type="button"
          onClick={handleCloseModal}
          className="text-red-600 font-bold text-sm max-w-fit mt-4"
        >
          I want to delete my account
        </button>
      </div>
      {showDeleteAccountModal && <DeleteModal closeModal={handleCloseModal} />}
    </section>
  );
}
