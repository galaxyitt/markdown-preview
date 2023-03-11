import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

import MarkdownIt from 'markdown-it';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFreeCodeCamp } from '@fortawesome/free-brands-svg-icons';
import { faExpandAlt } from '@fortawesome/free-solid-svg-icons';
import { faArrowsAlt } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { marked } from 'marked';
import Prism from 'prismjs';

marked.setOptions({
  breaks: true,
  highlight: function (code) {
    return Prism.highlight(code, Prism.languages.javascript, 'javascript');
  }
});
const renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
  return `<a target="_blank" href="${href}">${text}</a>`
};


function App(props) {
  
  const [mark, setMark] = useState(placeholder)

  function handleChange(event){
      setMark(event.target.value)
    }
  const [click, setClick] = useState(false)
  const [expand, setExpand] = useState(false)
  
  function handleClick(){
    setClick(!click)
  }

  function handleExpand(){
    setExpand(!expand)
  }
  
  const md = new MarkdownIt()
 
  const html = md.render(mark)

  
 
  const styles = {
    
    body: {
    fontSize: '1rem',
    fontWeight: '400',
    lineHeight: '1.5',
    color: '#212529',
    textAlign: 'left',
    background: '#4aa3a3',
    margin: '10px 0',
  
    // Media query for small screens (up to 768px width)
    '@media screen and (max-width: 768px)': {
      fontSize: '0.8rem',
      background: '#4aa3a3',
      paddingTop: '10px',
      paddingBottom: '10px',
      marginTop: '5px',
      marginBottom: '5px',
      minHeight: '100%',
      height: '100%',
      width: '100%'
    },
  
    // Media query for medium screens (between 768px and 992px width)
    '@media screen and (min-width: 768px) and (max-width: 992px)': {
      fontSize: '0.9rem',
      background: '#4aa3a3',
      paddingTop: '15px',
      paddingBottom: '15px',
      marginTop: '5px',
      marginBottom: '5px',
      minHeight: '100%',
      height: '100%',
      width: '100%'
    },
  
    // Media query for large screens (above 992px width)
    '@media screen and (min-width: 992px)': {
      fontSize: '1rem',
      background: '#4aa3a3',
      paddingTop: '20px',
      paddingBottom: '20px',
      marginTop: '5px',
      marginBottom: '5px',
      minHeight: '100%',
      height: '100%',
      width: '100%'
    },
  },
  container: {
    display: expand ? 'none' : 'block',
  },
  expand: {
    display: expand ? 'block' : 'none',
  },
};
  
    return (
      
      <div style={styles.body}>
      <div className='container'>
          {click ? (
            <MarkDown handleClick={handleClick}
                      handleChange={handleChange}  
                      mark={mark}
            />
          ):
          
          (
            <div className='content' style={styles.container}>
              <div id='editorWrap'>
              <div className='bar'>
             
                  <div className='icon1'>   
                      <FontAwesomeIcon icon={faFreeCodeCamp} />
              <span className='p-2'>Editor</span>
                  </div>
                <div className="icon2">
                    <button onClick={handleClick}>
                        <FontAwesomeIcon icon={faArrowsAlt} className='arrow'/>
                    </button>
                </div>
              
            </div>
            
              <textarea onChange={handleChange} 
              value={mark} rows={5} cols={50} 
              id='editor'
              type='text'
              >
              </textarea>
             
          </div>
          <div class='converter'></div>
          <div id='previewWrap'>
                <div className='bar'>
                <div className='icon1'>   
                      <FontAwesomeIcon icon={faFreeCodeCamp} />
              <span className='p-2'>Preview</span>
                  </div>
                 
                <div className="icon2">
                    <button onClick={handleExpand}>
                    
                        <FontAwesomeIcon icon={faArrowsAlt} className='arrow'/>
                    </button>
                </div>
                  </div>
              <div dangerouslySetInnerHTML={{__html: marked(mark, {renderer: renderer})}} id="preview" className='previewer'></div>
                
          </div>
          </div>
          )}
          
          {expand && <Expand 
                      handleExpand={handleExpand}
                      mark={mark}
          />}
          
      </div>
      </div>
   
    )
}



class MarkDown extends React.Component{
  constructor(props){
    super(props)
  }
 
  render(){
      return (
        <div>
             <div id='editor' style={{maxWidth:"600px", margin:"1.25rem auto"}}>
              <div className='bar'>
             
                  <div className='icon1'>   
                      <FontAwesomeIcon icon={faFreeCodeCamp} />
                    <span className='p-2'>Editor</span>
                  </div>
                <div className="icon2">
                    <button onClick={this.props.handleClick}>
                        <FontAwesomeIcon icon={faExpandAlt} className='arrow'/>
                    </button>
                </div>
            </div>
              <textarea onChange={this.props.handleChange} value={this.props.mark} rows={25} cols={30} ></textarea>
            
          </div>
        </div>
      ) 
  
  }
}

function Expand(props){
  return (
    <div> 
         <div id='previewWrap'>
                <div class='bar'>
                <div className='icon1'>   
                      <FontAwesomeIcon icon={faFreeCodeCamp} />
                <span className='p-2'>Preview</span>
                </div> 
                <div className="icon2">
                    <button onClick={props.handleExpand}>
                    
                        <FontAwesomeIcon icon={faExpandAlt} className='arrow'/>
                    </button>
                </div>
                  </div>
              <div dangerouslySetInnerHTML={{__html: marked(props.mark, {renderer: renderer})}} className='previewer' 
              style={{maxHeight:"fitContent"}} id="preview"></div>
                
          </div>
    </div>
  )
}

const placeholder = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
`;

export default App;
