import React from "react";

function Timer(props) {
   const [duration, setDuration] = React.useState(props.duration);
   const [ended, setEnded] = React.useState(false)

   React.useEffect(() => {
         const interval = setInterval(() => {
            setDuration(val => {
               if (val <= 1) {
                  setEnded(true)
                  clearInterval(interval)
               } else {
                  localStorage.setItem('timer', val-1)
               }
               return val - 1
            })
         }, 1000);
         return () => {
            clearInterval(interval)
         }
   }, [])

   React.useEffect(() => {
      if (ended) {
         props.onEnd()
      }
   }, [ended, props])

   React.useEffect(() => {
      if (props.finished) {
         setDuration(1)
         setEnded(true)
      }
   }, [props.finished])

   React.useEffect(() => {
      const remainingDuration = localStorage.getItem('timer')
      if (remainingDuration) {
         setDuration(+remainingDuration)
      }
   }, [])

   const seconds = duration % 60
   const minutes = (duration - seconds) / 60


   return <div>Duration: {minutes}:{seconds}</div>;
}

export default Timer;
