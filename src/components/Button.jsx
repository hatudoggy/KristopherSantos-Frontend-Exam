import '../App.css'

function Button(props){

    return(
      <button className="Button" 
        style={{
          color:(props.solid?'#FFFFFF':props.color),
          backgroundColor:(props.solid?props.color:props.color+"26"),
          borderColor:props.color
        }}
        onClick={props.clickBtn}
      >
        {props.text}
      </button>
    )
}

export default Button