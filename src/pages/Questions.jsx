import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../components/loader/Loader";
import Options from "../components/options/Options";

const Questions = () => {
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [disable, setDisable] = useState(false);
  const [rightAsnswers, setRightAnswers] = useState(0);
  const [reset, setReset] = useState(false);

  let optionRefs = useRef([]);

  const apidata = useMemo(
    () => async () => {
      try {
        setLoader(true);
        const req = await fetch(
          `https://opentdb.com/api.php?amount=10&type=multiple`
        );
        const res = await req.json();
        setLoader(false);

        if (res?.response_code === 0) {
          setData(res?.results);
        }
      } catch (error) {
        console.log(error);
        setLoader(false);
      }
    },
    []
  );

  useEffect(() => {
    apidata();
  }, [apidata, reset]);

  useEffect(() => {
    // store worng answers and right answer in an array
    const allOptions =
      count < data?.length
        ? [data[count]?.correct_answer, ...data[count]?.incorrect_answers]
        : [];

    // shuffle all options for randmly display
    const shuffleArray = (array) => {
      return array.sort(() => Math.random() - 0.5);
    };
    const options = shuffleArray(allOptions);
    setShuffledOptions(options);

    // create ref for optons
    optionRefs.current = options.map(() => React.createRef());
  }, [data, data[count]?.correct_answer, data[count]?.incorrect_answers]);

  const handelClick = (item, index) => {
    setDisable(true);
    if (!disable) {
      if (data[count]?.incorrect_answers.includes(item)) {
        // add red background when selected option is wrong

        optionRefs?.current[index]?.current?.classList.add("bg-red-600");

        // if selected option is wrong then it also show the right ans and change background color to green
        const indexoff = optionRefs?.current?.filter((item) => {
          if (item.current.textContent === data[count]?.correct_answer) {
            return item;
          }
        });

        indexoff[0]?.current?.classList.add("bg-green-600");
      } else {
        // if selected option is right than change background to green
        const indexoff = optionRefs?.current?.filter((item) => {
          if (item.current.textContent === data[count]?.correct_answer) {
            return item;
          }
        });

        indexoff[0]?.current?.classList.add("bg-green-600");

        // count of right answers
        setRightAnswers(rightAsnswers + 1);
      }
    }
  };

  //   handel next button click
  const handelNext = () => {
    setCount(count + 1);
    setDisable(false);

    // if we click next butoon remove all background color classes
    for (let i = 0; i < optionRefs?.current?.length; i++) {
      optionRefs?.current[i]?.current?.classList.remove("bg-green-600");
      optionRefs?.current[i]?.current?.classList.remove("bg-red-600");
    }
  };

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        count >= 0 &&
        count < data?.length && (
          <div className="flex justify-center items-center h-screen">
            <div className="flex justify-center items-center w-1/2">
              <div>
                <div className="flex justify-between p-3 gap-5">
                  <h1 className="text-3xl">{data[count]?.question}</h1>
                  <button
                    className="self-start p-2 px-6 bg-blue-500 rounded"
                    onClick={handelNext}
                  >
                    Next
                  </button>
                </div>
                {
                  <Options
                    shuffledOptions={
                      shuffledOptions?.length > 0 ? shuffledOptions : []
                    }
                    optionRefs={optionRefs}
                    handelClick={handelClick}
                  />
                }
              </div>
            </div>
          </div>
        )
      )}

      {count > data?.length - 1 && (
        <div className="flex flex-col gap-6 justify-center items-center h-screen">
          <div className="text-3xl">Your score {rightAsnswers}/10</div>

          {rightAsnswers < 5 ? (
            <p className="text-3xl">You need to improve your knowlege</p>
          ) : rightAsnswers >= 5 && rightAsnswers <= 7 ? (
            <p className="text-3xl">Your knowlege is good</p>
          ) : (
            <p className="text-3xl">Your knowlege is excelent</p>
          )}
          <button
            className="p-2 px-6 bg-blue-500 rounded"
            onClick={() => {
              setReset(!reset);
              setCount(0);
              setRightAnswers(0);
              setLoader(true);
            }}
          >
            Restart
          </button>
        </div>
      )}
    </>
  );
};

export default React.memo(Questions);
