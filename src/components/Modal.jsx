import { useEffect, useState } from 'react';
import '../App.css'

import Button from './Button'


function Modal(props){
  
    return(
      <div className="Modal">

        <div className="ModalBG" onClick={()=>props.setModalOpen(false)}></div>

        <div className="ModalCard">
            {props.modalAction === "view"?
                <ModalView 
                    currentData={props.currentData} 
                    setModalOpen={props.setModalOpen}
                    deleteItems={props.deleteItems}
                />
                :null}
            {props.modalAction === "publish"?
                <ModalPublish
                    setModalOpen={props.setModalOpen}
                    addItems={props.addItems}
                    origData={props.origData}
                />
                :null}

        </div>

      </div>
    )
}

function ModalView(props){

    // Unbundled the data for easy reference
    const {id, author, title, content, date} = props.currentData;

    return(
        <div className="ModalDetails">

            <div className='Head'>
                <div>
                    <h1>{title}</h1>
                    <p>{author} | {date} </p>
                </div>
                <button className='CloseButton' onClick={()=>props.setModalOpen(false)} >X</button>
            </div>

            <div className='Body'>
                <textarea rows="4" cols="50"
                    defaultValue={content}
                />
                
                <div className='Buttons'>
                    <Button text={"Publish"} color={"#2CC4EA"} solid={true} clickBtn={null}/>
                    <Button text={"Delete"} color={"#F24142"} solid={true}
                        clickBtn={()=>{props.deleteItems(id);props.setModalOpen(false)}}/>
                </div>
            </div>

        </div>
    )
}

function ModalPublish(props){

    // Initialize form variables
    const [id, setId] = useState("");
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [content, setContent] = useState("");

    // Change the next id to be the max value id + 1
    useEffect(()=>{
        let maxId = Math.max(...props.origData.map((i)=> i.id));
        setId(maxId + 1);
    },[props.origData]);

    // Clearing of input field values
    function clearFields(){
        setTitle();
        setAuthor();
        setContent();
    }

    // Generate date today with a format of mm/dd/yyyy in string
    function dateToday(){
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0');
        let yyyy = today.getFullYear();
        today = mm + '/' + dd + '/' + yyyy;

        return today;
    }

    return(
        <div className="ModalPublish">
            <div>
                <button className='CloseButton' onClick={()=>props.setModalOpen(false)} >X</button>
                <label>Title</label>
                <input type='text' onChange={(e)=>setTitle(e.target.value)} placeholder='Input title...'/>
            </div>

            <div>
                <label>Author</label>
                <input type='text' onChange={(e)=>setAuthor(e.target.value)} placeholder='Input author...'/>
            </div>

            <div>
                <label>Content</label>
                <textarea rows="4" cols="50" onChange={(e)=>setContent(e.target.value)} placeholder='Input content...'/>
            </div>

            <Button text={"Submit"} color={"#2CC4EA"} solid={true}
                clickBtn={()=>{
                    props.addItems(id, author, title, content, dateToday());
                    clearFields();
                    props.setModalOpen(false);
                }}
            />
        </div>
    )
}

export default Modal