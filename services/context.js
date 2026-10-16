
import React, { createContext, useContext, useState } from 'react';

const SessionContext = createContext(null)
export function SessionProvider({ children}){
  const [sessionState, setSessionState] = useState('Ghost')
  return (
    <SessionContext.Provider value={{sessionState, setSessionState}}>
    {children}
    </SessionContext.Provider>
  )
}

export function useSession(){
  const context = useContext(SessionContext)
  if (!context){
    throw new Error('useSession must be used inside SessionProvider');
  }
  return context
}

export const AudioContext = createContext(null);