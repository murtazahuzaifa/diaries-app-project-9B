import React, { FC, useState, useEffect } from 'react';
import style from './EntryInput.module.css';
import { FilledBtn, BorderBtn } from '../buttons/AppButtons';
import Markdown from 'markdown-to-jsx';
import { Edit, Close, Save } from '@material-ui/icons';
// import {RootStateType} from '../../store/parentReducer';
// import { useSelector } from 'react-redux';
// import { onCancel } from './entryInputSlice';
type PropType = {
    visible: boolean;
    onSave?: (title: string, content: string) => void;
    onCancel?: () => void;
    canEdit?: boolean;
    title?: string;
    content?: string;
}

const EntryInput: FC<PropType> = ({ visible, title = '', content = '', canEdit=true, onCancel, onSave }) => {
    // const {canEdit, title, content, visible, onSave} = useSelector((state:RootStateType)=> state.entryInput);
    const [_canEdit, _setCanEdit] = useState<boolean>(canEdit);
    const [_title, _setTitle] = useState<string>(title);
    const [_content, _setContent] = useState<string>(content);

    const afterRender = ()=>{
        _setCanEdit(canEdit);
        _setTitle(title);
        _setContent(content);
    }
    useEffect(afterRender,[])

    const handleSubmit = () => {
        if (!_title && !_content) return

        !onSave || onSave(_title, _content)
        !onCancel || onCancel();
        _setTitle(''); _setContent('') // resetting the input fields
    }

    return (
        <div className={`${style.backDrop}`} style={{ display: visible ? undefined : 'none' }} >
            <div className={`${style.mainBody}`}  >
                {_canEdit ?
                    <input value={_title} onChange={(e) => { _setTitle(e.target.value) }} type="text" placeholder='Title' name='entry title' className={`${style.titleEdit}`} /> :
                    <h1 className={`${style.title}`} >{_title}</h1>
                }

                <hr className={`${style.seperator}`} />

                {_canEdit ?
                    <textarea value={_content} onChange={(e) => { _setContent(e.target.value) }} className={`${style.contentEdit}`} placeholder='Content, Markdown support...' name='entry content' /> :
                    <div className={`${style.content}`}><Markdown>{_content}</Markdown></div>
                }

                <div className={`${style.buttons}`}>
                    <div><BorderBtn onClick={onCancel} color='white' bd='white' ><Close fontSize='small' />cancel</BorderBtn></div>
                    {_canEdit ?
                        <div><FilledBtn onClick={handleSubmit} ><Save fontSize='small' /> save</FilledBtn></div>:
                        <div><FilledBtn onClick={()=>{_setCanEdit(true)}} > <Edit fontSize='small' /> Edit</FilledBtn></div>
                    }
                </div>
            </div>
        </div>
    );
}

export default EntryInput;
// {/* <GreenButton color="primary" variant="contained" className={classes.margin} >Save</GreenButton> */}
// {/* <div className={`${style.backDrop}`}></div> */}
// {/* <Backdrop className={classes.backdrop} open={true} ></Backdrop> */}
// { visible, onSave, onCancel, canEdit = true, title = '', content = '' }