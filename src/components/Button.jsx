function Button({children, type, onClick, disabled}) {

  const base = "rounded-3xl cursor-pointer transition-colors duration-300 focus:outline-3 focus:outline-offset-3 focus:outline-custom-mainpurple";

  const styles = {
    emptyBoard: base + " heading-md py-2.5 px-4.5 bg-[#825FC7]/10 text-neutral-50 dark:bg-[#825FC7]/10 dark:opacity-50",
    board: base + " heading-md py-2.5 px-4.5 bg-[#825FC7] hover:bg-custom-mainpurple-hover text-neutral-50",
    secondary: base + " heading-md py-[14.5px] px-[17.5px] bg-custom-mainpurple hover:bg-custom-mainpurple-hover text-neutral-50",
    addNewCol: base + " body-lg-bold bg-[#635FC7]/10 py-[8.5px] w-[100%] text-center text-custom-mainpurple hover:bg-[#635FC7]/25 dark:bg-custom-white dark:hover:bg-custom-white",
    addEditNewBoard: base + " body-lg-bold bg-[#635FC7] py-[8.5px] w-[100%] text-center text-custom-white hover:bg-custom-mainpurple-hover",
    deleteBoard: base + " body-lg-bold bg-custom-red py-[8.5px] w-[100%] text-center text-custom-white hover:bg-custom-red-hover"
  }

  return (
    <button className={styles[type]} onClick={onClick}  disabled={disabled}>
          {children}
    </button>
  )
}

export default Button
