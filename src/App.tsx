import { FormEventHandler, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const [items, setItems] = useState<number>()
  const [chkoutLines, setChkOutLines] = useState([
    [10, 104], [3, 33], [3,54], [2, 22], [3, 50]
  ])

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (items === undefined || items <= 0) return
    let leastItemsAmout = 1e9
    let lineWithLeast: number[] | undefined = undefined;

    for (let checkoutLine of chkoutLines) {
      const totalInLine = checkoutLine.reduce((sum, value) => sum + value, 0)
     
      if (totalInLine < leastItemsAmout) {
        leastItemsAmout = totalInLine
        lineWithLeast = checkoutLine
      }
    }

    if (!lineWithLeast) return

    setChkOutLines(prevChkOutLines => prevChkOutLines.map((chkOutline) => 
      chkOutline === lineWithLeast ? [...chkOutline, items] : chkOutline
    )
  )
}

  useEffect(() => {
    const interval = setInterval(() => {
      setChkOutLines(prevChkOutLines => 
         prevChkOutLines.map(chkoutLine => 
          [chkoutLine[0] - 1, ...chkoutLine.slice(1)].filter(value => value > 0)
        )
      )
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])
  
  return (
    <main className="App">
      <form onSubmit={handleSubmit}>
        <input
          required 
          type="number"
          value={items}
          onChange={(e) => {
            /* if (e.currentTarget.value === "") {
              setItems(undefined)
            } else {
              setItems(e.currentTarget.valueAsNumber)
            } */
            setItems(e.currentTarget.valueAsNumber)
          }
        } 
        />
        <button>Checkout</button>
      </form>
        
      <div className='chkout-lines'>
        
        {chkoutLines.map((inQue, idx) => {
          return (
            <div key={idx} >{inQue.map((numberOfItems, lineIdx) => {
             return (
                <div>
                  <div className='chkout-line' key={lineIdx}><img src="./public/img/customer-checkout.webp"/>{numberOfItems}</div>
                </div>
              )}
            )}
            </div>
          )
        })}
      </div>
      
    </main>
  )
}

export default App
