import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (notification === null) {
    return null
  }

  console.log(notification)

  const { message, type } = notification
  console.log(type)

  return <div className={type}>{message}</div>
}

export default Notification
