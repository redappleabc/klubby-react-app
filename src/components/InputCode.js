import React, { useState, useRef } from "react";

const InputCode = ({ length, label, loading, onComplete, formik }) => {
  const [code, setCode] = useState([...Array(length)].map(() => ""));
  const inputs = useRef([]);
  // Typescript
  // useRef<(HTMLInputElement | null)[]>([])

  const processInput = (e, slot) => {
    const num = e.target.value;
    if (/[^0-9]/.test(num)) return;
    const newCode = [...code];
    newCode[slot] = num;
    setCode(newCode);
    if (slot !== length - 1) {
      inputs.current[slot + 1].focus();
    }
    if (newCode.every(num => num !== "")) {
      onComplete(newCode.join(""));
    }
  };

  const onKeyUp = (e, slot) => {
    if (e.keyCode === 8 && !code[slot] && slot !== 0) {
      const newCode = [...code];
      newCode[slot - 1] = "";
      setCode(newCode);
      inputs.current[slot - 1].focus();
    }
  };

  return (
    <div className="code-input">
      <label className="code-label">{label}</label>
      <div className="code-inputs">
        {code.map((num, idx) => {
          return (
            <input
              key={idx}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={eval("formik.values"+"code"+(idx+1))}
              
              autoFocus={!code[0].length && idx === 0}
              readOnly={loading}
              onChange={e=> {
                const num = e.target.value;
                if (/[^0-9]/.test(num)){
                  e.target.value=""
                  return
                };
                processInput(e,idx);
                formik.handleChange(e);
              }
              }
              onKeyUp={e => onKeyUp(e, idx)}
              ref={ref => inputs.current.push(ref)}
              name={"code"+(idx+1)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default InputCode;
