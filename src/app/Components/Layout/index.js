'use client'
import { store } from '@/app/redux/store';
import React from 'react'
import { Provider } from "react-redux";

export default function Layout({children}) {
  return (
    <div>
        <Provider store={store}>{children}</Provider>
    </div>
  )
}
