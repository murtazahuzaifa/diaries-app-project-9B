import React, { FC, useState } from 'react';
import style from './EntryInput.module.css';
import { FilledBtn, BorderBtn } from '../buttons/AppButtons';

type PropType = {
    visible: boolean;
    onSave?: (title:string,content:string) => void;
    onCancel?: () => void;
}

const EntryInput: FC<PropType> = ({ visible, onSave, onCancel }) => {
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const handleSubmit = (e:React.FormEvent)=>{
        e.preventDefault()
        !onSave || onSave(title, content)
        !onCancel || onCancel()
    }

    return (
        <div className={`${style.backDrop}`} style={{ display: visible ? undefined : 'none' }} >
            <form onSubmit={handleSubmit} className={`${style.mainBody}`}  >
                <input required value={title} onChange={(e)=>{setTitle(e.target.value)}} type="text" placeholder='Title' name='entry title' className={`${style.title}`} />
                <hr className={`${style.seperator}`} />
                <textarea required value={content} onChange={(e)=>{setContent(e.target.value)}} className={`${style.content}`} placeholder='Content' name='entry content' />
                <div className={`${style.buttons}`}>
                    <div><BorderBtn onClick={onCancel} color='white' bd='white' >cancel</BorderBtn></div>
                    <div><FilledBtn >save</FilledBtn></div>
                </div>
            </form>
        </div>
    );
}

export default EntryInput;
// {/* <GreenButton color="primary" variant="contained" className={classes.margin} >Save</GreenButton> */}
// {/* <div className={`${style.backDrop}`}></div> */}
// {/* <Backdrop className={classes.backdrop} open={true} ></Backdrop> */}