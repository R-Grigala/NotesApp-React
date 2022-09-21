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
        let response = await fetch(`/api/notes/${noteId}`)
        let data = await response.json();
        setNote(data)
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

    let handleSubmit = () => {
        updateNote()
        navigate('/')
    }
    return (
        <div className='note'>
            <div className='note-header'>
                <h3>
                    <ChevronLeft onClick={handleSubmit}/>
                </h3>
               
            </div>
            <textarea onChange={(e) => {setNote({...note, 'body':e.target.value})}} defaultValue={note?.body}></textarea>
        </div>
    )
}

export default NotePage