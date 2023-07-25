import './App.css'
import mockData from './data/MOCK_DATA.json';

import Button from './components/Button'
import Card from './components/Card';
import Modal from './components/Modal';

import { useEffect, useState } from 'react';


// Main App component
function App() {

  // Initialize the json for local use
  const [origData, setOrigData] = useState(mockData)
  const [filteredData, setFilteredData] = useState(origData);

  // Search functionality
  const [searchData, setSearchData] = useState("");

  useEffect(()=>{
    setFilteredData(
      origData.filter(
        (item)=>{
          return (item.author.toLowerCase().search(searchData.toLowerCase())!==-1||
          item.title.search(searchData)!==-1)
        }
      )
    );
  },[origData, searchData]);

  // Check all checkboxes functionality
  const [checkAll, setCheckAll] = useState(false);
  const [checkList, setCheckList] = useState([]);

  function handleCheckAll(){
    setCheckAll(!checkAll);
    setCheckList(filteredData.map(list => list.id));
    if(checkAll){
      setCheckList([]);
    }
  }

  // Individual checkbox checking
  function handleCheck(id){
    checkList.includes(id)?
      setCheckList(checkList.filter(item => item !== id)):
      setCheckList([...checkList, id]);
  }

  // Add items functionality
  function addItems(id, author, title, content, date){
    let newData = {
      "id": id,
      "author": author,
      "title": title,
      "content": content,
      "date": date

    }
    setOrigData([...origData, newData])
  }

  // Delete items that are checked
  function deleteItems(current){
    if(modalOpen){
      setOrigData(origData.filter((item)=>current !== item.id));
    }else{
      setOrigData(origData.filter((item)=>!checkList.includes(item.id)));
      setCheckAll(false);
    }
    setCheckList([]);
      
  }

  //Toggle and pass data to modal
  const [modalOpen, setModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState('view');
  const [currentData, setCurrentData] = useState();

  useEffect(()=>{
    if(!modalOpen)setCurrentData();
  },[modalOpen]);



  return (
    <>
      {
        modalOpen?
          <Modal 
            setModalOpen={setModalOpen} 
            modalAction={modalAction}
            currentData={currentData} 
            origData={origData}
            setCurrentData={setCurrentData} 
            addItems={addItems}
            deleteItems={deleteItems}
          />
          :null
      }
      <div className='Container'>

        <Header 
          setSearchData={setSearchData} 
          checkAll={checkAll} 
          checkList={checkList} 
          handleCheckAll={handleCheckAll}
          setModalOpen={setModalOpen}
          setModalAction={setModalAction}
          deleteItems={deleteItems}
        />

        <CardCont 
          filteredData={filteredData} 
          checkList={checkList} 
          handleCheck={handleCheck} 
          setModalOpen={setModalOpen}
          setModalAction={setModalAction}
          setCurrentData={setCurrentData}
        />

      </div>
    </>
  )
}

// Includes the News Article title and the Publish, Delete, Search
function Header(props){

  return(
    <div className="Header">

      <h1>News Articles</h1>

      <div className='Controls'>

        <div className='ButtonControls'>
          <input type="checkbox" className="Checkmark" checked={props.checkAll} onChange={()=>{props.handleCheckAll()}}/>
          <Button text={"Publish"} color={"#2CC4EA"} clickBtn={()=>{props.setModalOpen(true);props.setModalAction("publish")}}/>
          <Button text={"Delete"} color={"#F24142"} clickBtn={props.deleteItems}/>
          <p>{props.checkList.length?
            props.checkList.length +
            (props.checkList.length===1?' item':' items')
            +' selected'
            :''}
          </p>
        </div>

        <input type="text" placeholder='Search by Name or Title...' className="SearchBar" 
          onChange={(event)=>props.setSearchData(event.target.value)}/>

      </div>

    </div>
  )

}

// Container for the cards
function CardCont(props){
  
  return(
    <div className="CardCont">
      {props.filteredData.map((data, index)=>
        <Card 
          key={data.id} data={data} 
          checkList={props.checkList} 
          handleCheck={props.handleCheck} 
          setModalOpen={props.setModalOpen}
          setModalAction={props.setModalAction}
          setCurrentData={props.setCurrentData}
          hashtags={["Sports", "Worldwide", "Local"]}/>
      )}

    </div>
  )

}



export default App
