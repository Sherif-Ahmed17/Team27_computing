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