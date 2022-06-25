import React, { useCallback, useEffect, useState} from 'react'

import Quill from "quill"

import "quill/dist/quill.snow.css"

import { io } from "socket.io-client"

import { useParams } from "react-router-dom"



const SAVE_INTERVAL_MS = 2000



const TOOLBAR_OPTIONS = [

    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ font: [] }],

    [{ list: "ordered" }, { list: "bullet" }],

    ["bold", "italic", "underline"],

    [{ color: [] }, { background: [] }],

    [{ script: "sub" }, { script: "super" }],

    [{ align: [] }],

    ["image", "blockquote", "code-block"],

    ["clean"],

  ]

  export default function TextEditor() {

    const { id: documentId } = useParams()
  
    // eslint-disable-next-line
    const [socket, setSocket] = useState()
  
    // eslint-disable-next-line
    const [quill, setQuill] = useState()
  
    
  
    useEffect(() => {
  
      const s = io(process.env.REACT_APP_SERVER)
  
      setSocket(s)
  
      return () => {
  
          s.disconnect()
  
      }
    }, [])

    useEffect(() => {

        if (socket == null || quill == null) return
    
        socket.once("load-document", document => {
            quill.setContents(document)
            quill.enable()
        })
    
        socket.emit("get-document", documentId)
    
      }, [socket, quill, documentId])
    
    
      useEffect(() => {
        if (socket == null || quill == null) return
    
        const interval = setInterval(() => {
    
            socket.emit("save-document", quill.getContents())
    
        }, SAVE_INTERVAL_MS)
    
        return () => {
            clearInterval(interval)
        }
    
      }, [socket, quill])


    
  const wrapperRef = useCallback((wrapper) => { 
  
      if (wrapper === null) return
  
      wrapperRef.innerHTML = ""
  
      const editor = document.createElement("div")
  
      wrapper.append(editor)
  
      const q = new Quill(editor, { theme: 'snow' , modules: {toolbar: TOOLBAR_OPTIONS}}) 
  
      q.disable()
      q.setText("Loading...")
      setQuill(q)
  
  }, [])
  
    return <div className="container" ref={wrapperRef}></div>
  }