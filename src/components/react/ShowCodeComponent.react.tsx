import { useState } from "react";
import { CopyBlock, irBlack } from "react-code-blocks";
import { codes, getDefault, type CodeTypes } from "./code.samples";
import "./style.css";

export const ShowCodeComponentReact = () => {
  const [showCode, setShowCode] = useState<CodeTypes>(getDefault());

  return (
    <>
      <div className="hero-section-language border border-gray-950 rounded-xl w-full xl:w-auto">
        <div className="bg-gray-950 rounded-xl">
          <ul className="flex items-center border-b border-white p-2 sm:p-4 justify-evenly md:justify-start">
            {codes.map((val, index) => (
              <>
                <li
                  key={val.name + index}
                  onClick={() => setShowCode({ ...val })}
                  className={`text-white mx-1 mr-[6px] sm:mr-[10px] sm:mx-2 text-xs sm:text-[16px] rounded-full tab-item p-2 sm:py-[10px] sm:px-[20px] ${showCode.name === val.name ? "active" : ""}`}
                  data-tab={`tab${index + 1}`}
                  data-lang={val.name}
                >
                  {val.name}
                </li>
              </>
            ))}
          </ul>
          <div className="tab-content p-4 bg-gray-950 rounded-xl">
            <CopyBlock
              language={showCode.name}
              text={showCode.value}
              showLineNumbers={true}
              theme={irBlack}
              codeBlock={true}
            />
          </div>
        </div>
      </div>
    </>
  );
};
