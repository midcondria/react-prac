const OddEvenResult = ({ count }) => {
  let result = count % 2 === 0;
  console.log(result);
  return (
    <>
      <p>짝홀: {`${result}`}</p>
    </>
  );
};

export default OddEvenResult;
