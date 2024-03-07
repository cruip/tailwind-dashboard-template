import Modal from "../../../partials/modal/Modal";

export const DeleteModal = ({
  show,
  size,
  onHide,
  width,
  disabled,
  buttonText,
  handleOnclick,
  titleMessage="",
}) => {
  return (
    <Modal
      show={show}
      size={size || "md"}
      onHide={onHide}
      width={width || "35%"}
    >
      <p className="mt-5">{titleMessage} </p>
      <div className="flex justify-between  py-5  sm:flex-row-reverse">
        <button
          type="button"
          className={`inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-blue-700 border border-transparent rounded-md shadow-sm sm:ml-3 sm:w-auto sm:text-sm ${
            disabled ? "cursor-not-allowed" : ""
          }`}
          onClick={handleOnclick}
          disabled={disabled}
        >
          {buttonText}
        </button>
      </div>
    </Modal>
  );
};
