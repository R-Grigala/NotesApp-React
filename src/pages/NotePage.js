import { Link, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import { ReactComponent as ChevronLeft } from '../assets/chevron-left.svg'

const NotePage = () => {
    let { id } = useParams();
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
    return (
        <div className='note'>
            <div className='note-header'>
                <h3>
                    <Link to='/'>
                        <ChevronLeft />
                    </Link>
                </h3>
               
            </div>
            <textarea defaultValue={note?.body}></textarea>
        </div>
    )
}

export default NotePage