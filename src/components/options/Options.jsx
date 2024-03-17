const Options = ({ shuffledOptions, optionRefs, handelClick }) => {
  return (
    <div className="flex flex-wrap justify-center mt-6">
      {shuffledOptions?.length > 0 &&
        shuffledOptions?.map((item, index) => (
          <div key={index} className="w-1/2 p-3">
            <span
              ref={optionRefs.current[index]}
              onClick={() => handelClick(item, index)}
              className={
                "cursor-pointer p-2 block border-[1px] rounded-xl w-full"
              }
              key={index}
            >
              {item}
            </span>
          </div>
        ))}
    </div>
  );
};

export default Options;
