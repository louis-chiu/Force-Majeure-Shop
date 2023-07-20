const InputBar = ({ type }) => {
  return (
    <div className='input-bar'>
      <div className='input-bar__name'></div>
      <input type={type} />
    </div>
  );
};
export default InputBar;
