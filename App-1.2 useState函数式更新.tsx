import React, { useState } from 'react';
import ReactDOM from 'react-dom';
function Counter() {
  // 声明一个新的叫做 “count” 的 state 变量
  const [count, setCount] = useState(0);

  function showCount() {
    setTimeout(() => {
      // 这种方式先点击Click me按钮，再快速点击showCount三次，结果：You clicked 2 times
      // setCount(count + 1);
      // 这种方式先点击Click me按钮，再快速点击showCount三次，结果：You clicked 4 times
      setCount((count) => count + 1);
    }, 3000);
  }
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
      <button onClick={showCount}>showCount</button>
    </div>
  );
}

export default Counter;
