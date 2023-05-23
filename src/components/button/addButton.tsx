type AddButtonProps = {
  onClick: () => void
}

const AddButton = ({ onClick }: AddButtonProps) => {
  return (
    <button
      className="flex items-center gap-2 px-4 py-2 text-primary-600 bg-primary-50 rounded-lg duration-150 hover:bg-primary-100 active:bg-primary-200"
      onClick={() => onClick()}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-5 h-5"
      >
        <path
          fillRule="evenodd"
          d="M12 5.25a.75.75 0 01.75.75v5.25H18a.75.75 0 010 1.5h-5.25V18a.75.75 0 01-1.5 0v-5.25H6a.75.75 0 010-1.5h5.25V6a.75.75 0 01.75-.75z"
          clipRule="evenodd"
        />
      </svg>
      Ajouter
    </button>
  )
}

export default AddButton
