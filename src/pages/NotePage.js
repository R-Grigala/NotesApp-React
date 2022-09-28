import { Link, useParams, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import { ReactComponent as ChevronLeft } from '../assets/chevron-left.svg'

const NotePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    let noteId = id
    let [note, setNote] = useState(null)

    

    useEffect(() => {
        getNote()
    },[noteId])

    let getNote = async () => {
        if (noteId === 'new' ) return

        let response = await fetch(`/api/notes/${noteId}`)
        let data = await response.json();
        setNote(data)
    }


    let createNote = async () => {
        fetch(`/api/notes/create/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(note)
        })
    }

    let updateNote = async () => {
        fetch(`/api/notes/${noteId}/update/`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(note)
        })
    }

    let deleteNote = async () => {
        fetch(`/api/notes/${noteId}/delete/`,{
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        navigate('/')
    }

    let handleSubmit = () => {
        if (noteId !== 'new' && note.body === '') {
            deleteNote()
        } else if (noteId !== 'new') {
            updateNote()
        } else if (noteId === 'new' && note.body !== null ){
            createNote()
        }
        navigate('/')
    }

    let handleChange = (value) => {
        setNote(note => ({...note, 'body':value}))
    }
    return (
        <div className='note'>
            <div className='note-header'>
                <h3>
                    <ChevronLeft onClick={handleSubmit}/>
                </h3>
                {noteId !== 'new' ? (
                
                    <button onClick={deleteNote}>Delete</button>
                ): (
                    <button onClick={handleSubmit}>Done</button>
                )}
            </div>
            <hr/>
            <textarea onChange={(e) => {handleChange(e.target.value)}} value={note?.body}></textarea>
        </div>
    )
}

export default NotePage