import { useState } from "react";
import Test02A from "./Test02A";
import Test02B from "./Test02B";

function Test02() {
  const [subTest, setSubtest] = useState("A");

  const handleCheck = (e) => {
    if (e.target.checked) {
      setSubtest(e.target.value);
    }
  };

  const display = {
    A: <Test02A />,
    B: <Test02B />
  };
  return (
    <div>
      <label className={`toggle-test-02 A${subTest === "A" ? " current" : ""}`}>
        Test 02A: Check room Available
        <input
          type="radio"
          value="A"
          defaultChecked={true}
          hidden
          name="test02"
          onChange={handleCheck}
        />
      </label>
      <label className={`toggle-test-02 B${subTest === "B" ? " current" : ""}`}>
        Test 02B: Show All Booking in a Week
        <input
          type="radio"
          value="B"
          hidden
          name="test02"
          onChange={handleCheck}
        />
      </label>
      <div style={{ marginTop: "24px" }}>{display[subTest]}</div>
    </div>
  );
}

export default Test02;
