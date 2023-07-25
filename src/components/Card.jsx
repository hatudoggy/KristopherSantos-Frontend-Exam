import '../App.css'
import person from '../assets/person.svg';
import draggable from '../assets/draggable.svg';
import calendar from '../assets/calendar.svg';
import eye from '../assets/eye.svg';

import Button from './Button'

function Card(props){
    // Unbundled the data for easy reference
    const {id, author, title, content, date} = props.data;
    
    // Functionality for the Read Full button
    // Involves opening the modal and passing data to it
    function readFullModal(){
        props.setModalAction("view");
        props.setModalOpen(true);
        props.setCurrentData(props.data);
    }
    
    return(
      <div className="Card">
        <div className='LeftCard'>

            <div className='Handle'>
                <img src={draggable}/>
                <input type="checkbox" className="Checkbox" 
                    onChange={()=>props.handleCheck(id)}
                    checked={props.checkList.includes(id)}
                />
            </div>

            <div className='Details'>

            <p className="Title">{title}</p>

            <p className='AuthDate'>
              <span className="Author"><img src={person}/>{author}</span>
              <span className="Date"><img src={calendar}/>{date}</span>
            </p>

            <p className='ShortCont'><span className="Content">{content}</span>
                <ReadFull readFullModal={readFullModal}/>
            </p>

          </div>

        </div>

        <div className='Hashtags'>
            {props.hashtags.map((hash, index)=><Button key={index} text={"#"+hash} color={"#5BB87D"} clickBtn={null}/>)}
        </div>
  
      </div>
    )
  
  }

// Read Full button component
function ReadFull(props){
  
    return(
        <span className="ReadFull" onClick={props.readFullModal}>
            <img src={eye}/>Read Full
        </span>
    )
}

export default Card